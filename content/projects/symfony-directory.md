+++
date = "2024-09-15T10:00:00+02:00"
draft = true
title = "Annuaire Symfony"
subtitle = "Application de gestion de profils - IUT Montpellier"
description = "Application web sécurisée avec système d'authentification et gestion des rôles utilisateurs"
image = "/images/projects/symfony-directory.jpg"
tags = [ "fw_symfony", "Twig", "Docker", "lang_mysql", "Security" ]
frameworks_engines = [ "fw_symfony" ]
programming_languages = [ "lang_php", "lang_mysql" ]
specialties = [ "spec_twig_integration" ]
category = "projects"
sector = "appsweb-etude"
featured = true
fmContentType = "project-content-type"
tools = [ "tool_docker" ]

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
+++

# Annuaire Symfony - Application de gestion de profils

## Description du projet

Développement d'une application web sécurisée en Symfony dans le cadre d'un projet académique à l'IUT Montpellier-Sète. Cette application est conçue pour apprendre à gérer les systèmes d'authentification, les rôles utilisateurs et la cohérence des données avec une interface front développée en Twig.

## Développement de l'application

### Système d'authentification avancé
- **Implémentation complète** d'un système de rôles et permissions
- **ROLE_USER et ROLE_ADMIN** avec contrôles d'accès différenciés
- **Sécurisation des routes** selon les niveaux d'autorisation
- **Protection CSRF** et validation des formulaires

### Gestion des utilisateurs
- **Formulaires d'inscription** avec validation côté serveur
- **Édition de profils** sécurisée avec contrôles d'accès
- **Suppression d'utilisateurs** avec confirmation et logs
- **Recherche et filtrage** des profils utilisateurs

### Interface utilisateur
- **Intégration de Twig** pour des templates modulaires
- **Interface claire et ergonomique** responsive
- **Messages flash** pour le feedback utilisateur
- **Navigation contextuelle** selon les rôles

## Infrastructure & Base de données

### Environnement de développement
- **Déploiement via Docker** pour un environnement isolé et reproductible
- **Configuration multi-services** (web, database, cache)
- **Variables d'environnement** sécurisées
- **Logs centralisés** pour le debugging

### Base de données MySQL
- **Migrations structurées** avec Doctrine ORM
- **Relations entre entités** optimisées
- **Contraintes et validations** au niveau base
- **Indexation** pour les performances

### Sécurité des données
- **Hachage des mots de passe** avec algorithmes modernes
- **Protection contre les injections SQL** avec Doctrine
- **Validation des données** entrantes
- **Échappement automatique** dans les vues

## Travail en équipe

### Organisation du projet
- **Mise en place de l'organisation** complète du projet
- **Création et gestion du Trello** pour le suivi des tâches
- **Configuration du repository** Git avec structure claire
- **Documentation** technique et utilisateur

### Collaboration active
- **Répartition claire des tâches** selon les compétences
- **Suivi de l'avancement** avec points réguliers
- **Échanges techniques** pour assurer la cohérence
- **Revue de code** et validation croisée

### Coordination d'équipe
- **Animation des réunions** de synchronisation
- **Gestion des conflits** techniques et organisationnels
- **Décisions collectives** sur l'architecture
- **Intégration finale** collaborative

## Technologies et frameworks

### Stack technique
- **Symfony 6** : Framework PHP robuste
- **Doctrine ORM** : Gestion de base de données
- **Twig** : Moteur de templates flexible
- **Bootstrap** : Framework CSS responsive
- **Docker** : Conteneurisation complète

### Outils de développement
- **Composer** : Gestionnaire de dépendances PHP
- **Symfony CLI** : Outils de développement
- **MySQL Workbench** : Administration base de données
- **Git** : Versioning avec Git Flow
- **Trello** : Gestion de projet agile

## Bonnes pratiques appliquées

### Architecture Symfony
- **Respect des conventions** Symfony
- **Séparation MVC** stricte
- **Services et injection** de dépendances
- **Configuration YAML** centralisée

### Sécurité web
- **Protection CSRF** sur tous les formulaires
- **Validation des entrées** utilisateur
- **Gestion des sessions** sécurisée
- **Headers de sécurité** configurés

## Compétences développées

Ce projet m'a permis d'acquérir :
- **Maîtrise de Symfony** et de son écosystème
- **Conception de systèmes d'authentification** robustes
- **Travail en équipe** sur un projet technique
- **Bonnes pratiques** de sécurité web
- **Gestion de projet** avec méthodologie agile

## Résultats

Application complète démontrant une solide compréhension des principes de sécurité web et des frameworks PHP modernes, avec une expérience concrète du travail collaboratif en développement.
