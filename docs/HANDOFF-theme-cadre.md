# Reprise : thème « Cadre » (refonte façon Arc / Zen Browser)

> Prompt de contexte à donner à une IA qui reprend ce travail en local.
> Branche : `ccr-4f5d334c-5i88ic`, PR brouillon #17 (base `main`), commit `4f177f6`.
> Rien n'est fusionné : le site en ligne n'a pas changé.

## Contexte et demande d'origine

Site : portfolio Hugo bilingue FR/EN de Clément « Clix » Garcia (`https://clixmods.github.io/`), thème vendorisé dans `themes/portfolio.theme/`. Lis d'abord `CLAUDE.md` à la racine : il décrit l'architecture du contenu, des données et du thème, et je l'ai mis à jour pour ce thème.

Demande : remplacer l'ancien style glassmorphism / blueprint par un design **sobre et léger à la Arc / Zen Browser**. Le design a été validé sur une maquette interactive, puis implémenté dans le vrai thème. Ce que l'auteur a demandé, et qui doit rester vrai :

1. **Espaces** comme dans Arc / Zen, en bas de la barre latérale :
   - **Accueil** (icône maison) : accueil, tous les projets, compétences, services, et des dossiers Expériences, Formations et Blog.
   - **Jeux vidéo**, **Web & apps** et **Mods** : les projets rangés par support.
2. **Icônes** : les « vraies » icônes de Zen. Elles viennent d'**Ionicons**, version *pleine* (licence MIT). C'est vérifié dans `zen-browser/desktop` : `src/browser/themes/shared/zen-icons/common/selectable/CREDITS.md`.
3. **Chaque onglet de la barre latérale est une vraie page.** Le visiteur doit avoir l'impression de changer de page (Compétences ouvre `/skills/`, un projet ouvre sa page).
4. **Dossiers imbriqués** pour grouper les onglets. L'auteur les aime, à garder.
5. **Le visiteur peut réorganiser les onglets** (glisser-déposer).
6. **Clic droit › « Modifier le thème de l'espace »**.
7. **Langue** : pas de sélecteur FR/EN en bas de la barre. Un bouton « FR » à côté de la barre d'adresse, qui propose EN au clic.
8. À **retirer** : le texte « Espaces » en bas à gauche, et le « FR » en haut à droite de la feuille.
9. À **garder** : les liens épinglés en haut (GitHub, LinkedIn, CV, e-mail) et le fil « clixmods.github.io / Accueil ».

## Ce qui a été construit

### Structure de page (`layouts/_default/baseof.html`)
- `<html data-space="home|jeux|web|mods" data-lang="fr|en">`. `data-space` vient de `partials/space-of.html`.
- `.app` est une grille [barre latérale `.side` | `.sheet-wrap`]. La `.sheet` (feuille blanche) contient :
  - `.sheet-bar` : le fil d'Ariane et le bouton « afficher la barre » en mode compact ;
  - `main.sheet-body` ;
  - `footer`.
- Sur mobile : `.m-bar` (bouton tiroir, barre d'adresse, langue) et `.m-switch` (les espaces), au-dessus de la feuille.
- `partials/overlays.html` contient :
  - la recherche ⌘K, le menu contextuel, l'éditeur de thème et le toast ;
  - un `<template data-icons>` avec les icônes du menu ;
  - les libellés i18n passés au JS en `data-l-*`.

### Espaces et onglets
- **`partials/project-place.html`** donne la place d'un projet : `{space, folder}`.
  - Espace, d'après le `sector` (via `project-cats.html`) : `jv` et `tools` vont dans `jeux`, `app` dans `web`, `mods` dans `mods`.
  - Dossier, pour Jeux et Web : la sous-catégorie (`pro`, `perso`, `gamejam`, `etude`, ou `tools`).
  - Dossier, pour les Mods : déduit de `frameworks_engines`. `fw_black_ops_iii_engine` donne `bo3`. Fabric, Forge, NeoForge ou Quilt donnent `minecraft`. Sinon `other`. Aucune modification de contenu n'a été nécessaire.
- **`partials/spaces.html`** construit l'arbre complet des espaces, onglets et dossiers. Appelé via `partialCached … site.Language.Lang`, il est calculé une fois par langue.
- **`partials/sidebar-tabs.html`** (en cache aussi) rend **les onglets des 4 espaces sur chaque page**. Le CSS n'affiche que le panneau `[data-space-panel]` qui correspond à `html[data-space]`.
- **`partials/tab-thumb.html`** produit les miniatures 64×64 en webp : Fill pour les images de projet, Fit pour les logos.
- **Pages d'espace** : `content/jeux.md`, `web.md`, `mods.md` (+ `.en.md`), avec `type = "space"`, `space = "<id>"`, `headline` et `description`.
  - Gabarit : `layouts/space/single.html`.
  - URLs : `/jeux/`, `/web/`, `/mods/` ; en anglais `/en/games/` (slug), `/en/web/`, `/en/mods/`.
  - Puces de filtre par dossier (`data-filter-hash="folder"` : `/jeux/#pro` présélectionne Pro).
  - Première carte large (`is-wide`). Les projets `featured` passent en premier dans chaque dossier.
- **Accueil** (`layouts/index.html`) :
  - `home/hero.html` : utilise les nouveaux champs `personal.headline` et `headlineAccent` dans `data/profile.json` et `data/en/profile.json` ;
  - `home/doors.html` : les portes vers les 3 espaces, avec leurs compteurs ;
  - `home/recent-projects.html` : les 6 projets `featured` ;
  - `home/parcours.html` : une ligne par expérience et par formation ;
  - `home/technologies.html` et `home/testimonials.html`.
- Les autres pages (projets, projet, expériences, formations, compétences, services, blog) **gardent leurs gabarits**. Seul le CSS a changé, plus quelques petites retouches.

### État du visiteur (clés `localStorage` `cadre:*`)
| Clé | Contenu |
|---|---|
| `cadre:order:<lang>:<conteneur>` | ordre des onglets d'un conteneur `[data-sortable]` (tableau de `data-sort-key`) |
| `cadre:folders` | `{ idDossier: true/false }` dossiers ouverts |
| `cadre:compact` | `"1"` = barre latérale repliée (mode compact de Zen) |
| `cadre:last:<lang>:<espace>` | dernière page vue dans l'espace (changer d'espace y ramène) |
| `cadre:themes` | `{ espace: { a, b, accent } }` teintes personnalisées |
| `sessionStorage cadre:scroll:<espace>` | défilement de la barre latérale |

Deux scripts inline appliquent cet état **avant le premier rendu** :
- dans `head.html` : le mode compact et les teintes (variables `--th-<espace>-a|b|accent`, et `--thd-*` pour le sombre, dérivées par `color-mix`) ;
- juste après `<aside>` dans `sidebar.html` : l'ordre des onglets, l'onglet courant (`aria-current`, par comparaison de `a.pathname`), l'état des dossiers et le défilement. Il mémorise aussi l'ordre d'origine dans `data-orig`, pour « Rétablir l'ordre ».

Par défaut, un dossier est ouvert s'il a 6 onglets ou moins. Celui qui contient la page courante est toujours ouvert.

### JS (`assets/js/main.js`)
Le fichier contient deux IIFE.

1. **Coque**, ajoutée pour ce thème :
   - **Tiroir mobile** et **mode compact**.
   - **Dossiers** : clic, et ouverture quand on clique le filtre correspondant (`data-folder-link`).
   - **Changement d'espace** : bascule instantanée de `data-space`, puis navigation vers la dernière page vue.
   - **Glisser-déposer** en événements pointeur. Souris : à partir de 6 px de mouvement. Tactile : appui long de 400 ms ; un appui long relâché sans bouger ouvre le menu.
   - **Menu contextuel** : ouvrir dans un nouvel onglet, copier le lien, copier l'e-mail, modifier le thème, rétablir l'ordre.
   - **Éditeur de thème** : 12 teintes prêtes et 3 `<input type="color">`.
   - **Popover de langue**.
   - **Recherche ⌘K** : son index est construit depuis les onglets de la barre latérale. Elle se navigue au clavier.
2. **Fonctions existantes**, reprises telles quelles : filtres à facettes, rotation des technos sur les cartes, carrousel de témoignages, lightbox, « voir plus » des galeries, modale des compétences.

L'ancien code de la navbar, du menu burger et du « reveal » a été supprimé. `.reveal` est neutralisé en CSS : le contenu est toujours visible.

### Styles (`assets/scss/`, **Dart Sass**)
- `main.scss` importe dans l'ordre :
  - `_tokens` : palettes par espace dans une map `$spaces` (clair et sombre), jetons de feuille et d'encre ;
  - `_base` : reset, boutons, puces, prose ;
  - `_shell` : cadre, barre latérale, onglets, dossiers, feuille, mode compact, mobile, View Transitions ;
  - `_overlays`, `_components` (cartes, grilles, filtres, puces techno), `_home`, `_pages` (services, blog, article), `_project`, `_timeline`, `_skills`, `_testimonials`.
- Les anciens fichiers (glass, blueprint, navbar, hero, etc.) sont supprimés, ainsi que les partials `blueprint-bg`, `navbar`, `home/shortcut-cards`, `home/about` et `home/experiences`.
- `head.html` compile avec `transpiler: dartsass` et passe `silenceDeprecations: import, global-builtin`. C'est nécessaire pour `@each`, `color-mix()` et `max()`, car libsass ne les gère pas.
- Polices : Geist et Geist Mono (Google Fonts).
- Le thème sombre suit `prefers-color-scheme` ; il n'y a pas de bouton.
- Teintes par défaut :

  | Espace | Couleurs du cadre | Accent |
  |---|---|---|
  | home (Nuit) | `#cfd8f6` → `#f3d3da` | `#3f5bd8` |
  | jeux (Prune) | `#e2d4f4` → `#f6d6e2` | `#7a3fc4` |
  | web (Sauge) | `#d3e6dc` → `#ece8d2` | `#2f7d5b` |
  | mods (Ambre) | `#f2e0c8` → `#efd5cf` | `#b0552c` |

### Icônes
- Les SVG Ionicons pleins (v7.4.0) sont dans `themes/portfolio.theme/assets/icons/`, avec `LICENSE-ionicons.txt`.
- On les rend via `partial "icon.html" "nom"` (ou `(dict "name" … "class" …)`). Le partial ajoute `fill="currentColor"`.
- Pour ajouter une icône : `curl -o <nom>.svg https://cdn.jsdelivr.net/npm/ionicons@7.4.0/dist/svg/<nom>.svg`.

### i18n
Les nouvelles clés sont en fin de `i18n/fr.yaml` et `en.yaml` (bloc « Thème Cadre ») :
- `space_*`, `space_all_*`, `folder_*`, `tab_all_*` ;
- `ui_n_projects` (pluriel), `ui_search`… ;
- `ctx_*`, `theme_*`, `home_*`.

## Vérifié

- `hugo --gc --minify --environment production` (Hugo Extended 0.150.0 + Dart Sass 1.92.1) passe sans erreur ni avertissement.
- Captures Playwright (Chromium) sur l'accueil, `/jeux/`, un projet, `/projects/`, `/skills/`, `/experiences/`, une expérience, `/services/`, `/posts/` et `/en/` :
  - ordinateur 1280 px et mobile 390–400 px, en clair et en sombre ;
  - pas de défilement horizontal, pas d'erreur JS.
- Testé en vrai dans Chromium :
  - ouverture et fermeture des dossiers ;
  - glisser-déposer, ordre conservé après rechargement ;
  - clic droit, application d'une teinte et stockage ;
  - ⌘K et la touche Entrée qui ouvre le résultat ;
  - changement d'espace qui revient à la dernière page vue ;
  - FR → EN sur la page traduite (`/jeux/` → `/en/games/`) ;
  - mode compact et tiroir mobile.

## Pas vérifié / limites connues

- **Taille des pages** : environ 100 Ko par page en HTML minifié. Chaque page embarque les onglets des 4 espaces avec des SVG inline répétés. Le gzip absorbe une bonne partie. La piste suivante serait un sprite SVG avec `<use href="#ico-…">`.
- Le glisser-déposer ne déplace un onglet **qu'à l'intérieur de son conteneur** : pas d'un dossier à l'autre, et un dossier ne peut pas entrer dans un autre.
- Pas testé sur un vrai iPhone ou Android : l'appui long tactile n'a été vérifié qu'en émulation. Lighthouse n'a pas été lancé. L'étape `uglify-js` de la CI n'a pas été rejouée en local, mais le JS est en ES5 (`var`, pas de flèches).
- Les View Transitions entre pages ne marchent que dans Chromium et Safari 18.2+. Ailleurs, la navigation est classique.
- Le dossier « Outils » (secteur `tools`) est prévu dans Jeux, mais `unity-editor-tools` n'est pas publié, donc il n'apparaît pas.
- Choix provisoires, à confirmer avec l'auteur :
  - les espaces en bas n'ont que des **icônes**, avec une info-bulle ; le nom de l'espace courant est affiché au-dessus des onglets. Sur mobile, les noms sont visibles au-dessus de 420 px ;
  - le nom « Web & apps » plutôt que « Sites » ;
  - dans l'espace Accueil, le nom de l'espace et le premier onglet disent tous les deux « Accueil ».
- Déjà le cas avant cette refonte : `cv.md` (`layout = "cv"`) et `demo.md` (`layout = "demo"`) n'ont pas de gabarit dédié et retombent sur `_default/single.html`.
- Le titre « # Mes Compétences » dans `content/skills/_index.md` est masqué en CSS (`.skills-intro > h1:first-child`), parce qu'il doublait le h1 de la page.

## Pour reprendre

```bash
git checkout ccr-4f5d334c-5i88ic
hugo server --config hugo.dev.toml   # nécessite `sass` (Dart Sass) dans le PATH
```

Règles du projet (voir `CLAUDE.md`) :
- les technos sont toujours référencées par clé (`lang_*`, `fw_*`, …) ;
- le front matter est en TOML ;
- un fichier par langue (`x.md` / `x.en.md`) ;
- pas de `console.log` en production (la CI les retire).

Ce fichier est une note de passation : il peut être supprimé avant de fusionner la PR.
