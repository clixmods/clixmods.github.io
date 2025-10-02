+++
date = "2022-02-15T10:00:00+02:00"
draft = false
title = "Galaxian"
subtitle = "Remake du classique arcade - e-artsup"
description = "Recréation du jeu d'arcade classique avec mécaniques modernes et game design soigné"
tags = [ "Unity", "Arcade", "Classic Game", "Game Design" ]
category = "projects"
sector = "games-personnel"
featured = true
fmContentType = "project-content-type"
logo = "/images/projects/galaxian/galaxian-logo.png"
image = "/images/projects/galaxian/galaxian-background.png"
status = "Terminé"
specialties = [
  "Game Design",
  "Algorithmique",
  "Gestion de versions avec Git"
]
programming_languages = [ "C#" ]
frameworks = [ "Unity" ]
frameworks_engines = [ "Unity" ]
soft_skills = [ "Résolution Problèmes", "Communication", "Gestion de Projet" ]
tools = [ "GitHub", "Fork", "JetBrains", "Trello", "SonyVegas" ]

[[actions]]
type = "download"
label = "Jouer au jeu"
url = "https://clixmods.itch.io/galaxian"
primary = true
fieldGroup = "actions_group"

[[actions]]
type = "youtube"
label = "Voir trailer"
url = "https://youtu.be/zciQnYmtkHk"
primary = false
fieldGroup = "actions_group"

[[actions]]
type = "youtube"
label = "Voir gameplay"
url = "https://youtu.be/pf0UqgHNkF0"
primary = false
fieldGroup = "actions_group"

[[contributors]]
person = "clement-garcia"
role = "Lead développeur"
fieldGroup = "contributors_group"

[[contributors]]
person = "aymeric-ducarme"
role = "Developper"
fieldGroup = "contributors_group"

[[contributors]]
person = "victoria-vang"
role = "Artist"
fieldGroup = "contributors_group"

[[contributors]]
person = "benjamin-henck"
role = "Artist"
fieldGroup = "contributors_group"

[[contributors]]
person = "bruno-bracelli"
role = "Artist"
fieldGroup = "contributors_group"

[development_time]
total = "1 Mois"

[[galleries]]
size = "size-medium"
title = "Image du jeu"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/galaxian/galaxian-final-result.jpg"

  [[galleries.images]]
  url = "/images/projects/galaxian/galaxian-1.gif"

  [[galleries.images]]
  url = "/images/projects/galaxian/galaxian-2.gif"

  [[galleries.images]]
  url = "/images/projects/galaxian/galaxian-3.gif"

[[youtube_singles]]
size = "size-medium"
video_title = "Trailer"
video_id = "zciQnYmtkHk"
duration = "0:26"
date = "20 février 2022"
fieldGroup = "youtube_singles_group"

[[youtube_galleries]]
title = "Gameplays"
size = "size-medium"
fieldGroup = "youtube_galleries_group"

  [[youtube_galleries.videos]]
  video_id = "pf0UqgHNkF0"
  title = "GALAXIAN - Gameplay"
  duration = "1:53"
  date = "28 juin 2022"
  fieldGroup = "youtube_videos_group"

  [[youtube_galleries.videos]]
  video_id = "fPlUc-noS5s"
  title = "Galaxian! (Remastered)"
  duration = "6:41"
  date = "28 mai 2023"
  fieldGroup = "youtube_videos_group"
+++

# Galaxian

## Description du projet

Recréation moderne du jeu d'arcade classique Galaxian développée à e-artsup. Ce projet m'a permis d'étudier les mécaniques fondamentales des jeux d'arcade tout en y apportant une approche contemporaine du game design et de la programmation.

## Analyse du jeu original

### Étude des mécaniques classiques
- **Analyse** du gameplay original de Galaxian
- **Compréhension** des patterns de mouvement ennemis
- **Étude** de la progression de difficulté
- **Déconstruction** des éléments de game feel

### Identification des forces
- **Simplicité** des contrôles et objectifs
- **Escalade** progressive de la tension
- **Feedback** immédiat des actions joueur
- **Rejouabilité** par amélioration des scores

## Game Design moderne

### Respect de l'essence originale
- **Préservation** des mécaniques core
- **Maintien** du rythme de jeu arcade
- **Conservation** de l'accessibilité immédiate
- **Respect** de l'esthétique retro

### Améliorations contemporaines
- **Amélioration** du game feel et des feedbacks
- **Enrichissement** des effets visuels
- **Modernisation** des patterns de gameplay
- **Ajout** de variété dans les défis

## Développement technique

### Programmation C# structurée
- **Architecture** orientée objet claire
- **Systèmes modulaires** pour chaque mécanisme
- **Code maintenable** et extensible
- **Performance** optimisée pour le gameplay arcade

### Systèmes de jeu
- **Gestion des collisions** précise
- **IA ennemie** avec patterns variés
- **Système de scoring** équilibré
- **Gestion des vagues** d'ennemis

## Mécaniques de gameplay

### Contrôles et mouvement
- **Contrôles réactifs** pour le vaisseau joueur
- **Mouvement fluide** avec inertie appropriée
- **Tir** avec cadence et limitation réalistes
- **Hitboxes** équitables et claires

### Patterns ennemis
- **Mouvements** variés selon les types d'ennemis
- **Formations** tactiques challengeantes
- **Attaques** coordonnées et prévisibles
- **Progression** logique de la difficulté

## Recherche et développement

### Étude du genre arcade
- **Analyse** d'autres classiques du genre
- **Compréhension** des mécaniques intemporelles
- **Identification** des patterns de réussite
- **Application** des leçons apprises

### Expérimentation gameplay
- **Tests** de différentes approches
- **Itération** sur les paramètres de jeu
- **Validation** par le playtest
- **Raffinement** basé sur les retours

## Programmation orientée objet

### Architecture logicielle
- **Classes** bien définies et responsabilités claires
- **Héritage** pour les types d'ennemis
- **Polymorphisme** pour les comportements variés
- **Encapsulation** des données de jeu

### Patterns de conception
- **State pattern** pour les états de jeu
- **Observer pattern** pour les événements
- **Object pooling** pour les performances
- **Component pattern** pour la modularité

## Aspects visuels

### Esthétique retro-moderne
- **Style pixel art** respectant l'original
- **Palette couleurs** authentique
- **Animations** fluides et expressives
- **Effets** subtils sans surcharge

### Feedback visuel
- **Explosions** satisfaisantes
- **Trails** pour les projectiles
- **Screen shake** pour l'impact
- **Particules** pour l'immersion

## Optimisation et performance

### Performance arcade
- **60 FPS constants** indispensables
- **Input lag** minimal
- **Responsive design** pour différentes résolutions
- **Memory management** efficace

### Profiling et optimisation
- **Analyse** des goulots d'étranglement
- **Optimisation** du code critique
- **Réduction** des allocations mémoire
- **Tests** sur différentes configurations

## Technologies utilisées

- **Unity 2021.3** : Moteur de jeu
- **C#** : Langage de programmation principal
- **Visual Studio** : Environnement de développement
- **Git** : Versioning du projet
- **Unity Profiler** : Analyse des performances

## Compétences développées

Ce projet m'a permis d'acquérir :
- **Compréhension** des mécaniques arcade intemporelles
- **Maîtrise** de la programmation orientée objet en contexte jeu
- **Sensibilité** au game feel et à la responsivité
- **Expérience** en optimisation de performance
- **Appreciation** des classiques du jeu vidéo

## Apprentissages sur le game design

### Leçons des classiques
- **Simplicité** comme force créative
- **Importance** du feedback immédiat
- **Valeur** de la progression claire
- **Nécessité** de l'équilibrage précis

### Application moderne
- **Respect** des fondamentaux éprouvés
- **Innovation** dans l'exécution
- **Adaptation** aux attentes contemporaines
- **Préservation** de l'essence du jeu

## Résultats

Galaxian représente un exercice réussi de recréation respectueuse d'un classique, démontrant une compréhension profonde des mécaniques arcade et une capacité à les implémenter avec les standards techniques modernes.

Ce projet a renforcé ma compréhension des fondamentaux du game design et de l'importance de l'exécution technique dans la création d'expériences de jeu satisfaisantes.