const DEFAULT_LOCALE = 'en-US';
const STORAGE_KEY = 'locale';
const CATALOG_TIMEOUT = 1500;
const FADE_OUT = 150;

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const toggle = document.querySelector('[data-locale-toggle]');

const catalogs = new Map();
const loadCatalog = (locale) => {
  if (!catalogs.has(locale)) {
    const request = fetch(`i18n/${locale}.json`).then((res) => {
      if (!res.ok) throw new Error(`${res.status} ${res.url}`);
      return res.json();
    });
    request.catch(() => catalogs.delete(locale));
    catalogs.set(locale, request);
  }
  return catalogs.get(locale);
};

const lookup = (catalog, key) => key.split('.').reduce((node, part) => node?.[part], catalog);

// Templates are included so a dialog cloned after a switch comes out in the active locale
const SELECTOR = '[data-i18n], [data-i18n-html], [data-i18n-attr]';
const scopes = [document, ...Array.from(document.querySelectorAll('template'), (tpl) => tpl.content)];

// The English snapshot is the Default locale: it is taken before anything else touches the DOM
const bindings = scopes
  .flatMap((scope) => Array.from(scope.querySelectorAll(SELECTOR)))
  .map((el) => {
    const attrs = (el.dataset.i18nAttr ?? '')
      .split(';')
      .filter(Boolean)
      .map((pair) => {
        const [name, key] = pair.split(':').map((s) => s.trim());
        return { name, key, original: el.getAttribute(name) };
      });
    return {
      el,
      textKey: el.dataset.i18n,
      htmlKey: el.dataset.i18nHtml,
      attrs,
      originalText: el.textContent,
      originalHtml: el.innerHTML,
    };
  });

// A null catalog, or a key it lacks, falls back to the English snapshot
const applyTranslations = (catalog) => {
  const t = (key, fallback) => (catalog && lookup(catalog, key)) ?? fallback;
  for (const { el, textKey, htmlKey, attrs, originalText, originalHtml } of bindings) {
    if (textKey) el.textContent = t(textKey, originalText);
    if (htmlKey) el.innerHTML = t(htmlKey, originalHtml);
    for (const { name, key, original } of attrs) el.setAttribute(name, t(key, original));
  }
};

const markToggle = (locale) => {
  toggle.querySelectorAll('[data-locale]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.locale === locale));
  });
};

const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms));
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const loadCatalogInTime = (locale) => Promise.race([loadCatalog(locale), timeout(CATALOG_TIMEOUT)]);

let current = DEFAULT_LOCALE;

export const ready = (async () => {
  const initial = root.lang;
  if (initial !== DEFAULT_LOCALE) {
    try {
      const catalog = await loadCatalogInTime(initial);
      // If locale-boot's fail-safe already revealed the English page, painting French now would be a flash
      if (root.classList.contains('i18n-pending')) {
        applyTranslations(catalog);
        current = initial;
      }
    } catch {}
  }
  root.lang = current;
  markToggle(current);
  // Commit the brackets' position while their transition is off, so they don't slide in on reveal
  toggle.getBoundingClientRect();
  root.classList.remove('i18n-pending');
})();

let latestSwitch = 0;

const switchTo = async (locale) => {
  const id = ++latestSwitch;
  markToggle(locale);

  const catalog = locale === DEFAULT_LOCALE ? Promise.resolve(null) : loadCatalogInTime(locale);
  if (!reduceMotion) {
    root.classList.add('i18n-swapping');
    await wait(FADE_OUT);
  }

  try {
    const loaded = await catalog;
    // A later click owns the outcome, including when to fade back in
    if (id !== latestSwitch) return;
    applyTranslations(loaded);
    current = locale;
    root.lang = locale;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {}
  } catch {
    if (id !== latestSwitch) return;
    markToggle(current);
  }
  root.classList.remove('i18n-swapping');
};

ready.then(() => {
  toggle.addEventListener('click', (e) => {
    const option = e.target.closest('[data-locale]');
    if (option && option.getAttribute('aria-pressed') !== 'true') switchTo(option.dataset.locale);
  });
});
