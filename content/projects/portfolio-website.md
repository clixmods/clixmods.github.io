+++
date = "2025-12-20T19:40:14.840Z"
draft = false
title = "Portfolio Personnel"
slug = "portfolio-website"
subtitle = "Site web personnel développé avec Hugo"
description = "Portfolio moderne avec thème personnalisé, design inspiré de macOS, architecture data-driven et CMS intégré"
tags = [
  "Hugo",
  "Site Statique",
  "Portfolio",
  "GitHub Pages",
  "FrontMatter CMS"
]
category = "projects"
sector = "appsweb-professionnel"
featured = true
featuredInCV = false
fmContentType = "project-content-type"
status = "Terminé"
frameworks_engines = [ "fw_hugo" ]
programming_languages = [ "lang_javascript", "lang_html", "lang_css" ]
specialties = [
  "spec_interface_utilisateur",
  "spec_experience_utilisateur_ux",
  "spec_architecture_logicielle",
  "spec_design_pattern_et_refactoring",
  "spec_optimisation",
  "spec_gestion_des_donnees"
]
soft_skills = [ "skill_resolution_problemes", "skill_visionvisualisation" ]
tools = [
  "tool_copilot",
  "tool_visual_studio_code",
  "tool_github",
  "tool_photoshop"
]
image = "/images/projects/portfolio-site/realistic_laptop_with_smartphone.png"

[[actions]]
type = "github"
label = "Voir sur GitHub"
url = "https://github.com/clixmods/portfolio"
primary = false

[[contributors]]
person = "clement-garcia"
roles = [ "Développeur", "Designer" ]
fieldGroup = "contributors_group"

[development_time]
total = "3 mois"

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

# Portfolio Personnel

## Description du projet

> *"Un portfolio de développeur qui reflète ma vision : moderne, performant et orienté expérience utilisateur."*

Ce **portfolio personnel** est un site web statique développé avec **Hugo**, présentant mes projets, compétences et parcours professionnel. Au-delà d'une simple vitrine, ce projet démontre mes capacités en développement front-end, architecture de données et design d'interface.

Le site est **entièrement bilingue** (français/anglais) et utilise une **architecture data-driven** où la majeure partie du contenu est gérée via des fichiers JSON structurés, facilitant la maintenance et les évolutions.

## Architecture technique

### Stack technologique

Le choix de Hugo comme générateur de sites statiques offre plusieurs avantages majeurs :

- **Performance optimale** : Temps de build extrêmement rapides et pages pré-générées
- **Sécurité renforcée** : Aucune base de données ni backend exposé
- **Déploiement simplifié** : Hébergement gratuit sur GitHub Pages
- **Flexibilité totale** : Thème personnalisé développé de zéro

### Architecture data-driven

L'approche choisie sépare clairement les données du rendu :

- **Fichiers JSON structurés** : Technologies, compétences, profil, configuration
- **Contenu Markdown** : Articles, projets, expériences avec frontmatter TOML
- **Templates Go** : Logique de rendu modulaire et réutilisable
- **Système i18n** : Traductions centralisées pour le multilingue

Cette architecture permet de modifier le contenu sans toucher au code, et de faire évoluer le design sans impacter les données.
