# 0002. The default locale lives in the HTML, only fr-FR is a JSON catalog

Status: accepted

`index.html` stays authored in `en-US` and is the only source of the English text; `src/i18n/fr-FR.json` overlays French onto elements marked with translation keys, and switching back to English restores a snapshot of the original DOM taken at boot. We chose this asymmetry over an `en-US.json` mirror so the English copy has a single source that cannot drift, while the page still renders fully (SEO, no-JS, no flash) without any localization running.

## Considered Options

- `en-US.json` duplicating the HTML text: symmetric, but two English copies to keep in sync.
- Empty HTML filled entirely from JSON: one source, but a blank page without JS and poor indexing.

## Consequences

- Adding a third locale means adding one more catalog; English never gets one.
- Moving English into a catalog later requires re-extracting every translated element from the HTML.
