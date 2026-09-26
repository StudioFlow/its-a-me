# Spec: en-US / fr-FR localization

Vocabulary: see `CONTEXT.md` (Locale, Default locale, Translation, Locale preference, Locale link).
Decisions: `docs/adr/0001-static-github-pages-only.md`, `docs/adr/0002-default-locale-lives-in-html.md`.

## Goal

The profile is readable in `en-US` (default) and `fr-FR`. The locale is picked automatically from the browser and can be switched from an `EN / FR` toggle in the header.

## Model

- `src/index.html` stays authored in `en-US` and is the only source of English text. No `en-US.json`.
- `src/i18n/fr-FR.json` holds the French Translations, nested by namespace mirroring page sections: `head`, `nav`, `hero`, `stats`, `about`, `focus`, `aiPractice`, `stack`, `experience`, `education`, `contact`, `footer`, `dialog`, and `entity.<id>.*` for each `<template data-entity>`.
- Switching back to `en-US` restores a snapshot of the original DOM (text, HTML, attributes, template contents) taken at boot.

## Locale resolution (first match wins)

1. Locale link: `?lang=en-US|fr-FR`. Applies to this visit only, never written to storage.
2. Locale preference: `localStorage`, written only by the toggle. Every access wrapped in try/catch.
3. `navigator.languages`: any `fr` / `fr-*` → `fr-FR`.
4. `en-US`.

## Translation scope

- Translated: all visible copy, `<title>`, `meta[name=description]`, `<html lang>`, `aria-label`s, dialog UI labels, introspect template text.
- Not translated: credential JWT claims (`sub`, `role`, `aud`, `iss`, values, `alg RS256`), `Verified`, `Access credential`, `Scroll`, `entity/<id>` route, technology names, introspect `<dt>` claim keys.

## Markup contract

- `data-i18n="ns.key"`: replaces `textContent`.
- `data-i18n-html="ns.key"`: replaces `innerHTML` (trusted, self-authored). Used when the copy contains `<strong>`, `<br>` or inline `<button class="entity">`.
- `data-i18n-attr="aria-label:ns.key;content:ns.key"`: translated attributes.
- Inside `<template>`: same attributes, applied to `template.content` on locale change so the next dialog open clones the right language.
- A key missing from the catalog leaves the English in place.

## Runtime

- `src/js/locale-boot.js`: classic, render-blocking `<script>` in `<head>` (not inline). It resolves the locale synchronously, sets `<html lang>`, and when the locale is `fr-FR` adds `i18n-pending` and injects `<link rel="preload" as="fetch" crossorigin href="i18n/fr-FR.json">`. It holds no other logic.
- `src/js/i18n.js`: ES module. It loads the catalog, snapshots English, applies Translations, drives the toggle, writes the Locale preference, and exports `ready` (a Promise resolving once the initial locale is applied or has fallen back).
- `src/js/main.js`: becomes `type="module"`, imports `i18n.js`, starts the hero entrance only after `ready`, and moves the introspect triggers to event delegation so swapped `innerHTML` keeps working.

## Motion

- Locale switch: header and `<main>` fade to 0 over 150ms, content is swapped, then they fade back to 1 over 250ms. Only `opacity` is animated. Already-played reveals do not replay.
- First load in `fr-FR`: `i18n-pending` holds the header and `<main>` at `opacity: 0`, the French is applied, then they fade in over 250ms, then the hero entrance starts. The toggle already shows `[FR]` when it appears. A ~1.5s safety timeout reveals the English page if the catalog fails to load.
- `en-US` visitors: unchanged from today.
- `prefers-reduced-motion`: instant swap, no fades.

## Toggle design (from `/awwwards`)

- Placement: rightmost in `.nav__links`, after the GitHub icon, behind a vertical separator matching `.nav__icon`'s `border-left`. Visible at every width, including under 480px where text links are hidden.
- Look: `EN / FR` in JetBrains Mono. The active locale uses `--text-primary`, the inactive one `--text-tertiary`. A pair of accent brackets `[ ]` slides onto the active locale (transform only, `cubic-bezier(0.16, 1, 0.3, 1)`, 400ms).
- Semantics: `role="group"` with an accessible name, two `<button type="button" aria-pressed lang="…">`, touch target ≥ 44×44px. The custom cursor hover state applies.

## French typography

- U+202F narrow no-break space before `; : ! ?` and inside `« »`. Use `« »` rather than `" "`.
- No-break spaces in number+unit pairs (« 18 ans », « 100 microservices »).
- Unicode characters written directly in the JSON, never as entities.
- Check that accented capitals are not clipped by `.line-mask` at the display line-height.

## Content workflow

Claude drafts the French from the English HTML and `resources/` (LinkedIn export, profile PDF). Florian reviews each slice before the next one starts.

## Slices

1. `issues/01-tracer-bullet.md`
2. `issues/02-remaining-sections.md`
3. `issues/03-introspect-entities.md`
