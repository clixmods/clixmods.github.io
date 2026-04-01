+++
date = "2026-01-16T22:43:13.501Z"
draft = false
title = "Time Trial Cards"
subtitle = "Educational timeline card game"
description = "Time Trial Cards is an educational game where players sort major historical events on a timeline."
tags = [ "Mobile Game", "Game Design", "Freelance" ]
category = "projects"
sector = "games-professionnel"
featured = false
fmContentType = "project-content-type"
status = "In Progress"
programming_languages = [ "lang_csharp" ]
frameworks_engines = [ "fw_unity" ]
specialties = [
  "spec_developpement_de_jeux_video",
  "spec_developpement_gameplay",
  "spec_optimisation",
  "spec_maintenance_and_debogage",
  "spec_securite_et_optimisation",
  "spec_gestion_des_donnees",
  "spec_developpement_outils"
]
soft_skills = [ "skill_resolution_problemes", "skill_analyse_critique", "skill_travail_en_equipe" ]
tools = [
  "tool_gitlab",
  "tool_jetbrains",
  "tool_trello",
  "tool_copilot",
  "tool_google_play_console",
  "tool_google_sheets"
]
logo = "/images/projects/ttc/logo-ttc.png"
image = "/images/projects/ttc/ecol-interactif-cm1.jpg"

[[actions]]
type = "link"
label = "Discover the game"
url = "https://www.timetrialcards.com/"
primary = true

[[notable_facts]]
type = "milestone"
icon = "🎯"
value = "<span class='highlight'>First</span>"
label = "My first freelance mission!"
testimonials_size = "size-medium"

[ranking]
event_type = "Ranking"
suffix = "th"

[widget_order]
contributors = 10
technical_specs = 40
development_time = 20
clients = 100
gallery = 30
specialties = 50
soft_skills = 55
tools = 60
awards = 70
testimonials = 80
youtube_videos = 90
grade = 110
downloads = 120
ranking = 130

[[youtube_singles]]
video_id = "hS-AFSs3FwQ"
video_title = "Présentation de Time Trial Cards"
video_description = "Découvrez le jeu éducatif."
date = "2026-01-16T23:01:26.343Z"
fieldGroup = "youtube_singles_group"
+++

## About the project

Time Trial Cards is an educational game that merges historical learning and competitive gameplay. The concept is simple: place each card representing an event, invention, or famous figure in the correct position on a timeline.

### Game mechanics

The gameplay is based on a point system focused on speed and accuracy:
- **Sort cards** on a precise timeline
- **Progress through the ages** from Prehistory to the present day
- **Accumulate points** to unlock new levels and boosters
- **Cover school curriculum** from elementary to high school and beyond

### Educational content

The game offers more than **500 cards** classified according to several criteria:
- **Historical categories**: Art, Religions, Sports and Games, Politics and Social Events, Science and Innovations, Civilizations
- **Specific historical periods**
- **Adapted school levels** (elementary to high school)
- **Languages**: French and English

### School+ Edition

A specialized version for teachers allowing to:
- Prepare customized game configurations
- Select periods and categories
- Choose game modes (Left/Right or Timeline)
- Adapt difficulty and game duration
- Manage boosters and language options

## My freelance involvement

I joined the project mid-production to strengthen development on gameplay, UI/UX, data, and stabilization topics. My work integrated pragmatically into an existing Unity architecture already in production.

### Gameplay and feature development

Development and evolution of features within the existing codebase, with pragmatic integration into the established architecture:
- Work on **FR/EN localization**, **tutorials**, **Training mode**, and the **game economy**
- Fixing **blocking bugs** and improving overall **mobile robustness**
- UI/UX improvements to enhance the player experience

### Technical architecture and performance

Partial refactoring of the game's technical architecture:
- **Unified persistence**: unification of save mechanisms and migration to JSON, with backward compatibility for legacy data
- **Targeted refactoring**: breaking down monolithic components into modular services to improve maintainability
- **Performance optimizations**: elimination of expensive operations in render loops and strategic caching of critical references

### Data pipeline

Setup and evolution of the data pipeline via Google Sheets:
- **Data validation** and parsing of new fields
- Support for **business filters** for educational content
- Integration with the game's card and level system

### Internal tools and quality

Development of internal tools to facilitate validation, debugging, and quality tracking:
- **In-game bug reporting** system
- **Data and level control** tools
- Improved validation and debugging workflows

### Android deployment

Android build management and test version deployment:
- Builds via **Google Play Console** with versioning tracking
- **Release flow** preparation and test version deployment

