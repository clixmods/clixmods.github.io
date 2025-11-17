+++
date = "2022-07-01T08:00:00.000Z"
draft = false
title = "Assault of Order"
subtitle = "Projet de fin d'année 1ère année - e-artsup"
description = "Premier projet de jeu complet avec UML et développement C# avancé"
tags = [ "fw_unity", "First Year", "UML", "Game Development" ]
category = "projects"
sector = "games-personnel"
featured = true
fmContentType = "project-content-type"
status = "Terminé"
logo = "/images/projects/assault-of-order/assault-of-order-logo.png"
image = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-3.jpg"
frameworks_engines = [ "fw_unity" ]
programming_languages = [ "lang_csharp" ]
specialties = [
  "spec_developpement_outils",
  "spec_lighting",
  "spec_environnement_building",
  "spec_developpement_gameplay",
  "spec_gestion_de_versions_avec_git",
  "spec_algorithmique"
]
soft_skills = [ "skill_resolution_problemes", "skill_communication" ]
tools = [
  "tool_fork",
  "tool_visual_studio",
  "tool_hacknplan",
  "tool_sonyvegas",
  "tool_github",
  "tool_discord"
]

[[actions]]
type = "download"
label = "Jouer au jeu"
url = "https://evil0games.itch.io/assault-of-order"
primary = true

[[actions]]
type = "youtube"
label = "Voir trailer"
url = "https://youtu.be/G1OzgE-y5Jk"
primary = false

[[contributors]]
person = "clement-garcia"
roles = ["Développeur", "Level Designer", "Lighting"]
fieldGroup = "contributors_group"

[[contributors]]
person = "soundouss-khattabi"
roles = ["Artiste"]
fieldGroup = "contributors_group"

[[contributors]]
person = "marion-abrial"
roles = ["Artiste"]
fieldGroup = "contributors_group"

[[contributors]]
person = "ouzagua-nassim"
roles = ["Artiste"]
fieldGroup = "contributors_group"

[[contributors]]
person = "shaim-somsanith"
roles = ["Artiste"]
fieldGroup = "contributors_group"

[[contributors]]
person = "clement-courtois"
roles = ["Artiste"]
fieldGroup = "contributors_group"

[[contributors]]
person = "aymeric-ducarme"
roles = ["Développeur"]
fieldGroup = "contributors_group"

[[contributors]]
person = "matthieu-osten"
roles = ["Développeur"]
fieldGroup = "contributors_group"

[development_time]
total = "2 Mois"
start_date = "2022-05-30T22:00:00.000Z"
end_date = "2022-06-30T22:00:00.000Z"

[[galleries]]
title = "Photo"
size = "size-medium"
order = "90"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/aoo-photo.jpg"

[[galleries]]
title = "Gameplay"
size = "size-medium"
order = "90"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/aoo-gif-1.gif"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-ingame-1.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-ingame-2.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-ingame-3.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-ingame-4.jpg"

[[galleries]]
title = "Environnement"
size = "size-medium"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-1.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-2.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-3.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-4.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-5.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-6.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-7.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-8.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-9.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-10.jpg"

[[youtube_singles]]
size = "size-medium"
video_id = "G1OzgE-y5Jk"
video_title = "Trailer"
duration = "1:35"
order = "1"
fieldGroup = "youtube_singles_group"

[ranking]
event_type = "Classement"
suffix = "è"

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

# Assault of Order

## Description du projet

Projet de fin de première année réalisé à E-artsup. 
Jeu de stratégie au tour par tour inspiré des XCOM, où deux équipes s'affrontent sur un champ de bataille en grille.  
Chaque unité dispose de ses propres capacités et compétences, ce qui pousse le joueur à réfléchir, planifier et anticiper chaque action pour remporter la victoire.

Sur ce projet, j'étais principalement orienté sur la partie technique et la conception des systèmes de jeu.  
Mon objectif était de donner vie au cœur du gameplay : la grille, le déplacement des unités et le déroulement des tours de jeu.  
J'ai également contribué à la mise en place de l'environnement visuel du jeu et de son éclairage.

## Développement & Gameplay

- Conception complète du système de grille de jeu (cases, coordonnées, interactions)
- Développement d'outils internes permettant de peindre les cases directement dans l'éditeur Unity
- Implémentation d'un algorithme de pathfinding de type A* pour le déplacement intelligent des unités
- Visualisation du chemin parcouru et du coût de déplacement sur la grille
- Programmation du système de tour par tour (gestion du joueur A et B, ordre des unités, transitions)
- Gestion des tours et de l'état du jeu : phase de sélection, déplacement, attaque, fin de manche

## Environnement & Lighting

- Réalisation de l'environnement building à partir du level design fourni par l'équipe
- Travail sur le lighting général du jeu (ambiance, lisibilité, contraste)