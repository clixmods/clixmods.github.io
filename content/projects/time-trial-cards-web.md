+++
date = "2026-04-25T09:00:00.000Z"
draft = false
title = "Time Trial Cards - Plateforme Web"
subtitle = "Tableau de bord enseignant pour sessions de jeu educatif"
description = "Une plateforme web Laravel 12 permettant aux enseignants de creer et piloter des sessions de jeu educatif interactives basees sur des sequences de cartes chronologiques, avec gestion des classes, suivi des resultats et une API REST consommee par l'application Unity Time Trial Cards."
tags = [ "PHP", "Laravel", "Docker", "API REST", "Freelance" ]
category = "projects"
sector = "appsweb-professionnel"
featured = true
fmContentType = "project-content-type"
status = "En cours"
image = "/images/projects/ttc_web/ttc_web_dashboard.png"
frameworks_engines = [ "fw_laravel" ]
programming_languages = [
  "lang_php",
  "lang_javascript",
  "lang_html",
  "lang_css",
  "lang_mysql"
]
specialties = [
  "spec_developpement_dapi",
  "spec_architecture_logicielle",
  "spec_developpement_dapplications"
]
tools = [ "tool_docker", "tool_github", "tool_google_sheets" ]

[[actions]]
type = "website"
label = "Voir la plateforme"
url = "https://edtech.timetrialcards.com/"
primary = true
fieldGroup = "actions_group"

[development_time]
total = "2 jours"
start_date = "2026-04-23"
end_date = "2026-04-25"

[[notable_facts]]
value = "API REST Unity"
label = "Endpoints publics pour le client Unity permettant de rejoindre une session et soumettre les resultats"
fieldGroup = "notable_facts_group"

[[notable_facts]]
value = "Docker"
label = "Environnement de developpement local reproductible mis en place de zero"
fieldGroup = "notable_facts_group"

[[notable_facts]]
value = "make deploy"
label = "Deploiement automatise vers l'hebergement o2switch via SSH en une seule commande"
fieldGroup = "notable_facts_group"

[[galleries]]
title = "Apercu de la plateforme"
size = "size-medium"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/ttc_web/ttc_web_dashboard.png"

  [[galleries.images]]
  url = "/images/projects/ttc_web/ttc_web_session_result.png"

  [[galleries.images]]
  url = "/images/projects/ttc_web/ttc_web_session_edit.png"

  [[galleries.images]]
  url = "/images/projects/ttc_web/ttc_web_login.png"

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

## Contexte

Time Trial Cards - Plateforme Web est le composant serveur du projet educatif Time Trial Cards. Elle met a disposition des enseignants et administrateurs un tableau de bord pour organiser le contenu pedagogique, lancer des sessions de jeu et analyser les resultats des eleves. La plateforme communique directement avec le jeu Unity Time Trial Cards via une API REST sans etat.

## Architecture

L'application suit une architecture en couches stricte :

- **Controllers** minimalistes - validation des entrees, delegation aux services, reponse JSON ou Blade
- **Services** contenant la logique metier, implementant des interfaces PHP typees pour faciliter l'injection de dependances et la testabilite
- **Managers** pour les operations transversales impliquant plusieurs services (par exemple, creation d'un utilisateur avec son profil enseignant dans une transaction unique)
- **Models Eloquent** representant les entites de base de donnees avec des accesseurs bilingues et des relations definies

## Contributions

### API REST pour le client Unity

Conception et implementation d'endpoints publics sans authentification permettant au jeu Unity d'interagir avec la plateforme pour rejoindre des sessions, en verifier l'etat et soumettre les resultats de parties.

### Environnement Docker

Mise en place d'une stack Docker Compose pour le developpement local, inexistante jusqu'alors, permettant a tout developpeur de faire tourner l'application complete en local avec une seule commande.

### Automatisation du deploiement

Creation d'un `Makefile` automatisant la mise en production sur l'hebergement o2switch via SSH en une seule commande.

### Configuration GitHub Copilot

Mise en place des fichiers de configuration pour GitHub Copilot (instructions, skills, agents) afin de faciliter le travail assiste par IA sur le projet.