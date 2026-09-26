# 0001. Pure static site served verbatim by GitHub Pages

Status: accepted

## Context

The site is a public professional profile hosted on GitHub Pages. GitHub Pages only serves static files: there is no server runtime, no server-side redirects or rewrites, and no custom response headers. The deploy workflow (`.github/workflows/deploy-pages.yml`) uploads `./src` as-is. A build step inside GitHub Actions would technically still be compatible, but it adds a toolchain to maintain for a single-page site.

## Decision

`src/` is the deployed artifact, byte for byte. No build step, no bundler, no transpiler, no generated files.

- Allowed: HTML, CSS, vanilla JavaScript (native ES modules), JSON, fonts, images, PDFs.
- Third-party code is loaded from a CDN via `<script>` or `<link>`, never installed through npm for use by `src/`.
- Every path is relative, because the site is served from a project subpath rather than the domain root.
- Anything that needs to happen at request time (locale negotiation, redirects) happens client-side in JavaScript.

## Consequences

- Features that would normally rely on a build or a server must be designed client-side. Example: i18n loads its JSON with a relative `fetch()` (or inlines it by hand), and language detection uses `navigator.languages` rather than the `Accept-Language` header.
- `fetch()` of local files does not work over `file://`, so local preview needs a static HTTP server (e.g. `python3 -m http.server -d src`).
- Dev-only tooling (tests, linters) is acceptable as long as `src/` never depends on it at runtime.
- Revisit this decision only if the site outgrows a single hand-written page.
