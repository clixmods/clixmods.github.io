+++
date = "2026-09-07T10:00:00+02:00"
draft = false
title = "MC Skin Creator"
slug = "mc-skin-creator"
subtitle = "Créateur de skins Minecraft 100 % dans le navigateur"
description = "Application web sans serveur ni dépendance : catalogue de 703 éléments superposables en calques, éditeur de pixels, moteur 3D WebGL et encodeur GIF écrits à la main"
tags = [
  "JavaScript",
  "WebGL",
  "Site Statique",
  "Zéro Dépendance",
  "Cloudflare Workers"
]
category = "projects"
sector = "appsweb-personnel"
featured = true
featuredInCV = false
fmContentType = "project-content-type"
status = "En production"
image = "/images/projects/mc-skin-creator/catalogue-3d.webp"
programming_languages = [ "lang_javascript", "lang_html", "lang_css" ]
frameworks_engines = [ "fw_webgl", "fw_nodejs" ]
specialties = [
  "spec_interface_utilisateur",
  "spec_experience_utilisateur_ux",
  "spec_architecture_logicielle",
  "spec_developpement_outils",
  "spec_algorithmique",
  "spec_optimisation",
  "spec_gestion_de_fichiers",
  "spec_design_pattern_et_refactoring",
  "spec_developpement_dapplications"
]
soft_skills = [
  "skill_resolution_problemes",
  "skill_creativite",
  "skill_visionvisualisation"
]
tools = [ "tool_visual_studio_code", "tool_github", "tool_cloudflare_workers", "tool_claude" ]

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

## Description du projet

> *"Composer un skin Minecraft comme on s'habille : en empilant des vêtements, pas en repeignant des pixels un par un."*

**MC Skin Creator** est un créateur de skins Minecraft qui tourne **entièrement dans le navigateur**, en ligne sur **[mcskincreator.app](https://mcskincreator.app/)**. Pas de compte, pas de téléchargement, pas de serveur applicatif : la page charge son catalogue et tout se passe ensuite côté client.

Le projet part d'un constat simple. Les éditeurs de skins existants demandent soit de peindre une texture 64×64 pixel par pixel, soit de choisir un skin tout fait sans pouvoir le modifier. Ici, un skin est une **pile de calques** : une peau, des cheveux, des yeux, un haut, un pantalon, des chaussures — chacun restant modifiable, déplaçable et recolorable après coup.

Le catalogue compte **703 éléments** répartis en catégories (peaux, cheveux, yeux, bouches, chapeaux, accessoires, hauts, vestes, pantalons, chaussures…), chacun **recolorable zone par zone** en conservant ses ombres et son grain. S'y ajoutent un **éditeur de pixels** sur la texture 64×64, un **aperçu 3D temps réel** avec poses et vue à la première personne, et des **exports** en PNG, en GIF animé, en planche de sprites ou en projet réutilisable.

Le site est disponible en **français, anglais et espagnol**, et c'est un **projet personnel**, mené seul de la conception jusqu'à la mise en ligne.

*Projet non officiel. Non approuvé par, ni associé à Mojang ou Microsoft. « Minecraft » est une marque déposée de Mojang Synergies AB.*
