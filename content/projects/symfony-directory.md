+++
date = "2024-10-20T10:00:00+02:00"
draft = false
title = "Annuaire Symfony"
subtitle = "Application de gestion de profils - IUT Montpellier-Sète"
description = "Application web d'annuaire développée en Symfony 6.4 : authentification par formulaire, rôles et permissions, formulaires Twig, API JSON et environnement Docker complet."
tags = [
  "Symfony",
  "Twig",
  "Doctrine",
  "MySQL",
  "Docker",
  "Sécurité",
  "Académique"
]
category = "projects"
sector = "appsweb-etude"
status = "Terminé"
featured = false
fmContentType = "project-content-type"
frameworks_engines = [ "fw_symfony" ]
programming_languages = [
  "lang_php",
  "lang_javascript",
  "lang_mysql",
  "lang_html",
  "lang_css"
]
specialties = [
  "spec_twig_integration",
  "spec_developpement_dapi",
  "spec_securite_et_optimisation",
  "spec_programmation_orientee_objet",
  "spec_architecture_logicielle",
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
  "tool_trello",
  "tool_jetbrains"
]
image = "/images/projects/symfony-directory/annuaire-liste-profils.png"

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
start_date = "2024-09-01T00:00:00.000Z"
end_date = "2024-10-31T00:00:00.000Z"

[[actions]]
type = "github"
label = "Voir le code source"
url = "https://github.com/clixmods/iut-archive-annuaire"
primary = true
fieldGroup = "actions_group"

[[galleries]]
title = "Aperçu"
size = "size-medium"
fieldGroup = "galleries_group"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/symfony-directory/annuaire-liste-profils.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/symfony-directory/annuaire-inscription.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/symfony-directory/annuaire-connexion.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/symfony-directory/annuaire-profil.png"

[[contributors]]
person = "clement-garcia"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "teo-moerel"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "victor-vidaux"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"
+++

## Présentation

Projet académique du semestre 5 du BUT, réalisé en trinôme à l'IUT Montpellier-Sète. L'objectif : construire un **annuaire de profils** en Symfony, c'est-à-dire une application où chacun s'inscrit, publie une fiche et décide de sa visibilité — un terrain d'exercice idéal pour apprendre l'authentification, les rôles et la cohérence des données.

L'application est un **monolithe Symfony classique** : les pages sont rendues côté serveur avec Twig, la persistance passe par Doctrine et MySQL, et l'ensemble tourne dans un environnement Docker reproductible.

- **Deux rôles** : `ROLE_USER` consulte l'annuaire et gère son propre profil, `ROLE_ADMIN` voit aussi les profils masqués et peut supprimer n'importe quel compte
- **Cycle de vie complet du profil** : inscription, connexion, consultation, édition, suppression
- **Environ deux mois de développement**, de septembre à octobre 2024

## Mon rôle

### Entité `User` et cohérence des données

J'ai pris en charge la modélisation du cœur du domaine — une entité unique, mais qui porte l'essentiel des règles de l'application.

- **Entité `User`** implémentant `UserInterface` et `PasswordAuthenticatedUserInterface`, avec informations principales (login, e-mail, code de profil, visibilité, dates) et champs complémentaires optionnels (téléphone, pays, adresse)
- **Contraintes d'unicité** en base sur le login, l'e-mail et le code de profil, doublées d'attributs `#[UniqueEntity]` pour renvoyer un message clair plutôt qu'une erreur SQL
- **Assertions de validation** directement sur l'entité : longueurs bornées pour le login et le code de profil, format de l'adresse e-mail
- **Callback `#[ORM\PreUpdate]`** mettant à jour la date de dernière modification — avec une subtilité : si le seul champ modifié est la date de dernière connexion, la date de modification n'est pas touchée, sinon une simple connexion ferait croire à une édition du profil

### Codes de profil : génération et unicité en direct

Chaque utilisateur possède un code de profil unique, qu'il peut choisir ou laisser l'application générer. C'est la partie la plus intéressante du projet, parce qu'elle traverse toute la pile — de la base de données au JavaScript.

- **Génération côté serveur** dans `UserManager` : chaîne alphanumérique de longueur aléatoire entre 4 et 20 caractères, régénérée tant que le code tiré est déjà pris
- **Deux routes JSON dédiées**, `checkProfileCode` et `generateProfileCode`, exposées au navigateur via FOSJsRoutingBundle plutôt qu'en codant les URL en dur dans le JavaScript
- **Vérification de disponibilité en direct** pendant la saisie, avec un **debounce** pour ne pas déclencher une requête à chaque frappe
- **Code courant ignoré lors de l'édition**, sinon l'utilisateur se verrait reprocher son propre code comme déjà utilisé

### API JSON

- **Deux points d'entrée en lecture** : récupération d'un profil par son login (`/api/profile/login/{login}`) ou par son code de profil (`/api/profile/profileCode/{profileCode}`)
- **Sérialisation explicite** : les champs exposés sont listés un par un dans le contrôleur, ce qui garantit qu'aucune donnée sensible — à commencer par le mot de passe haché — ne peut fuiter par inadvertance
- **Réponse `404` en JSON** avec un message d'erreur structuré quand le profil n'existe pas

### Édition de profil et outillage

- **Formulaire d'édition** distinct du formulaire d'inscription, avec changement de mot de passe optionnel : sans nouveau mot de passe saisi, l'ancien hachage est conservé tel quel
- **Validation du numéro de téléphone** par expression régulière côté serveur, remontée dans le formulaire sous forme d'erreur de champ
- **Commande console `create:user`** permettant de provisionner un compte — administrateur compris — depuis le terminal, indispensable pour peupler la base sans passer par l'interface
- **Pages d'erreur personnalisées** (403, 404, 500) pour l'environnement de production

## Architecture et sécurité

- **Couche de services avec interfaces** : `UserManager`, `FlashMessageHelper` et `UserFormHelper` sont injectés via leur interface et non leur implémentation, ce qui garde les contrôleurs fins et applique concrètement l'inversion des dépendances
- **Authentification par formulaire** configurée dans `security.yaml`, avec protection CSRF activée, identification sur le champ `login` et déconnexion en POST uniquement
- **Autorisations par expression** : les attributs `#[IsGranted]` posés sur les routes d'édition et de suppression n'autorisent l'action qu'au propriétaire du compte ou à un administrateur
- **Hachage des mots de passe** délégué au `UserPasswordHasher` de Symfony, avec l'algorithme `auto`
- **Souscripteur d'événements d'authentification** mettant à jour la date de dernière connexion à la réussite du login et poussant les messages flash de connexion, d'échec et de déconnexion
- **Mode maintenance** : un écouteur sur `kernel.request`, en priorité haute, redirige tout le trafic vers une page dédiée, le drapeau étant piloté par une commande console

## Interface Twig

- **Templates découpés et factorisés** : un `base.html.twig` commun, des vues par domaine (profils, utilisateurs, pages utilitaires) et des fragments réutilisables inclus des deux côtés — le widget de code de profil est ainsi partagé entre l'inscription et l'édition
- **Champs de formulaire factorisés** dans `UserFormHelper`, pour éviter de dupliquer la définition des champs entre inscription et édition
- **Messages flash** centralisés dans le layout, alimentés par un service qui convertit les erreurs de validation du formulaire en messages lisibles
- **Affichage conditionnel selon l'état de connexion et le rôle** : la navigation, les boutons d'édition et de suppression n'apparaissent que si l'utilisateur y a droit
- **AssetMapper avec importmap**, Stimulus et Turbo, sans build front à installer

## Infrastructure

- **Docker Compose** avec deux services : un serveur Apache/PHP construit sur mesure et une base MySQL persistée sur un volume
- **HTTPS en local** via un certificat auto-signé, en plus du HTTP
- **Migrations Doctrine** versionnées pour reconstruire le schéma à l'identique sur n'importe quel poste
- **Installation documentée pas à pas** dans le README, du démarrage des conteneurs à la création de la base

## Travail en équipe

- **Mise en place de l'organisation du projet** : création et animation du Trello, configuration du dépôt et de sa structure
- **Répartition explicite des tâches** — entité, API, édition et codes de profil de mon côté, intégration CSS et page d'accueil pour Téo, suppression et visibilité des profils pour Victor
- **Versionnage sur le GitLab de l'IUT**, dépôt ensuite miroité sur GitHub
- **Points réguliers et relectures croisées**, particulièrement utiles sur les permissions, où une décision prise par un membre change directement le comportement du code des autres

## Technologies

- **Back-end** : Symfony 6.4, PHP 8.1+, Doctrine ORM 3, FOSJsRoutingBundle
- **Front-end** : Twig, AssetMapper et importmap, Stimulus, Turbo, JavaScript, CSS
- **Base de données** : MySQL, migrations Doctrine
- **Infrastructure** : Docker Compose, Apache

## Ce que j'en retire

- **Placer les contraintes au bon endroit** : entre les assertions sur l'entité et celles sur le formulaire, la règle qui protège réellement les données est celle qui vit sur l'entité — la retenue d'évaluation la plus utile du projet
- **Une fonctionnalité simple traverse toute la pile** : le code de profil m'a fait toucher à la contrainte d'unicité en base, au service métier, à la route exposée et au JavaScript, jusqu'au debounce pour rendre la saisie agréable
- **Les permissions se conçoivent avant de se coder** : les exprimer par expression fonctionne, mais les regrouper dans des voters aurait rendu les règles bien plus lisibles et testables — c'est la première chose que je referais autrement
