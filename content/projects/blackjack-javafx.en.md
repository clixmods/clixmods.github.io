+++
date = "2024-01-19T00:00:00+01:00"
draft = false
title = "Fortuna BlackJack"
subtitle = "Blackjack game in Java and JavaFX - IUT Montpellier-Sète"
description = "Second-year Computer Science BUT project: a desktop Blackjack game built as a team in Java and JavaFX, with player accounts, betting and a bilingual interface."
tags = [
  "Academic",
  "SAÉ",
  "Java",
  "JavaFX",
  "Card Game",
  "Teamwork"
]
category = "projects"
sector = "appsweb-etude"
status = "Completed"
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
event_type = "Ranking"
suffix = "th"

[development_time]
total = "4 months"
start_date = "2023-09-29T00:00:00.000Z"
end_date = "2024-01-19T00:00:00.000Z"

[[actions]]
type = "github"
label = "View source code"
url = "https://github.com/clixmods/BlackJackJAVAFX"
primary = true
fieldGroup = "actions_group"

[[actions]]
type = "download"
label = "Download the game"
url = "https://github.com/clixmods/BlackJackJAVAFX/releases/tag/v1.0.0"
primary = false
fieldGroup = "actions_group"

[[galleries]]
title = "Preview"
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
roles = [ "Developer" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "yanis-bendahmane"
roles = [ "Developer" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "elliot-barthelemy"
roles = [ "Developer" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "quentin-laborie"
roles = [ "Developer" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "mateo-dias"
roles = [ "Developer" ]
fieldGroup = "contributors_group"
+++

## Overview

A **second-year Computer Science BUT project** at IUT Montpellier-Sète, built by a team of five as part of **SAÉ 3.01**, from September 2023 to January 2024. The brief was to develop a desktop application in Java: we chose to make a Blackjack game, **Fortuna BlackJack**.

Players create an account, manage their balance, bet using chips, then face the dealer following the classic Blackjack rules. The interface is available in French and English, with background music and sound effects.

## Project revival

Originally delivered as a prototype, the project was later picked up again to make it presentable: a **redesigned interface**, cleaned-up code and setup guide, and a new **offline mode** that launches the game straight away, without a database, using a guest account.

## Technologies

- **Language**: Java 17
- **Interface**: JavaFX 20 (FXML)
- **Database**: MariaDB via JDBC
- **Build and tests**: Maven, JUnit 5
