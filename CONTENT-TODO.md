# Contenu des popups « introspect » — à rédiger

22 fiches au total : **1 rédigée** (Lectra, qui sert de modèle), **21 à écrire**.

Tout le contenu vit dans `src/index.html`, dans les `<template data-entity="…">` regroupés après le `<dialog>` (à partir de la ligne 594). Rien d'autre à toucher : le JS clone le template au clic et le CSS habille les classes.

---

## Comment ça marche, en deux règles

**Règle 1 — un template manquant désactive son trigger.** Au chargement, `main.js` vérifie que chaque `[data-introspect]` a bien un `<template data-entity>` correspondant. Sinon il dégrade l'élément en markup inerte : le `<button>` redevient un `<span>`, la carte perd son `[+]`. Tu peux donc publier à tout moment, même avec la moitié des fiches vides — rien ne casse et rien de vide ne s'ouvre.

**Règle 2 — les enfants directs du template sont l'unité d'animation.** Le decode sweep révèle chaque enfant direct l'un après l'autre (70ms d'écart). Donc : garder des blocs de premier niveau, ne pas tout emballer dans une `<div>` unique, sinon tout apparaît d'un coup.

---

## Blocs disponibles

| Classe | Rôle | Note |
|---|---|---|
| `introspect__kicker` | Surtitre mono cyan | 3-6 mots, pas de phrase |
| `introspect__title` | Le nom de l'entité | reçoit automatiquement l'`id` pour `aria-labelledby` |
| `introspect__lede` | Chapô | 1-2 phrases, c'est ce qu'on lit vraiment |
| `introspect__claims` | Grille de faits mono | `<dl>` avec des `<div><dt>clé</dt><dd>valeur</dd></div>` |
| `introspect__block` | Encadré à filet cyan | pour « My chapter » |
| `introspect__list` | Liste à chevrons | 3 items max, sinon ça devient un CV dans le CV |
| `introspect__foot` | Pied : lien externe + signature mono | |

---

## 1. Entreprises (timeline + about)

| Entité | `data-entity` | Template | Déclencheurs |
|---|---|---|---|
| Lectra SA | `lectra` | **✅ rédigé** — ligne 598 | `index.html:133` (about), `:314`, `:379` (timeline ×2) |
| Orange | `orange` | ⬜ ligne 641 | `index.html:348` |
| La Banque Postale | `banque-postale` | ⬜ ligne 660 | `index.html:410` |
| Crédit Agricole Aquitaine | `credit-agricole` | ⬜ ligne 679 | `index.html:441` |

Blocs attendus : kicker · lede · claims · block « My chapter » · foot.

**À vérifier dans la fiche Lectra** : un commentaire `<!-- TODO verify -->` signale les chiffres que je n'ai pas sourcés (1973, Euronext, Cestas). À confirmer avant publication.

**Sur les claims** : quatre clés `founded / hq / sector / scale` sont en place avec des `—`. Si tu n'as pas la donnée, supprime le `<div>` plutôt que de laisser un tiret — la grille est en `auto-fit`, elle se réajuste seule.

---

## 2. ESN / sociétés de portage

| Entité | `data-entity` | Template | Déclencheurs |
|---|---|---|---|
| Néo-Soft | `neo-soft` | ⬜ ligne 698 | `index.html:348`, `:379` |
| Geos-Informatique | `geos-informatique` | ⬜ ligne 717 | `index.html:410` |
| Ausy | `ausy` | ⬜ ligne 736 | `index.html:441` |

Même structure que les entreprises. Ces trois-là méritent sans doute des fiches plus courtes : le « My chapter » y est moins central, c'est le contexte de mission qui compte.

---

## 3. Formation & certification

| Entité | `data-entity` | Template | Déclencheurs |
|---|---|---|---|
| Université Victor Segalen Bordeaux 2 | `bordeaux-2` | ⬜ ligne 755 | `index.html:482`, `:490` |
| Scrum.org | `scrum-org` | ⬜ ligne 774 | `index.html:509` |

Un seul template pour Bordeaux 2, ouvert depuis le Master **et** la Licence — donc écrire une fiche sur l'établissement, pas sur un diplôme en particulier.

Pour `scrum-org`, la fiche porte sur l'organisme certificateur ; le détail de ce que PSM I évalue a sa place dans le lede.

---

## 4. Cartes Focus

Huit fiches, structure identique : kicker · lede · liste de 3 items.

| Carte | `data-entity` | Template | Déclencheur |
|---|---|---|---|
| Architecture & Resilience | `focus-01` | ⬜ ligne 793 | `index.html:160` |
| Production Operations | `focus-02` | ⬜ ligne 804 | `index.html:167` |
| OAuth2 & Beyond | `focus-03` | ⬜ ligne 815 | `index.html:174` |
| API Design | `focus-04` | ⬜ ligne 826 | `index.html:181` |
| AI-Augmented Engineering | `focus-05` | ⬜ ligne 837 | `index.html:188` |
| Fast Feedback Loops | `focus-06` | ⬜ ligne 848 | `index.html:195` |
| Developer Experience | `focus-07` | ⬜ ligne 859 | `index.html:202` |
| DevOps as Culture | `focus-08` | ⬜ ligne 870 | `index.html:209` |

Le squelette propose trois angles : *une chose concrète que j'ai faite* / *un arbitrage que j'ai réellement tranché* / *ce que je ferais autrement aujourd'hui*. C'est le troisième qui fait la différence pour un lecteur technique — c'est aussi celui qu'on a le plus envie de sauter.

Le lede ne doit pas reformuler la carte : la carte est déjà visible derrière la popup.

---

## 5. Tags de la stack

Cinq tags ont un template, et ce sont les seuls à afficher la bordure cyan + le point dans le marquee.

| Tag | `data-entity` | Template | Déclencheurs |
|---|---|---|---|
| Auth0 | `auth0` | ⬜ ligne 881 | `index.html:247`, `:277` |
| Apollo Federation | `apollo-federation` | ⬜ ligne 890 | `index.html:241`, `:271` |
| Kubernetes | `kubernetes` | ⬜ ligne 899 | `index.html:250`, `:280` |
| Turborepo | `turborepo` | ⬜ ligne 908 | `index.html:255`, `:285` |
| Claude | `claude` | ⬜ ligne 917 | `index.html:262`, `:292` |

Structure courte : kicker · lede · foot. L'angle du squelette est *comment je m'en sers réellement*, pas ce que dit la page d'accueil de l'outil — une fiche qui paraphrase la doc ne vaut pas le clic.

### Les 23 tags sans template

Ils sont déjà marqués `data-introspect` dans le HTML mais restent inertes tant qu'aucun template n'existe. Pour en activer un : ajouter le `<template data-entity="…">`, rien d'autre.

`typescript` · `shell` · `express` · `fastify` · `graphql` · `graphql-yoga` · `prisma` · `rabbitmq` · `postgresql` · `mongodb` · `redis` · `linux` · `docker` · `azure` · `ansible` · `git` · `pnpm` · `turborepo-remote-cache` · `renovate` · `syncpack` · `splunk` · `atlassian` · `copilot`

Mon avis : ne pas viser les 28. Cinq à huit tags bien écrits valent mieux que vingt-huit fiches tièdes, et l'asymétrie est déjà lisible à l'écran puisque seuls les tags actifs portent la bordure cyan.

---

## Ordre suggéré

1. **Les 4 entreprises** — c'est le cœur du CV, et c'est là que le clic est le plus probable.
2. **Les 8 cartes Focus** — le volume de rédaction le plus lourd, mais la plus forte valeur pour un lecteur technique.
3. **Bordeaux 2 + Scrum.org** — court, vite expédié.
4. **Les 3 ESN** — faible enjeu, à traiter en dernier ou à retirer.
5. **Les tags** — au fil de l'eau.

Pour retirer une fiche plutôt que l'écrire : supprimer son `<template>`. Le trigger se désactive tout seul, sans toucher au reste du markup.
