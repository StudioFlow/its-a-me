# its-a-me

A single-page professional profile of Florian Daniels, published as a static site.

## Localization

**Locale**:
One of the two languages the profile is published in, identified by its BCP 47 tag: `en-US` or `fr-FR`.
_Avoid_: lang, language code, `en-us`, `fr-fr`

**Default locale**:
`en-US`, the locale the page is authored in and renders before any localization runs.
_Avoid_: fallback language, base language

**Translation**:
The `fr-FR` rendering of a piece of the page's text, grouped into a namespace that mirrors the page section it belongs to.
_Avoid_: message, string, i18n key

**Locale preference**:
A locale the visitor has explicitly chosen through the language toggle; it is remembered across visits and overrides the browser's languages.
_Avoid_: saved language, user setting

**Locale link**:
A link to the profile that forces a locale for that visit only (`?lang=fr-FR`), reflecting the sender's choice rather than the visitor's; it is never remembered.
_Avoid_: deep link, localized URL
