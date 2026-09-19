


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

its-a-me is a personal project to build a professional CV/resume as a static site, written in advanced HTML/CSS, and hosted on GitLab Pages.

The codebase is currently an empty scaffold: `src/` and `resources/` exist but contain no files yet, and no CI/deployment config (e.g. `.gitlab-ci.yml`) has been set up.

## Commands

- `npm test` — placeholder script, currently just exits with an error. No test suite, build step, or linter is configured yet.

## Architecture

- `src/` — intended location for the CV's HTML/CSS/JS source (currently empty).
- `resources/` — intended location for static assets, e.g. fonts, images, the CV PDF (currently empty).

Since this is a static HTML/CSS CV site, any frontend/UI work must follow the Design Standard below.

- Design Standard — Use the `/awwwards` skill: For ANY frontend/UI work, invoke the `/awwwards` skill which contains the complete creative direction framework, design decision process, and links to 7 reference files covering typography, color, layout, motion, CSS techniques, WebGL, and studio philosophies. Key principles:
  - ALWAYS define art direction BEFORE writing code (emotion, archetype, industry context)
  - Typography is 90% of design — use fluid `clamp()` scales, max 2 font families, tight tracking on display
  - Never pure black/white — use oklch() or carefully chosen near-black/near-white values
  - Motion must tell a story — every animation answers "what happened?" or "where should I look?"
  - Vary section rhythm — alternate contained/full-bleed, vary spacing, break the template look
  - Performance IS design — target <3s load, 60fps, animate only `transform` and `opacity`
  - A generic, template-looking UI is a failure. The user must feel the product is one-of-a-kind on first load.