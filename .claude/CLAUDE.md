


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

its-a-me is a personal project to build a professional CV/resume as a static site, written in advanced HTML/CSS, and deployed as a public GitHub Pages site.

## Hard constraint: GitHub Pages compatibility

Every technical choice must work on GitHub Pages as-is. See `docs/adr/0001-static-github-pages-only.md`.

- `src/` is published verbatim by `.github/workflows/deploy-pages.yml`: no build step, no bundler, no generated files.
- Static files only: HTML, CSS, vanilla JS (ES modules), JSON, assets. No server runtime, no server-side redirects, rewrites or custom headers.
- Third-party code only via CDN `<script>`/`<link>`, never via an npm install that `src/` depends on.
- All paths relative (the site is served from a project subpath, not the domain root).

## Commands

- `npm test`: placeholder script, currently just exits with an error. No test suite, build step, or linter is configured yet.

## Architecture

- `src/`: the published site. `index.html`, `css/` (`tokens.css`, `base.css`, `components.css`, `animations.css`), `js/main.js`, `img/`.
- `resources/`: source material not published (LinkedIn export, profile PDF).
- `.github/workflows/deploy-pages.yml`: deploys `./src` to GitHub Pages on every push to `main`.

Since this is a static HTML/CSS CV site, any frontend/UI work must follow the Design Standard below.

- Design Standard — Use the `/awwwards` skill: For ANY frontend/UI work, invoke the `/awwwards` skill which contains the complete creative direction framework, design decision process, and links to 7 reference files covering typography, color, layout, motion, CSS techniques, WebGL, and studio philosophies. Key principles:
  - ALWAYS define art direction BEFORE writing code (emotion, archetype, industry context)
  - Typography is 90% of design — use fluid `clamp()` scales, max 2 font families, tight tracking on display
  - Never pure black/white — use oklch() or carefully chosen near-black/near-white values
  - Motion must tell a story — every animation answers "what happened?" or "where should I look?"
  - Vary section rhythm — alternate contained/full-bleed, vary spacing, break the template look
  - Performance IS design — target <3s load, 60fps, animate only `transform` and `opacity`
  - A generic, template-looking UI is a failure. The user must feel the product is one-of-a-kind on first load.

## Agent skills

### Issue tracker

Issues live as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
