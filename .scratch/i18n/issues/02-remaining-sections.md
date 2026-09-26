# 02. Translate the remaining page sections

Status: ready-for-agent
Blocked by: 01

Spec: `.scratch/i18n/spec.md`

## Scope

Keys and French copy for every section after the stats: `about`, `focus` (cards and their `aria-label`s), `aiPractice`, `stack` (headings only; technology names stay as-is), `experience`, `education`, `contact`, `footer`, and the introspect dialog UI (`dialog`: close label and any other chrome, but not the `entity/<id>` route).

Use `data-i18n-html` wherever the copy embeds `<strong>`, `<br>` or inline `<button class="entity">`. Keep each button's `data-introspect` id and classes identical in the French HTML.

## Watch out (from the 01 review)

- The English snapshot is taken before `main.js` degrades triggers that have no `<template>`: a `data-i18n-html` block containing such a trigger would restore a live-looking `<button class="entity">`. Every inline `data-introspect` inside translated HTML must have a template.
- `innerHTML` swaps drop per-element state on the replaced nodes: the arrival-scan `--s` / `is-lit` and the custom cursor's `mouseenter` listeners on `a, button`. Move the cursor hover to delegation if translated blocks contain links or buttons.
- `data-year` in the footer is written by `main.js` after the snapshot: keep it outside any `data-i18n-html` element.

## Acceptance

- [ ] No English copy remains in these sections in `fr-FR`, except the exclusions listed in the spec.
- [ ] Inline entity buttons still open their dialogs in both locales.
- [ ] French typography rules from the spec are applied.
- [ ] No layout breaks from the longer French copy (headings, cards, timeline) at 360px, 768px and 1440px.
- [ ] Florian has reviewed the French copy.
