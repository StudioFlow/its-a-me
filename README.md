<div align="center">

# `it's-a-me` 🍄

### The personal CV of **Floryan Daniels** — *IAM Architect & Security Tech Lead*

A zero-framework résumé built like a product, not a document.
Dark-systems aesthetic, fluid typography, buttery motion — deployed at the edge.

*Designed & built with [Claude Code](https://claude.com/claude-code).*

<br>

[![Live Site](https://img.shields.io/badge/live-studioflow.github.io-00e5d0?style=for-the-badge&logo=github&logoColor=black)](https://studioflow.github.io/its-a-me/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/StudioFlow/its-a-me/deploy-pages.yml?style=for-the-badge&label=deploy&color=00e5d0)](https://github.com/StudioFlow/its-a-me/actions/workflows/deploy-pages.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-f2c14e?style=for-the-badge)](LICENSE)

[![HTML5](https://img.shields.io/badge/HTML5-semantic-e34f26?style=flat-square&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-oklch()%20+%20clamp()-1572b6?style=flat-square&logo=css3&logoColor=white)](#)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-0%20dependencies-f7df1e?style=flat-square&logo=javascript&logoColor=black)](#)
[![Claude Code](https://img.shields.io/badge/built%20with-Claude%20Code-d97757?style=flat-square)](https://claude.com/claude-code)

**[→ Open the live site](https://studioflow.github.io/its-a-me/)**

</div>

---

## ✦ Why it's not just another CV page

- **Zero runtime dependencies.** No React, no build step, no bundler. Just HTML, CSS and a few vanilla ES modules. It loads instantly and ages gracefully.
- **Bilingual.** `en-US` and `fr-FR`, picked from the browser and switchable from the header. English lives in the HTML, French in a JSON catalog; no flash of the wrong language.
- **Design as a first-class concern.** Fluid `clamp()` type scale, an `oklch()` color system, tuned easing curves and motion that actually *means* something.
- **Dark-systems art direction.** A cyber / identity-infrastructure vibe — grid overlays, scanlines, monospace accents — matching 18+ years in IAM & security.
- **Accessible & performant.** Semantic markup, `prefers-reduced-motion` respected, 60fps animations that only touch `transform` and `opacity`.
- **Ships itself.** Push to `main` → GitHub Actions builds and publishes to GitHub Pages. No manual steps.

## ✦ Tech & design system

| Layer | Choice |
|------|--------|
| **Type** | Space Grotesk (display) · Inter (body) · JetBrains Mono (accents) |
| **Color** | `oklch()`-based dark palette, cyan `#00e5d0` accent |
| **Scale** | Fluid typography & spacing via `clamp()` |
| **Motion** | Custom cubic-bezier easings, scroll progress, cursor dot |
| **Hosting** | GitHub Pages, deployed via GitHub Actions |

## ✦ Project structure

```
its-a-me/
├── src/
│   ├── index.html          # the whole CV, one semantic document
│   ├── css/
│   │   ├── tokens.css      # design tokens: color, type, spacing, motion
│   │   ├── base.css        # resets & foundational styles
│   │   ├── components.css  # section & component styling
│   │   └── animations.css  # keyframes & motion
│   ├── i18n/
│   │   └── fr-FR.json      # French Translations (English stays in the HTML)
│   └── js/
│       ├── locale-boot.js  # resolves the locale before first paint
│       ├── i18n.js         # applies Translations, drives the EN / FR toggle
│       └── main.js         # scroll progress, reveals, cursor dot, introspect dialogs
├── tests/                  # Playwright suite (dev only)
├── resources/              # PDF export & source assets
└── .github/workflows/
    └── deploy-pages.yml    # CI → GitHub Pages
```

## ✦ Run it locally

No toolchain required — just serve the `src/` folder over HTTP:

```bash
npm start
```

Then open **http://127.0.0.1:8080**.

> Opening `src/index.html` directly (`file://`) shows a blank page: browsers block ES modules and `fetch` from `file://` origins.

## ✦ Tests

The Playwright suite covers locale resolution, the toggle, first paint in French and the introspect dialogs:

```bash
npm install
npx playwright install chromium
npm test
```

## ✦ Deployment

Every push to `main` triggers the [deploy workflow](.github/workflows/deploy-pages.yml), which publishes `src/` to GitHub Pages — live within a minute at **[studioflow.github.io/its-a-me](https://studioflow.github.io/its-a-me/)**.

---

<div align="center">

Designed & built with **[Claude Code](https://claude.com/claude-code)** · Licensed under [MIT](LICENSE)

</div>
