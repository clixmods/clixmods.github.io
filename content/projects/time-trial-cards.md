+++
date = "2026-01-16T22:43:13.501Z"
draft = false
title = "Time Trial Cards"
subtitle = "Jeu éducatif de cartes temporelles"
description = "Time Trial Cards est un jeu éducatif où les joueurs trient les grands événements de l'Histoire sur une frise chronologique."
tags = [ "Jeu Mobile", "Game Design", "Freelance" ]
category = "projects"
sector = "games-professionnel"
featured = false
fmContentType = "project-content-type"
status = "En Cours"
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
label = "Découvrir le jeu"
url = "https://www.timetrialcards.com/"
primary = true

[[notable_facts]]
type = "milestone"
icon = "🎯"
value = "<span class='highlight'>Première</span>"
label = "Ma première mission freelance !"
testimonials_size = "size-medium"

[ranking]
event_type = "Classement"
suffix = "è"

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

## À propos du projet

Time Trial Cards est un jeu éducatif qui fusionne apprentissage historique et gameplay compétitif. Le concept est simple : placer chaque carte représentant un événement, une invention ou un personnage célèbre à la bonne position sur une frise chronologique.

### Mécanique de jeu

Le gameplay repose sur un système de points basé sur la rapidité et l'exactitude :
- **Trier les cartes** sur une frise chronologique précise
- **Progresser à travers les âges** de la Préhistoire à nos jours
- **Accumuler des points** pour débloquer de nouveaux niveaux et boosters
- **Couvrir le programme scolaire** du CM1 à la Terminale et au-delà

### Contenu éducatif

Le jeu propose plus de **500 cartes** classées selon plusieurs critères :
- **Catégories historiques** : Art, Religions, Sport et Jeux, Politique et Événements Sociaux, Science et Innovations, Civilisations
- **Périodes historiques** spécifiques
- **Niveaux scolaires** adaptés (du primaire au lycée)
- **Langues** : Français et Anglais

### École+ : Version scolaire

Une version spécialisée pour les enseignants permettant de :
- Préparer des configurations de jeu personnalisées
- Sélectionner les périodes et catégories
- Choisir les modes de jeu (Gauche/Droite ou Frise chronologique)
- Adapter la difficulté et la durée des parties
- Gérer les boosters et les options de langue

## Mon implication en freelance

J'ai rejoint le projet en cours de production pour renforcer le développement sur des sujets gameplay, UI/UX, data et stabilisation. Mon travail s'est intégré de manière pragmatique dans une architecture Unity déjà en production.

### Développement gameplay et fonctionnalités

Développement et évolution de fonctionnalités dans la base de code existante, avec une intégration pragmatique dans l'architecture en place :
- Travail sur la **localisation FR/EN**, les **tutoriels**, le **mode Entraînement** et l'**économie du jeu**
- Correction de **bugs bloquants** et amélioration de la **robustesse globale sur mobile**
- Évolutions UI/UX pour améliorer l'expérience joueur

### Architecture technique et performance

Refonte partielle de l'architecture technique du jeu :
- **Persistance unifiée** : unification des mécanismes de sauvegarde et migration vers JSON, avec compatibilité des anciennes données
- **Refactoring ciblé** : découpage de composants monolithiques en services modulaires pour améliorer la maintenabilité
- **Optimisations de performance** : élimination des opérations coûteuses dans les boucles de rendu et mise en cache stratégique des références critiques

### Pipeline de données

Mise en place et évolution du pipeline de données via Google Sheets :
- **Validation des données** et parsing de nouveaux champs
- Prise en charge des **filtres métier** pour le contenu éducatif
- Intégration avec le système de cartes et de niveaux du jeu

### Outils internes et qualité

Développement d'outils internes pour faciliter la validation, le debug et le suivi qualité :
- Système de **report de bugs in-game**
- Outils de **contrôle des données et des niveaux**
- Amélioration des workflows de validation et de debug

### Déploiement Android

Gestion des builds Android et du déploiement de versions de test :
- Builds via **Google Play Console** avec suivi du versioning
- Préparation du **release flow** et déploiement de versions de test
