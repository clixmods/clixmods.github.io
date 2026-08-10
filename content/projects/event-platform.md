+++
date = "2024-12-23T10:00:00+02:00"
draft = false
title = "Plateforme de gestion d'événements — Push Start"
subtitle = "API Symfony/API Platform & front Vue.js - IUT Montpellier-Sète"
description = "Application web de gestion d'événements pour l'association Push Start : API REST sécurisée par JWT (Symfony 6.4 / API Platform 4) et client Vue 3, le tout conteneurisé."
tags = [
  "Symfony",
  "API Platform",
  "Vue.js",
  "API REST",
  "JWT",
  "Docker",
  "Académique"
]
category = "projects"
sector = "appsweb-etude"
status = "Terminé"
featured = false
fmContentType = "project-content-type"
frameworks_engines = [ "fw_symfony", "fw_api_platform", "fw_vue_js" ]
programming_languages = [
  "lang_php",
  "lang_typescript",
  "lang_javascript",
  "lang_mysql"
]
specialties = [
  "spec_developpement_dapi",
  "spec_architecture_logicielle",
  "spec_securite_et_optimisation",
  "spec_design_pattern_et_refactoring",
  "spec_programmation_orientee_objet",
  "spec_gestion_des_donnees",
  "spec_gestion_de_versions_avec_git"
]
soft_skills = [
  "skill_travail_en_equipe",
  "skill_communication",
  "skill_gestion_de_projet",
  "skill_resolution_problemes"
]
tools = [
  "tool_docker",
  "tool_gitlab",
  "tool_github",
  "tool_jetbrains"
]
image = "/images/projects/event-platform/Screenshot 2026-08-10 at 10-24-23 PushStart — Événements.png"

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

[development_time]
total = "2 mois"
start_date = "2024-10-24T00:00:00.000Z"
end_date = "2024-12-23T00:00:00.000Z"

[[actions]]
type = "github"
label = "Voir le code source"
url = "https://github.com/clixmods/iut-archive-event-platform"
primary = true
fieldGroup = "actions_group"

[[galleries]]
title = "Aperçu"
size = "size-medium"
fieldGroup = "galleries_group"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/event-platform/Screenshot 2026-08-10 at 10-24-23 PushStart — Événements.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/event-platform/Screenshot 2026-08-10 at 10-25-16 PushStart — Événements.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/event-platform/Screenshot 2026-08-10 at 10-25-28 PushStart — Événements.png"

  [[galleries.images]]
  url = "/images/projects/event-platform/Screenshot 2026-08-10 at 10-25-42 PushStart — Événements.png"

[[contributors]]
person = "clement-garcia"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "victor-vidaux"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "teo-moerel"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"
+++

## Présentation

Projet académique du semestre 5 du BUT, réalisé en trinôme à l'IUT Montpellier-Sète. L'objectif : doter **Push Start**, une association qui soutient les créateurs de jeux vidéo et les acteurs de la culture numérique, d'une plateforme pour organiser ses événements thématiques — rencontres professionnelles, ateliers créatifs, conférences.

L'application repose sur une **architecture découplée** : une API REST développée avec Symfony et API Platform d'un côté, un client Vue.js autonome de l'autre, les deux communiquant uniquement par HTTP et authentifiés par jeton JWT.

- **Trois rôles distincts** : participant, organisateur et administrateur, avec des permissions différenciées
- **Cycle complet de l'événement** : création par un organisateur, inscription et désinscription des participants, consultation des inscrits
- **Deux mois de développement** répartis en deux temps : conception de l'API (octobre-novembre), puis intégration du front-end (décembre)

## Mon rôle : conception de l'API

### Modèle de domaine et règles métier

J'ai pris en charge la modélisation et l'implémentation du cœur métier, autour des entités `Event`, `Subscription` et `User`.

- **Entité `Event`** avec ses informations générales et ses attributs spécifiques au thème de l'événement
- **Validation systématique à la création** : prix cohérent (strictement positif si l'événement est payant), nombre maximal de participants valide, refus de toute date déjà passée
- **Attribution automatique de l'organisateur** à partir de l'utilisateur connecté, la création étant réservée au rôle `ROLE_ORGANIZER`
- **Entité `Subscription`** portant les règles d'inscription : vérification de l'existence de l'utilisateur et de l'événement, contrôle des places restantes, et impossibilité de s'inscrire à deux événements qui se chevauchent
- **Suppression en cascade** : supprimer un utilisateur retire aussi les événements dont il est l'organisateur

### Sécurité et gestion des rôles

- **Authentification JWT** via LexikJWTAuthenticationBundle, le jeton étant transporté par cookie plutôt que par en-tête, grâce à un listener sur le succès d'authentification
- **Pare-feu `stateless`** : aucune session côté serveur, l'API reste entièrement sans état
- **Point d'entrée `json_login`** sur `/api/auth`, authentifiant sur le champ `login` de l'entité `User`
- **Hiérarchie de rôles** `ROLE_ORGANIZER → ROLE_USER`, complétée par `ROLE_ADMIN`
- **Règles d'accès fines** : seul l'organisateur peut modifier son événement, l'organisateur ou un administrateur peuvent le supprimer, et chaque utilisateur ne gère que son propre profil

### API Platform et principes SOLID

Plutôt que de concentrer la logique dans les entités, chaque comportement a été isolé dans une classe dédiée du cycle de vie API Platform — un découpage qui applique concrètement la responsabilité unique et l'inversion des dépendances.

- **State Processors dédiés** : `EventProcessor` pour la création d'événements, `SubscriptionEventProcessor`, `SubscriptionPutProcessor` et `SubscriptionDeleteProcessor` pour les inscriptions, `UserProcessor` pour le hachage du mot de passe
- **State Provider `SubscriptionProvider`** pour exposer les collections croisées : les participants d'un événement, les événements d'un utilisateur
- **Normaliseur `EventAttributeNormalizer`** appliquant une sérialisation conditionnelle : l'organisateur décide si la liste des inscrits est publique ou non
- **Groupes de sérialisation** pour contrôler précisément les champs exposés en lecture et acceptés en écriture

### Outillage

- **Commande console `create:user`** permettant de provisionner des comptes avec leurs rôles depuis le terminal, indispensable pour peupler la base de test
- **Migrations Doctrine** versionnées pour reconstruire le schéma à l'identique

## Front-end Vue.js — travail d'équipe

La partie cliente a été développée collectivement en décembre, ma contribution portant sur l'intégration avec l'API et la cohérence du contrat d'échange.

- **Vue 3 en TypeScript**, construit avec Vite, qualité de code contrôlée par ESLint et `vue-tsc`
- **Vue Router** avec des routes protégées selon le rôle de l'utilisateur, réservant certaines vues aux organisateurs et aux administrateurs
- **Composants réutilisables** pour les formulaires (`FormulaireConnexion`, `FormulaireInscription`, `FormulaireEvent`, `FormulaireModification`) et l'affichage des données (`BoiteEvent`, `BoiteUtilisateur`)
- **Appels API centralisés** dans un module utilitaire `apiStore.ts`, qui concentre la gestion du jeton JWT et le traitement des erreurs plutôt que de la disperser dans les vues

## Infrastructure

- **Docker Compose** orchestrant deux services : un serveur Apache avec PHP 8.1 et une base MySQL persistée sur un volume
- **HTTPS en local** grâce à un certificat auto-signé et une configuration Apache dédiée
- **Port du serveur de développement Vite exposé** par le conteneur, pour travailler sur le front sans quitter l'environnement conteneurisé
- **CORS géré par NelmioCorsBundle**, nécessaire dès lors que le client et l'API sont servis sur des origines distinctes
- **Installation reproductible** en une commande, base de données et clés JWT générées via les commandes Symfony

## Travail en équipe

- **Trinôme avec une répartition explicite** : entités et règles métier de mon côté, routes utilisateurs et tests d'API pour Victor, JWT et inscriptions pour Téo
- **Versionnage sur le GitLab de l'IUT**, travail sur une branche `develop` commune, dépôt ensuite miroité sur GitHub
- **Synchronisations régulières** et relectures croisées, notamment sur les questions de permissions où les décisions d'un membre affectent directement le travail des autres
- **Documentation partagée** dans le README : installation et configuration de mon côté, routes et peuplement de la base côté Victor

## Technologies

- **Back-end** : Symfony 6.4, API Platform 4, PHP 8.1, Doctrine ORM 3, LexikJWTAuthenticationBundle 3.1, NelmioCorsBundle
- **Front-end** : Vue 3.5, TypeScript 5.6, Vite 6, Vue Router 4, ESLint 9
- **Infrastructure** : Docker Compose, Apache, MySQL

## Ce que j'en retire

- **Concevoir une API sans état** change la façon de penser l'authentification : tout doit tenir dans le jeton, plus rien ne peut reposer sur une session
- **Le découpage en processors** d'API Platform rend les principes SOLID très concrets — chaque règle métier a son fichier, et les entités restent lisibles
- **Une architecture découplée impose un contrat clair** entre les deux moitiés de l'équipe : la moindre ambiguïté sur un format de réponse se paie immédiatement côté client
