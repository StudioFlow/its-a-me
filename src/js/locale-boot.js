// Render-blocking on purpose: the locale must be known before first paint so a fr-FR visitor never sees English
(() => {
  const root = document.documentElement;
  const supported = ['en-US', 'fr-FR'];
  const match = (tag) => supported.find((locale) => locale.toLowerCase() === tag?.toLowerCase());

  const fromBrowser = () => {
    for (const tag of navigator.languages) {
      const base = tag.toLowerCase().split('-')[0];
      const locale = supported.find((l) => l.toLowerCase().startsWith(`${base}-`));
      if (locale) return locale;
    }
    return 'en-US';
  };

  let preference = null;
  try {
    preference = localStorage.getItem('locale');
  } catch {}

  const locale = match(new URLSearchParams(location.search).get('lang')) ?? match(preference) ?? fromBrowser();
  root.lang = locale;
  if (locale === 'en-US') return;

  root.classList.add('i18n-pending');
  const preload = document.createElement('link');
  preload.rel = 'preload';
  preload.as = 'fetch';
  preload.crossOrigin = 'anonymous';
  preload.href = `i18n/${locale}.json`;
  document.head.append(preload);

  // Last resort if i18n.js itself never runs: show the English page rather than a blank one
  setTimeout(() => {
    root.lang = 'en-US';
    root.classList.remove('i18n-pending');
  }, 3000);
})();
