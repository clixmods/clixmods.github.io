---
title: Comment j'ai créé mon nouveau portfolio Hugo
subtitle: "De Notion à Hugo : l'histoire d'une migration vers un portfolio sur mesure"
date: 2025-08-07T22:09:52.591Z
draft: true
category: tech
tags:
  - Hugo
  - Portfolio
  - Development
  - Migration
  - Front Matter CMS
  - GitHub Pages
technologies:
  - Hugo
  - JavaScript
  - HTML/CSS
  - Front Matter CMS
  - GitHub Pages
  - Git
image: /images/blog/creation-portfolio-hugo.jpg
description: "Retour d'expérience sur la création de mon nouveau portfolio avec Hugo : choix techniques, défis rencontrés et solutions mises en place."
fmContentType: default
---

# 🚀 Comment j'ai créé mon nouveau portfolio (et pourquoi j'ai quitté Notion)

Il y a quelques mois, j'ai pris une décision qui peut sembler étrange pour certains : abandonner Notion pour créer mon portfolio de zéro. Aujourd'hui, je vous raconte cette aventure technique et les raisons qui m'ont poussé à franchir le pas.

## 💡 Pourquoi quitter Notion ?

Pendant longtemps, j'ai utilisé **Notion** comme portfolio. Et je dois l'admettre : c'était pratique, rapide à mettre à jour, et visuellement correct pour commencer.

Mais un problème me trottait constamment dans la tête :

> *"En tant que développeur, ne pas avoir mon portfolio versionné dans un vrai repo me gêne…"*

Cette frustration grandissait au fil du temps. J'avais envie de :

- **Contrôler totalement le design** et chaque pixel de mon interface
- **Optimiser les performances au maximum** sans dépendre d'une plateforme tierce
- **Pouvoir itérer facilement** et publier des articles techniques
- **Montrer mes compétences** en créant moi-même l'outil qui représente mon travail

En tant que développeur spécialisé en **C#** et **Unity**, créer un simple site web pouvait sembler secondaire. Mais j'ai réalisé que mon portfolio était ma première impression professionnelle - il devait refléter ma rigueur technique et ma capacité à mener un projet de bout en bout.

## 🛠️ Les choix techniques

Pour ce portfolio, je voulais un **générateur de site statique** : rapide, léger, et facile à déployer. Après avoir comparé plusieurs solutions (Gatsby, Next.js, Jekyll), j'ai opté pour **Hugo**.

### Pourquoi Hugo ?

- **Performance exceptionnelle** : Génération quasi-instantanée des pages
- **SEO optimisé** : Structure HTML propre et métadonnées automatiques  
- **Simplicité** : Pas de complexité JavaScript côté build
- **Flexibilité** : Templates puissants avec Go templates
- **Écosystème mature** : Large communauté et documentation complète

### L'architecture technique

Mon portfolio repose sur une architecture modulaire et data-driven :

```
portfolio/
├── content/                 # Contenu Markdown
│   ├── posts/              # Articles de blog
│   └── projects/           # Projets détaillés
├── data/                   # Données structurées JSON
│   ├── profile.json        # Informations personnelles
│   ├── technologies.json   # Stack technique avec expérience
│   └── config.json         # Configuration navigation
├── themes/portfolio.theme/ # Thème personnalisé (git submodule)
│   ├── layouts/            # Templates Hugo
│   ├── assets/scss/        # Styles modulaires
│   └── assets/js/          # Interactions dynamiques
└── static/                 # Assets statiques
    └── images/             # Images optimisées par secteur
```

Cette architecture me permet de :
- **Séparer le contenu de la présentation** via les fichiers JSON
- **Maintenir un thème réutilisable** dans un repository séparé
- **Gérer facilement** les technologies et projets via des données structurées

### Front Matter CMS : La révélation

L'un des points clés de ce setup est **Front Matter CMS** - un plugin VS Code qui transforme mon éditeur en interface de gestion de contenu.

Grâce à un fichier `frontmatter.json` de plus de 1400 lignes, j'ai configuré :
- **Types de contenus personnalisés** pour les projets et articles
- **Interfaces de saisie** avec validation automatique
- **Gestion des médias** intégrée à VS Code
- **Workflows éditoriaux** avec prévisualisation en temps réel

```json
{
  "frontMatter.taxonomy.contentTypes": [
    {
      "name": "project-content-type",
      "fields": [
        {
          "title": "Technologies",
          "name": "technologies",
          "type": "tags",
          "taxonomyLimit": 10
        },
        {
          "title": "Secteur",
          "name": "sector",
          "type": "choice",
          "choices": ["jeux-video", "apps-web", "outils-dev"]
        }
      ]
    }
  ]
}
```

Cette approche me donne le **meilleur des deux mondes** : la simplicité d'édition de Notion avec la puissance technique d'un setup personnalisé.

## 🎨 Un design qui me ressemble

L'objectif était clair : **moderne, épuré, efficace**. 

### Inspiration macOS

J'ai créé une interface inspirée de **macOS** avec :
- **Dock de navigation** avec icônes SVG et animations fluides
- **Top bar** avec horloge temps réel et indicateurs de batterie (mobile)
- **Effets glassmorphism** subtils pour la profondeur
- **Thème sombre/clair** avec transition automatique

Le dock de navigation est l'élément central :

```html
<nav id="dock" role="navigation" aria-label="Navigation principale">
  <ul class="dock-list">
    <li class="dock-item">
      <a href="/" class="dock-button" aria-label="Profil - Accueil">
        <svg class="dock-icon"><!-- Icône profil --></svg>
        <span class="dock-label">Profil</span>
      </a>
    </li>
    <!-- Autres éléments : Compétences, Blog, Projets, etc. -->
  </ul>
</nav>
```

### Système de technologies intelligent

J'ai développé un **système de badges technologiques** qui filtre automatiquement mes projets :

```json
[
  {
    "name": "C#",
    "icon": "🔷",
    "iconSvg": "/images/technologies/C#-(CSharp).svg",
    "color": "#239120",
    "enabled": true,
    "order": 1,
    "experience": "4 ans",
    "level": "Expert"
  }
]
```

Chaque projet référence ces technologies par nom exact, permettant un **filtrage dynamique** et une **cohérence visuelle** automatique.

### Performance et optimisation

Points clés pour les performances :
- **Images optimisées** avec formats WebP et AVIF
- **CSS modulaire** avec variables CSS personnalisées
- **JavaScript progressif** : fonctionne même sans JS
- **Lazy loading** pour les images et animations
- **Minification automatique** des assets

## 📝 Et maintenant ?

Ce portfolio n'est pas qu'une vitrine statique : **il va évoluer en permanence**.

### Contenu à venir

J'y publierai régulièrement :

- **Articles techniques** : Retours d'expérience sur Unity, C#, architecture logicielle
- **Billets de développement** : Process créatifs, outils découverts, optimisations
- **Ressources open source** : Outils Unity, scripts utiles, templates
- **Réflexions sur l'industrie** : Game design, production, tendances tech

### Évolutions techniques prévues

- **Recherche full-text** dans les articles avec Fuse.js
- **Système de commentaires** avec Giscus (GitHub Discussions)
- **Analytics privacy-first** avec Plausible
- **PWA** pour une expérience mobile optimale
- **API headless** pour exposer mes données projet

### Open Source

Le code source est entièrement **disponible sur GitHub** :
- [Portfolio principal](https://github.com/clixmods/portfolio) 
- [Thème personnalisé](https://github.com/clixmods/portfolio.theme)

Cette approche open source me permet de :
- Partager mes solutions techniques avec la communauté
- Recevoir des contributions et améliorations
- Documenter publiquement mon process de développement
- Servir d'exemple pour d'autres développeurs

## 🔧 Les défis techniques rencontrés

### Migration du contenu

Transférer 3 ans de projets depuis Notion vers Markdown a été un défi. J'ai développé un **script de migration** qui :
- Exporte automatiquement les pages Notion en Markdown
- Convertit les métadonnées en frontmatter TOML
- Télécharge et optimise les images
- Préserve la structure des liens internes

### Gestion des assets

Avec plus de **200 images** de projets, la gestion des assets était critique. J'ai organisé les fichiers par secteur :

```
static/images/
├── projects/
│   ├── jeux-video/
│   ├── apps-web/
│   └── outils-dev/
├── technologies/          # SVG icons
├── companies/            # Logos employeurs
└── people/               # Avatars témoignages
```

### Performance du build

Hugo est rapide, mais avec 50+ projets et articles, j'ai optimisé :
- **Pagination automatique** pour les listes
- **Image processing** avec redimensionnement automatique
- **Cache intelligent** pour les ressources externes
- **Build incrémental** en développement

## 💬 Feedbacks bienvenus !

Ceci est la **version 1.0** de mon nouveau portfolio. Vos retours sont précieux :

- 🎨 **Design** : L'interface vous semble-t-elle intuitive ?
- ⚡ **Performance** : Temps de chargement acceptables ?
- 📱 **Mobile** : Expérience fluide sur smartphone ?
- 📝 **Contenu** : Informations utiles et bien présentées ?

### Comment contribuer

Plusieurs façons de m'aider à améliorer ce portfolio :

1. **Issues GitHub** : Signaler des bugs ou suggérer des améliorations
2. **Pull Requests** : Proposer des correctifs ou nouvelles fonctionnalités  
3. **Discussions** : Partager vos idées sur l'architecture ou le design
4. **Partage** : Faire connaître le projet si il vous inspire

## 🎯 Conclusion

Cette migration de Notion vers Hugo représente bien plus qu'un simple changement d'outil. C'est une **démarche d'appropriation technique** qui me permet de :

- **Maîtriser totalement** ma présence en ligne
- **Démontrer concrètement** mes compétences techniques
- **Itérer rapidement** sur le design et les fonctionnalités
- **Partager mes connaissances** avec la communauté

En tant que développeur **C# / Unity**, créer ce portfolio m'a permis d'explorer d'autres technologies tout en appliquant les mêmes principes de **clean architecture** et de **maintenabilité** que j'utilise dans mes projets de jeux.

Le résultat ? Un outil évolutif qui grandit avec moi et reflète fidèlement mon approche du développement : **technique, réfléchie, et orientée qualité**.

---

**🔗 Liens utiles :**
- [Portfolio en ligne](https://clixmods.github.io/portfolio)
- [Code source](https://github.com/clixmods/portfolio)
- [Thème Hugo](https://github.com/clixmods/portfolio.theme)
- [Documentation Hugo](https://gohugo.io/documentation/)
- [Front Matter CMS](https://frontmatter.codes/)

**📬 Me contacter :**
N'hésitez pas à me faire vos retours par [email](mailto:clement.g.developer@gmail.com) ou sur [LinkedIn](https://linkedin.com/in/clixmods) !
