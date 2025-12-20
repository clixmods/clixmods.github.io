+++
date = "2025-07-24T12:00:00.000Z"
draft = false
title = "Stone Keeper 2"
subtitle = "Jeu isométrique d'action aventure"
description = "Suite de Stone Keeper avec des mécaniques étendues et un monde plus vaste"
tags = [ "Adventure", "Unity", "Sequel", "Open World", "Atlantis" ]
category = "projects"
sector = "games-personnel"
featured = true
fmContentType = "project-content-type"
logo = "/images/projects/stone-keeper-2/stone-keeper2-logo.png"
status = "Terminé"
technical_specs = [ ]
frameworks_engines = [ "fw_unity", "fw_net" ]
programming_languages = [ "lang_csharp" ]
soft_skills = [ "skill_resolution_problemes", "skill_gestion_de_projet" ]
specialties = [
  "spec_developpement_outils",
  "spec_interface_utilisateur",
  "spec_design_pattern_et_refactoring",
  "spec_programmation_orientee_objet",
  "spec_game_design",
  "spec_experience_utilisateur_ux",
  "spec_maintenance_and_debogage",
  "spec_optimisation",
  "spec_architecture_logicielle"
]
image = "/images/projects/stone-keeper-2/stone-keeper2-2.jpg"
tools = [ "tool_jetbrains", "tool_trello", "tool_photoshop", "tool_fork", "tool_github" ]

[[actions]]
type = "download"
label = "Jouer au jeu"
url = "https://tlcstonekeeper.itch.io/stonekeeper"
icon = "download"
primary = true

[[actions]]
type = "youtube"
label = "Voir trailer"
url = "https://youtu.be/j4MpNqSn3YQ"
icon = "youtube"
primary = false

[[contributors]]
person = "clement-garcia"
roles = ["Développeur"]
fieldGroup = "contributors_group"

[[contributors]]
person = "lea-hoaraux"
roles = ["Artiste 2D", "Artiste 3D", "Texturing", "Lighting"]
fieldGroup = "contributors_group"

[[contributors]]
person = "alix-granlin"
roles = ["Artiste 3D", "Texturing", "Lighting"]
fieldGroup = "contributors_group"

[[contributors]]
person = "bruno-davila"
roles = ["Artiste 3D"]
fieldGroup = "contributors_group"

[[contributors]]
person = "xavier-gappe"
roles = ["Artiste 3D", "Level Designer"]
fieldGroup = "contributors_group"

[[contributors]]
person = "oscar-durandd"
roles = ["Animateur 3D", "Rigging"]
fieldGroup = "contributors_group"

[[contributors]]
person = "jeremy-ferreira"
roles = ["Développeur", "Tech Art"]
fieldGroup = "contributors_group"

[[contributors]]
person = "dimitri-kapris"
roles = ["Développeur"]
fieldGroup = "contributors_group"

[[contributors]]
person = "theo-carouge"
roles = ["Développeur", "Level Designer"]
fieldGroup = "contributors_group"

[[contributors]]
person = "chloe-dumas"
roles = ["Sound Designer", "Musique"]
fieldGroup = "contributors_group"

[[contributors]]
person = "kaze"
role = "Sound Design & Musique"
fieldGroup = "contributors_group"

[[contributors]]
person = "landy-rakotomalala"
role = "Musique"
fieldGroup = "contributors_group"

[[youtube_singles]]
size = "size-medium"
video_id = "j4MpNqSn3YQ"
video_title = "Trailer"
order = "1"
video_description = "test"
fieldGroup = "youtube_singles_group"

[[youtube_singles]]
size = "size-medium"
video_id = "3Ymzq5T5whc"
duration = "6:59"
date = "27 mai 2025"
video_title = "Stone Keeper 2 - BEST OF STREAMERS"
order = "90"
fieldGroup = "youtube_singles_group"

[development_time]
total = "6 mois"
end_date = "2024-06-30T22:00:00.000Z"
start_date = "2023-12-31T23:00:00.000Z"

[[galleries]]
title = "Galerie"
size = "size-medium"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/stone-keeper-2/stone-keeper2-1.png"

  [[galleries.images]]
  url = "/images/projects/stone-keeper-2/stone-keeper2-2.jpg"

  [[galleries.images]]
  url = "/images/projects/stone-keeper-2/stone-keeper2-3.png"

  [[galleries.images]]
  url = "/images/projects/stone-keeper-2/stone-keeper2-4.png"

  [[galleries.images]]
  url = "/images/projects/stone-keeper-2/stone-keeper2-5.jpg"

  [[galleries.images]]
  url = "/images/projects/stone-keeper-2/stone-keeper2-6.jpg"

  [[galleries.images]]
  url = "/images/projects/stone-keeper-2/stone-keeper2-7.jpg"

  [[galleries.images]]
  url = "/images/projects/stone-keeper-2/stone-keeper2-8.jpg"

[[galleries]]
title = "Gameplay"
size = "size-medium"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/stone-keeper-2/stone-keeper2-ingame-1.jpg"

  [[galleries.images]]
  url = "/images/projects/stone-keeper-2/stone-keeper2-ingame-2.jpg"

  [[galleries.images]]
  url = "/images/projects/stone-keeper-2/stone-keeper2-ingame-3.jpg"

[widget_order]
contributors = 10
development_time = 20
gallery = 30
technical_specs = 40
specialties = 50
tools = 60
awards = 70
testimonials = 80
youtube_videos = 90
clients = 100
grade = 110
downloads = 120
ranking = 130
soft_skills = 55

[ranking]
event_type = "Classement"
suffix = "è"
+++

# Stone Keeper 2

Projet réalisé en distanciel dans le cadre d’un travail de groupe à E-artsup, basé sur l’univers de mon précédent jeu. Ce projet a été particulièrement exigeant, car mené en parallèle de mes études à l'IUT et de mon alternance chez le studio La Moutarde. Mon rôle a été dans la continuité technique et l’amélioration des systèmes existants, ainsi que dans la conception de nouveaux outils de jeu et de gestion. Le projet a aussi intégré une structuration plus poussée autour du QA, du bug tracking et du travail collaboratif.

## Développement & systèmes
- Réintégration et adaptation des systèmes du jeu précédent (héritage gameplay)
- Développement du système de sauvegarde avancée (multi-slots, extensible)
- Implémentation du système de gestion de scène (loading dynamique, transitions)
- Programmation des périphériques de contrôle (manette/souris) avec affichage dynamique d’icônes contextuelles

## Interface & expérience utilisateur
- Conception et développement de l’interface utilisateur (UI système & graphique)
- Création des menus, navigation, gestion des inputs et retour visuel

## Outils & QA
- Intégration d’un système de report de bug en jeu via Trello (API)
- Participation active à la phase de QA : détection, reproduction et correction de bugs
- Développement de plusieurs outils internes pour faciliter le debug et la navigation dans le projet

## Organisation & collaboration
- Participation à l’organisation globale : tâches, standardisation sur Discord, mise en place de process d’équipe
- Communication régulière sur l’avancement technique, coordination avec les pôles artistiques et design


