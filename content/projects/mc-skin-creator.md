+++
date = "2026-09-07T10:00:00+02:00"
draft = false
title = "MC Skin Creator"
slug = "mc-skin-creator"
subtitle = "Éditeur de skins Minecraft en ligne : back-end Java / Spring Boot, front Angular"
description = "Éditeur de skins Minecraft dans le navigateur : API REST et moteur de composition de textures en Java 21 / Spring Boot 4, front Angular 21 avec rendu 3D WebGL sur mesure, livrés dans un seul jar exécutable"
tags = [
  "Java",
  "Spring Boot",
  "JPA",
  "Flyway",
  "Angular",
  "TypeScript",
  "WebGL",
  "JUnit",
  "Playwright",
  "GitHub Actions"
]
category = "projects"
sector = "appsweb-personnel"
featured = true
featuredInCV = false
fmContentType = "project-content-type"
status = "En production"
image = "/images/projects/mc-skin-creator/catalogue-3d.webp"
programming_languages = [ "lang_java", "lang_typescript" ]
frameworks_engines = [ "fw_spring_boot", "fw_jpa", "fw_flyway", "fw_angular", "fw_webgl" ]
specialties = [
  "spec_developpement_dapi",
  "spec_architecture_logicielle",
  "spec_gestion_des_donnees",
  "spec_securite_et_optimisation",
  "spec_algorithmique",
  "spec_optimisation",
  "spec_developpement_dapplications",
  "spec_interface_utilisateur",
  "spec_experience_utilisateur_ux",
  "spec_gestion_de_fichiers",
  "spec_design_pattern_et_refactoring"
]
soft_skills = [
  "skill_resolution_problemes",
  "skill_creativite",
  "skill_visionvisualisation"
]
tools = [ "tool_junit", "tool_playwright", "tool_github_actions", "tool_github", "tool_visual_studio_code", "tool_claude" ]

[[actions]]
type = "website"
label = "Voir le site"
url = "https://mcskincreator.app/"
primary = true
fieldGroup = "actions_group"

[[contributors]]
person = "clement-garcia"
roles = [ "Développeur", "Designer" ]
fieldGroup = "contributors_group"

[[galleries]]
title = "L'application"
description = ""
size = "size-large"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/mc-skin-creator/vue-3d-texture.webp"
  caption = "Aperçu 3D et texture côte à côte : ce qu'on peint apparaît immédiatement sur le personnage."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/mc-skin-creator/editeur-pixels.webp"
  caption = "L'éditeur de pixels sur la texture 64×64, avec grille, contours des faces et mode miroir."
  fieldGroup = "gallery_group"

[ranking]
event_type = ""
suffix = ""

[widget_order]
contributors = 10
development_time = 20
gallery = 30
technical_specs = 40
specialties = 50
soft_skills = 55
tools = 60
awards = 70
testimonials = 80
youtube_videos = 90
clients = 100
grade = 110
downloads = 120
ranking = 130
+++

# MC Skin Creator

**Stack :** Java 21 · Spring Boot · JPA / Flyway · Angular · TypeScript · WebGL · JUnit · Playwright · GitHub Actions

**MC Skin Creator** est un éditeur de skins Minecraft dans le navigateur, en ligne sur **[mcskincreator.app](https://mcskincreator.app/)**. On compose un personnage en empilant des calques (peau, yeux, cheveux, vêtements…) pris dans un catalogue de plus de 500 éléments, on les recolore, on dessine au pixel et on voit le résultat en 3D animée, avant de l'exporter en PNG, en GIF ou en planche de sprites. L'application associe un back-end **Java 21 / Spring Boot 4** et un front **Angular 21**, livrés ensemble dans un seul jar exécutable construit par Maven. Interface en français, anglais et espagnol ; projet personnel, entièrement développé avec l'assistance de l'IA (Claude).

## Back-end — Java 21, Spring Boot 4

- **Moteur de composition de textures en Java** : recoloration de chaque élément par zones, réglages teinte / saturation / luminosité, empilement des calques, puis génération de la texture 64×64 et de sa vignette, recalculées et stockées à chaque enregistrement. Un test compare les résultats octet par octet à l'implémentation de référence sur tout le catalogue (plus de 1 800 cas).
- **API REST de stockage des skins** (Spring MVC, Spring Data JPA, migrations Flyway, base H2) : brouillon enregistré automatiquement, skins nommés, texture et vignette servies en PNG. Client anonyme identifié par un UUID dans un en-tête, modèle prévu pour accueillir une table de comptes.
- **Validation et import** : un projet mal formé est refusé en 400 au format *problem details* (RFC 9457), avec la liste de chaque écart et son chemin (par exemple `layers[3].adj.hue`). Import de skins PNG 64×64, 64×32 (déplié par symétrie) ou HD (réduits), chaque refus portant un code d'erreur traduit par le front.
- **Catalogue et chargement rapide** : fusion de plusieurs sources d'assets avec rechargement à chaud, recherche paginée dans les trois langues, tirages aléatoires rejouables par graine, crédits et licence pour chaque élément. Plus de 1 000 PNG sont regroupés en une planche compressée par catégorie, avec une empreinte du contenu dans l'URL pour le cache long : l'éditeur est prêt en moins de 300 ms.
- **Profils, sécurité et référencement** : deux profils Spring, dont un profil public qui ne sert que les éléments dont la licence autorise la publication (vérifié par un test). Filtre posant les en-têtes de sécurité (CSP stricte, sans script inline) et les règles de cache ; sitemap, robots.txt et image de partage Open Graph (1200×630) générés côté serveur.

## Front-end — Angular 21, TypeScript

- **Éditeur complet** : bibliothèque par régions et catégories, pile de calques en glisser-déposer, inspecteur de couleurs, éditeur de pixels 2D, historique annuler / rétablir.
- **Rendu 3D en WebGL sur mesure**, sans bibliothèque 3D : dix animations reprises du jeu, vue à la première personne, peinture directement sur le modèle 3D (sélection du texel par rendu hors écran).
- **Architecture Angular** : composants autonomes, état géré par signaux, détection de changement sans zone.js, boucle d'animation hors d'Angular. Couche de stockage abstraite : le même front fonctionne sur l'API Java ou sur le localStorage.
- **Exports et mobile** : encodeur GIF animé intégré au projet (quantification median-cut, compression LZW), interface adaptée au mobile (tiroirs, gestes tactiles, pincement à deux doigts dans l'éditeur de pixels).

**Qualité :** tests JUnit (API, moteur, profils, validation), Vitest (moteur TypeScript, i18n, SEO) et 41 tests Playwright de bout en bout (brouillon conservé après rechargement, isolation de deux clients, import, export) ; tests de parité garantissant que les moteurs Java et TypeScript produisent exactement les mêmes octets ; pipeline GitHub Actions avec build Maven complet, tests Java et tests front.

*Projet non officiel. Non approuvé par, ni associé à Mojang ou Microsoft. « Minecraft » est une marque déposée de Mojang Synergies AB.*
