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

- **Zero dependencies.** No React, no build step, no bundler. Just HTML, CSS and a single vanilla JS file. It loads instantly and ages gracefully.
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
│   └── js/
│       └── main.js         # scroll progress, reveals, cursor dot
├── resources/              # PDF export & source assets
└── .github/workflows/
    └── deploy-pages.yml    # CI → GitHub Pages
```

## ✦ Run it locally

No toolchain required — just serve the `src/` folder:

```bash
# Python
python3 -m http.server -d src 8000

# …or Node
npx serve src
```

Then open **http://localhost:8000**.

## ✦ Deployment

Every push to `main` triggers the [deploy workflow](.github/workflows/deploy-pages.yml), which publishes `src/` to GitHub Pages — live within a minute at **[studioflow.github.io/its-a-me](https://studioflow.github.io/its-a-me/)**.

---

<div align="center">

Designed & built with **[Claude Code](https://claude.com/claude-code)** · Licensed under [MIT](LICENSE)

</div>
