---
description: "Règles générales pour le vibe coding (Plan → Validation → Implémentation) et conventions de code."
applyTo: "**"
---

# INSTRUCTIONS VIBE CODING

## Workflow obligatoire : Plan → Validation → Implémentation

Chaque session suit toujours ces 3 étapes dans l'ordre :
- Lire et analyser : explorer le code existant pertinent avant toute chose
- Proposer un plan : présenter l'approche complète (voir structure du plan ci-dessous)
- Attendre la validation explicite de l'utilisateur avant d'écrire la moindre ligne de code
- Implémenter en suivant le plan validé, étape par étape
- Vérifier le code
- Mettre à jour les documentations du projet

Ne jamais commencer l'implémentation sans validation du plan.

### Structure du plan

Un plan doit contenir :
- Périmètre : quels fichiers / modules sont créés ou modifiés
- Approche : choix techniques retenus et pourquoi
- Nouvelles dépendances : liste exhaustive des packages à ajouter (voir §4)
- Impacts sur l'existant : ce qui change, ce qui ne change pas
- Séquence d'implémentation : ordre des étapes

## IMPORTANT: Git, commit & push

Ne JAMAIS `git commit` ni `git push` sans validation explicite de l'utilisateur. Même après avoir implémenté un plan validé, s'arrêter et demander avant tout commit ou push.

## IMPORTANT: Ambiguïté & doutes

En cas de doute ou d'ambiguïté sur le besoin, TOUJOURS POSER des questions à l'utilisateur avant de proposer le plan.

Si le prompt semble imprécis ou erroné, demander une clarification. Ne jamais interpréter seul.

Toujours demander avant tout choix architectural non trivial (nouvelle abstraction, nouveau fichier vs modifier l'existant, pattern inhabituel, nouvelle dépendence).

## IMPORTANT: Typographie du contenu publié

INTERDIT : le tiret cadratin `—` (U+2014) et le tiret demi-cadratin `–` (U+2013), ainsi que leurs entités `&mdash;` / `&ndash;`. Aucune occurrence ne doit exister dans `src/`, ni dans le texte visible, ni dans les `aria-label`, `alt`, `title` ou commentaires. C'est un marqueur trop reconnaissable de texte généré par IA.

À la place, reformuler : deux-points, virgule, parenthèses, ou couper en deux phrases. Ne jamais se contenter de substituer un trait d'union `-` à un tiret cadratin : c'est la structure de la phrase qu'il faut revoir.

Vérification avant toute livraison de contenu :

```sh
grep -rn "—\|–\|&mdash;\|&ndash;" src/
```

La commande doit ne rien retourner. La règle vaut aussi pour les documents Markdown écrits pour ce projet (`CONTENT-TODO.md`, `.claude/instructions/`). Elle ne s'applique pas aux fichiers de la skill `awwwards`, qui sont de la documentation tierce.
