# 03. Translate the introspect entity templates

Status: ready-for-agent
Blocked by: 02

Spec: `.scratch/i18n/spec.md`

## Scope

Keys and French copy for all 45 `<template data-entity>` blocks, one key per element under `entity.<id>.*` (kicker, title, lede, claim values, block titles and bodies, list items). The `<dt>` claim keys and technology names are not translated. Preserve the existing `TODO verify` HTML comments.

## Acceptance

- [x] Every template opens in French in `fr-FR` and in English after switching back, including a dialog opened before the switch and reopened after.
- [x] Each template's structure and classes are unchanged; the JSON holds only copy.
- [x] French typography rules from the spec are applied.
- [ ] Florian has reviewed the French copy.
