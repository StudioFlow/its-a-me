const { test, expect } = require('@playwright/test');

const EN = {
  title: 'Florian Daniels · IAM Architect & Security Tech Lead',
  subhead: "I design and implement identity systems that don't go down.",
  about: 'About',
};

const FR = {
  title: 'Florian Daniels · Architecte IAM & Tech Lead Sécurité',
  subhead: 'Je conçois et je construis des systèmes d’identité qui ne tombent pas.',
  about: 'À propos',
};

const subhead = (page) => page.locator('.hero__subhead');
const toggleOption = (page, locale) => page.locator(`[data-locale-toggle] [lang="${locale}"]`);

test.describe('French-speaking browser', () => {
  test.use({ locale: 'fr-CA' });

  test('lands in fr-FR', async ({ page }) => {
    await page.goto('./');

    await expect(page.locator('html')).toHaveAttribute('lang', 'fr-FR');
    await expect(page).toHaveTitle(FR.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /architecte IAM/);
    await expect(subhead(page)).toHaveText(FR.subhead);
    await expect(page.locator('.nav__links a[href="#about"]')).toHaveText(FR.about);
    await expect(toggleOption(page, 'fr-FR')).toHaveAttribute('aria-pressed', 'true');
    await expect(toggleOption(page, 'en-US')).toHaveAttribute('aria-pressed', 'false');
  });
});

test.describe('Browser in any other language', () => {
  test.use({ locale: 'de-DE' });

  test('lands in en-US', async ({ page }) => {
    await page.goto('./');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
    await expect(page).toHaveTitle(EN.title);
    await expect(subhead(page)).toHaveText(EN.subhead);
    await expect(toggleOption(page, 'en-US')).toHaveAttribute('aria-pressed', 'true');
  });

  test('a Locale link forces fr-FR for the visit without remembering it', async ({ page }) => {
    await page.goto('./?lang=fr-FR');
    await expect(subhead(page)).toHaveText(FR.subhead);
    expect(await page.evaluate(() => localStorage.getItem('locale'))).toBeNull();

    await page.goto('./');
    await expect(subhead(page)).toHaveText(EN.subhead);
  });
});

test.describe('Locale link against a French-speaking browser', () => {
  test.use({ locale: 'fr-FR' });

  test('?lang=en-US forces en-US', async ({ page }) => {
    await page.goto('./?lang=en-US');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
    await expect(subhead(page)).toHaveText(EN.subhead);
  });
});

test.describe('Toggle', () => {
  test.use({ locale: 'en-US' });

  test('switches the locale and remembers the choice across reloads', async ({ page }) => {
    await page.goto('./');

    await toggleOption(page, 'fr-FR').click();
    await expect(subhead(page)).toHaveText(FR.subhead);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr-FR');
    await expect(toggleOption(page, 'fr-FR')).toHaveAttribute('aria-pressed', 'true');

    await page.reload();
    await expect(subhead(page)).toHaveText(FR.subhead);

    await toggleOption(page, 'en-US').click();
    await expect(subhead(page)).toHaveText(EN.subhead);
    await page.reload();
    await expect(subhead(page)).toHaveText(EN.subhead);
    await expect(toggleOption(page, 'en-US')).toHaveAttribute('aria-pressed', 'true');
  });
});

const localizedMarkup = (page) =>
  page.evaluate(() => {
    const selector = '[data-i18n], [data-i18n-html], [data-i18n-attr]';
    const scopes = [document, ...Array.from(document.querySelectorAll('template'), (t) => t.content)];
    return scopes.flatMap((scope) => Array.from(scope.querySelectorAll(selector), (el) => el.outerHTML));
  });

test.describe('Round trip', () => {
  test.use({ locale: 'en-US' });

  test('en-US → fr-FR → en-US restores the English exactly', async ({ page }) => {
    await page.goto('./');
    await expect(subhead(page)).toHaveClass(/is-visible/);
    const english = await localizedMarkup(page);

    await toggleOption(page, 'fr-FR').click();
    await expect(subhead(page)).toHaveText(FR.subhead);
    expect(await localizedMarkup(page)).not.toEqual(english);

    await toggleOption(page, 'en-US').click();
    await expect(subhead(page)).toHaveText(EN.subhead);
    await expect(page.locator('html')).not.toHaveClass(/i18n-swapping/);
    expect(await localizedMarkup(page)).toEqual(english);
    await expect(page).toHaveTitle(EN.title);
  });
});

test.describe('Introspect after a switch', () => {
  test.use({ locale: 'en-US' });

  test('entity triggers still open their dialog', async ({ page }) => {
    await page.goto('./');
    await toggleOption(page, 'fr-FR').click();
    await expect(subhead(page)).toHaveText(FR.subhead);

    await page.locator('.about [data-introspect="lectra"]').click();
    await expect(page.locator('[data-introspect-dialog]')).toHaveAttribute('open', '');
    await expect(page.locator('[data-introspect-route]')).toHaveText('entity/lectra');
  });
});

test.describe('Catalog failure', () => {
  test.use({ locale: 'fr-FR' });

  test('reveals the English page within the safety timeout', async ({ page }) => {
    await page.route('**/i18n/fr-FR.json', () => {}); // never answers
    const start = Date.now();
    await page.goto('./', { waitUntil: 'commit' });

    await expect(page.locator('html')).not.toHaveClass(/i18n-pending/, { timeout: 2500 });
    expect(Date.now() - start).toBeLessThan(2500);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
    await expect(subhead(page)).toHaveText(EN.subhead);
    await expect(toggleOption(page, 'en-US')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('main')).toHaveCSS('opacity', '1');
  });
});

test.describe('First paint for a French-speaking visitor', () => {
  test.use({ locale: 'fr-FR' });

  test('never shows English, and the hero entrance waits for the reveal', async ({ page }) => {
    await page.addInitScript((english) => {
      window.__frames = [];
      const sample = () => {
        const main = document.querySelector('main');
        const line = document.querySelector('.hero__subhead');
        if (main && line) {
          window.__frames.push({
            visible: Number(getComputedStyle(main).opacity) > 0,
            english: line.textContent === english,
            pending: document.documentElement.classList.contains('i18n-pending'),
            entering: line.classList.contains('is-visible'),
          });
        }
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    }, EN.subhead);

    await page.goto('./');
    await expect(subhead(page)).toHaveClass(/is-visible/);

    const frames = await page.evaluate(() => window.__frames);
    expect(frames.length).toBeGreaterThan(0);
    expect(frames.filter((f) => f.visible && f.english)).toEqual([]);
    expect(frames.filter((f) => f.pending && f.entering)).toEqual([]);
  });
});

test.describe('Reduced motion', () => {
  test.use({ locale: 'en-US', reducedMotion: 'reduce' });

  test('swaps the locale without fading the page', async ({ page }) => {
    await page.goto('./');
    await page.evaluate(() => {
      window.__minOpacity = 1;
      const sample = () => {
        window.__minOpacity = Math.min(window.__minOpacity, Number(getComputedStyle(document.querySelector('main')).opacity));
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });

    await toggleOption(page, 'fr-FR').click();
    await expect(subhead(page)).toHaveText(FR.subhead);
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.__minOpacity)).toBe(1);
  });
});

test.describe('Small screen', () => {
  test.use({ locale: 'en-US', viewport: { width: 360, height: 740 } });

  test('the toggle is visible and works from the keyboard', async ({ page }) => {
    await page.goto('./');
    const fr = toggleOption(page, 'fr-FR');
    await expect(fr).toBeVisible();

    const box = await fr.boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
    expect(box.x + box.width).toBeLessThanOrEqual(360);

    await fr.focus();
    await page.keyboard.press('Enter');
    await expect(subhead(page)).toHaveText(FR.subhead);
    await expect(fr).toHaveAttribute('aria-pressed', 'true');
  });
});

test.describe('Catalog failure on toggle', () => {
  test.use({ locale: 'en-US' });

  test('brings the English page back and resets the toggle', async ({ page }) => {
    await page.route('**/i18n/fr-FR.json', () => {}); // never answers
    await page.goto('./');

    await toggleOption(page, 'fr-FR').click();
    await expect(page.locator('html')).not.toHaveClass(/i18n-swapping/, { timeout: 2500 });
    await expect(page.locator('main')).toHaveCSS('opacity', '1');
    await expect(subhead(page)).toHaveText(EN.subhead);
    await expect(toggleOption(page, 'en-US')).toHaveAttribute('aria-pressed', 'true');
    expect(await page.evaluate(() => localStorage.getItem('locale'))).toBeNull();
  });
});
