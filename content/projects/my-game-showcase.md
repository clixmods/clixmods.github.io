+++
date = "2025-01-15T10:00:00+02:00"
draft = false
title = "My Game Showcase"
slug = "my-game-showcase"
subtitle = "Plateforme d'artbooks numériques pour studios de jeux vidéo"
description = "Application web pour studios de jeux vidéo permettant de créer des artbooks numériques à partir d'assets"
tags = [ "Blazor", "FastEndpoint", "SignalR", "Studio Tools" ]
category = "projects"
sector = "appsweb-professionnel"
featured = true
featuredInCV = true
fmContentType = "project-content-type"
image = "/images/projects/my-game-showcase/artbook.webp"
logo = "/images/projects/my-game-showcase/My Game Showcase.webp"
frameworks_engines = [ "fw_blazor", "fw_fastendpoint", "fw_signalr", "fw_unity", "fw_net", "fw_taglibsharp" ]
programming_languages = [ "lang_csharp", "lang_html", "lang_css", "lang_javascript" ]
specialties = [
  "spec_interface_utilisateur",
  "spec_design_pattern_et_refactoring",
  "spec_developpement_outils",
  "spec_developpement_dapi",
  "spec_architecture_logicielle",
  "spec_temps_reel",
  "spec_gestion_de_fichiers",
  "spec_portage_console",
  "spec_optimisation"
]
soft_skills = [ "skill_resolution_problemes", "skill_communication", "skill_travail_en_equipe" ]
tools = [ "tool_azure", "tool_fork", "tool_jetbrains", "tool_clickup" ]
status = "En production"

[[contributors]]
person = "francois-bertrand"
roles = ["Chef de projet", "Développeur"]
fieldGroup = "contributors_group"

[[contributors]]
person = "anthony-expert"
roles = ["Artiste"]
fieldGroup = "contributors_group"

[[contributors]]
person = "clement-garcia"
roles = ["Développeur"]
fieldGroup = "contributors_group"

[ranking]
event_type = "Classement"
suffix = "è"

[widget_order]
contributors = 10
development_time = 20
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
gallery = 30
+++

# My Game Showcase

## Description du projet

> *"Transformez vos assets d'images et musiques de vos jeux vidéos à une application type artbook livrable en quelques minutes."* - Studio La Moutarde

**My Game Showcase** est une **solution B2B** qui transforme des lots d'images et musiques en **applications vitrines prêtes à la soumission** sur **PS5, Xbox Series et Nintendo Switch**. Le tout, directement depuis une **plateforme web**, qui génère une **application** destinée aux utilisateurs finaux.

Développée pour les studios de jeux vidéo et éditeurs, cette application web permet de **centraliser, structurer et valoriser leurs assets** (images, musiques) sous forme d'**artbooks numériques** en quelques clics.

## Mes contributions

J'ai contribué à la **conception et au développement** de cette solution B2B, intervenant aussi bien sur l'**architecture backend** (API .NET 8, SignalR) que sur le **frontend Blazor** et les **fonctionnalités avancées** de génération d'applications.

### Implémentation de l'API backend

- Implémentation de l'**API complète en .NET 8** avec FastEndpoint (MinimalAPI typées)
- **Architecture modulaire** séparant les responsabilités (upload, traitement, export)
- Gestion des **uploads de fichiers** volumineux avec validation côté serveur
- **Édition de métadonnées audio** avec TagLib#
- **Génération de PDF** dynamiques

### Implémentation de SignalR pour synchronisation temps réel

Les traitements longs (conversion, génération PDF) nécessitent un retour d'information instantané pour l'utilisateur et une synchronisation entre utilisateurs.

**Solution technique** :
- **Implémentation de SignalR** pour notifications bidirectionnelles
- Mise à jour en temps réel de la progression des traitements (conversion audio/vidéo, génération d'exports)
- **Synchronisation multi-utilisateurs** pour édition collaborative

**Impact** : Expérience utilisateur fluide avec feedback instantané sur les opérations longues.

### Gestion avancée des fichiers (upload, résiduels, nettoyage, métadonnées)

**Solution technique** :
- **Système d'upload intelligent** avec validation et gestion des erreurs
- Extraction automatique des **métadonnées**
- **Nettoyage automatique** des fichiers résiduels et temporaires
- Traitement spécifique par type d'asset avec support multi-formats
- Gestion de la mémoire optimisée pour fichiers volumineux

**Impact** : Zéro saisie manuelle pour la majorité des assets, réduction drastique des erreurs.

### Développement frontend : pages et composants

**Solution technique** :
- **Développement de pages sous le framework Blazor** pour l'administration des projets et artbooks
- **Création de composants réutilisables** pour édition de collections multimédia
- Composant d'**upload avec preview temps réel** et gestion des erreurs
- **Navigation contextuelle** adaptée au workflow utilisateur
- **Intégration de l'API backend** 

**Impact** : Interface professionnelle et accessible, réduisant le temps d'apprentissage.

### Fonctionnalités avancées : génération automatique et prévisualisation

**Solution technique** :
- **Génération automatique d'applications** à partir des assets uploadés
- System de **build démo en temps réel** pour prévisualisation dynamique
- Support de **formats variés** avec traitement spécifique pour chaque usage
- **Export multi-plateforme** (PS5, Xbox, Switch, PDF, ZIP)

**Impact** : De l'upload des assets à l'application console livrée en quelques clics.

### Architecture multi-clients et marque blanche

**Problématique** : Concevoir une solution réutilisable pour plusieurs studios/éditeurs avec leurs propres identités visuelles.

**Solution technique** :
- Architecture **multi-tenant** avec isolation des données par client
- Système de **branding dynamique** (logos, couleurs, thèmes personnalisables)

### Conception orientée produit commercial

**Solution technique** :
- Conception avec logique de **produit réutilisable** et extensible
- Documentation technique et guides d'intégration
- Gestion des versions et rétrocompatibilité
- Tests automatisés sur modules critiques

## Conclusion

**My Game Showcase** m'a permis de travailler au croisement produit/technique : rendre un outil utile, fiable et rapide pour des équipes sous pression en fin de production.
