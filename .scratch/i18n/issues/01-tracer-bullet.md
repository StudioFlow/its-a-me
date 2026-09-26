# 01. Localization mechanism, header toggle, first sections

Status: ready-for-agent

Spec: `.scratch/i18n/spec.md`

## Scope

End-to-end localization mechanism, proven on the top of the page.

- `src/js/locale-boot.js`, loaded as a classic blocking script in `<head>`.
- `src/js/i18n.js`: catalog loading, English snapshot, text/HTML/attribute/template application, toggle, Locale preference, `ready`.
- `src/js/main.js` switched to `type="module"`: imports `i18n`, waits on `ready` before the hero entrance, and moves introspect triggers to event delegation.
- Toggle markup in the header and its CSS in `components.css`, plus the fade and `i18n-pending` rules in `animations.css`, following the spec's toggle design. Invoke `/awwwards` before writing the CSS.
- Keys and French copy for `head` (title, description), `nav`, `hero`, `stats`.

## Acceptance

- [x] A browser with `fr-*` first in its languages lands in French without any flash of English; header and `<main>` fade in, then the hero entrance plays.
- [x] A browser with any other language lands in English, with behavior identical to today.
- [x] `?lang=fr-FR` and `?lang=en-US` force the locale for that visit and write nothing to storage.
- [x] Toggle clicks switch the locale with the fade, persist the Locale preference, and survive a reload.
- [x] Toggling FR → EN → FR is lossless: English restored exactly from the snapshot.
- [x] `<html lang>`, `<title>` and `meta description` follow the locale.
- [x] Introspect dialogs still open from every trigger after a locale switch.
- [x] Catalog fetch failure: the English page is revealed within ~1.5s and the toggle shows EN.
- [x] `prefers-reduced-motion`: instant swap, no fade, no bracket slide.
- [x] The toggle is visible and usable at 360px width, and reachable by keyboard with correct `aria-pressed`.
- [x] Accented capitals are not clipped in the hero `.line-mask`s.
- [x] Works served from a subpath (`python3 -m http.server -d src`), all paths relative.
- [ ] Florian has reviewed the French copy.
