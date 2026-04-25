+++
date = "2023-11-15T10:00:00+02:00"
draft = false
title = "Aspiro Shop"
subtitle = "Site e-commerce PHP/MVC - IUT Montpellier"
description = "Plateforme de vente en ligne complète avec architecture MVC et sécurité avancée"
tags = [ "lang_php", "MVC", "E-commerce", "Security", "PDO" ]
category = "projects"
sector = "appsweb-etude"
featured = true
fmContentType = "project-content-type"
programming_languages = [
  "lang_php",
  "lang_mysql",
  "lang_javascript",
  "lang_html",
  "lang_css",
  "lang_oracle_sql"
]
soft_skills = [
  "skill_gestion_de_projet",
  "skill_communication",
  "skill_resolution_problemes",
  "skill_leadership"
]
specialties = [
  "spec_programmation_orientee_objet",
  "spec_architecture_logicielle",
  "spec_securite_et_optimisation",
  "spec_gestion_de_versions_avec_git",
  "spec_design_pattern_et_refactoring",
  "spec_developpement_dapi"
]
tools = [ "tool_gitlab", "tool_jetbrains", "tool_fork" ]
image = "/images/projects/aspiro-shop/preview.jpeg"

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

[ranking]
event_type = "Classement"
suffix = "è"

[[actions]]
type = "github"
label = "Voir github"
url = "https://github.com/clixmods/archive-aspiro-shop"
fieldGroup = "actions_group"

[[galleries]]
title = "Aperçu"
size = "size-medium"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/aspiro-shop/preview.jpeg"

[[contributors]]
person = "clement-garcia"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "baptiste-lespinasse"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "quentin-grelier"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"
+++

## Présentation

Développement d'un site de vente en ligne dans le cadre d'un projet d'étude à l'IUT Montpellier-Sète, servant de synthèse à notre apprentissage du développement web orienté PHP. L'objectif : proposer une plateforme complète, sécurisée et fonctionnelle, selon une architecture MVC rigoureuse.

## Mes contributions

### Interface utilisateur
- Création d'une interface utilisateur fluide et sécurisée avec formulaires validés
- Conformité HTML/CSS et respect des standards web
- Système d'inscription et d'authentification par e-mail

### Gestion des sessions
- Implémentation d'un système complet de sessions utilisateurs
- Séparation claire entre l'interface front-end et le back
- Gestion des permissions et des rôles utilisateurs

### Opérations CRUD
- Mise en œuvre des opérations CRUD avec PDO
- Respect strict des bonnes pratiques de l'architecture MVC
- Séparation des responsabilités entre modèles, vues et contrôleurs

## Architecture & sécurité

### Architecture modulaire
- Chargement automatique des classes (autoloading)
- Gestion dynamique des routes avec URLs relatives
- Structure de dossiers claire et maintenable

### Sécurisation des données
- Sécurisation des vues (échappement des données, validation des entrées)
- Contrôle d'accès strict aux différentes parties de l'application
- Utilisation de requêtes préparées pour toutes les interactions avec la base de données
- Contraintes de clés étrangères pour garantir l'intégrité référentielle

### Protection contre les attaques
- Chiffrement des mots de passe avec algorithmes modernes
- Protection contre les injections SQL
- Mesures anti-brute force
- Validation et sanitisation de toutes les entrées utilisateur

## Fonctionnalités avancées

### Gestion du panier
- Panier persistant même pour les visiteurs non connectés
- Sauvegarde du panier lors de la connexion
- Mise à jour en temps réel des quantités et des prix

### Historique et commandes
- Système complet de gestion des commandes
- Historique détaillé pour chaque utilisateur
- Suivi de l'état des commandes

### Expérience utilisateur
- Système de feedback utilisateur avec messages flash
- Affichage clair des erreurs de saisie
- Redirections intelligentes après les actions
- Interface intuitive et responsive

### Préparation pour l'évaluation
- Base de données de démonstration propre et structurée
- Déploiement en ligne pour faciliter l'évaluation
- Documentation complète du projet
