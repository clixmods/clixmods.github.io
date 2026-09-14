+++
date = "2024-01-19T00:00:00+01:00"
draft = false
title = "Fortuna BlackJack"
subtitle = "Jeu de Blackjack en Java et JavaFX - IUT Montpellier-Sète"
description = "Projet de deuxième année de BUT Informatique : un jeu de Blackjack de bureau développé en équipe en Java et JavaFX, avec comptes joueurs, mises et interface bilingue."
tags = [
  "Académique",
  "SAÉ",
  "Java",
  "JavaFX",
  "Jeu de cartes",
  "Travail en équipe"
]
category = "projects"
sector = "appsweb-etude"
status = "Terminé"
featured = false
fmContentType = "project-content-type"
frameworks_engines = [ "fw_javafx" ]
programming_languages = [ "lang_java", "lang_sql", "lang_css" ]
specialties = [
  "spec_programmation_orientee_objet",
  "spec_interface_utilisateur",
  "spec_architecture_logicielle",
  "spec_gestion_de_versions_avec_git"
]
soft_skills = [
  "skill_travail_en_equipe",
  "skill_communication",
  "skill_gestion_de_projet"
]
tools = [
  "tool_gitlab",
  "tool_github",
  "tool_jetbrains",
  "tool_fork",
  "tool_photoshop"
]
image = "/images/projects/blackjack-javafx/partie.png"

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
total = "4 mois"
start_date = "2023-09-29T00:00:00.000Z"
end_date = "2024-01-19T00:00:00.000Z"

[[actions]]
type = "github"
label = "Voir le code source"
url = "https://github.com/clixmods/BlackJackJAVAFX"
primary = true
fieldGroup = "actions_group"

[[actions]]
type = "download"
label = "Télécharger le jeu"
url = "https://github.com/clixmods/BlackJackJAVAFX/releases/tag/v1.0.0"
primary = false
fieldGroup = "actions_group"

[[galleries]]
title = "Aperçu"
size = "size-medium"
fieldGroup = "galleries_group"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/blackjack-javafx/accueil.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/blackjack-javafx/mise.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/blackjack-javafx/partie.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/blackjack-javafx/regles.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/blackjack-javafx/connexion.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/blackjack-javafx/inscription.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/blackjack-javafx/compte.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/blackjack-javafx/parametres.png"

  [[galleries.images]]
  fieldGroup = "gallery_group"
  url = "/images/projects/blackjack-javafx/cgu.png"

[[contributors]]
person = "clement-garcia"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "yanis-bendahmane"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "elliot-barthelemy"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "quentin-laborie"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "mateo-dias"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"
+++

## Présentation

Projet de **deuxième année de BUT Informatique** à l'IUT Montpellier-Sète, réalisé en équipe de cinq dans le cadre de la **SAÉ 3.01**, de septembre 2023 à janvier 2024. Le sujet imposait de développer une application de bureau en Java : nous avons choisi d'en faire un jeu de Blackjack, **Fortuna BlackJack**.

Le joueur crée un compte, gère son solde, mise à l'aide de jetons puis affronte le croupier selon les règles classiques du Blackjack. L'interface est disponible en français et en anglais, avec musique d'ambiance et effets sonores.

## Reprise du projet

Rendu à l'époque sous forme de prototype, le projet a été repris pour le rendre présentable : **refonte du design de l'interface**, nettoyage du code et du guide d'installation, et ajout d'un **mode hors ligne** qui permet de lancer le jeu directement, sans base de données, avec un compte invité.

## Technologies

- **Langage** : Java 17
- **Interface** : JavaFX 20 (FXML)
- **Base de données** : MariaDB via JDBC
- **Build et tests** : Maven, JUnit 5
