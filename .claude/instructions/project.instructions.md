---
description: "Règles générales pour le vibe coding (Plan → Validation → Implémentation) et conventions de code."
applyTo: "**"
---

# INSTRUCTIONS VIBE CODING

## Workflow obligatoire : Plan → Validation → Implémentation

Chaque session suit toujours ces 3 étapes dans l'ordre :
- Lire et analyser — explorer le code existant pertinent avant toute chose
- Proposer un plan — présenter l'approche complète (voir structure du plan ci-dessous)
- Attendre la validation explicite de l'utilisateur avant d'écrire la moindre ligne de code
- Implémenter — en suivant le plan validé, étape par étape
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

## IMPORTANT: Git — commit & push

Ne JAMAIS `git commit` ni `git push` sans validation explicite de l'utilisateur. Même après avoir implémenté un plan validé, s'arrêter et demander avant tout commit ou push.

## IMPORTANT: Ambiguïté & doutes

En cas de doute ou d'ambiguïté sur le besoin, TOUJOURS POSER des questions à l'utilisateur avant de proposer le plan.

Si le prompt semble imprécis ou erroné, demander une clarification — ne jamais interpréter seul.

Toujours demander avant tout choix architectural non trivial (nouvelle abstraction, nouveau fichier vs modifier l'existant, pattern inhabituel, nouvelle dépendence).
