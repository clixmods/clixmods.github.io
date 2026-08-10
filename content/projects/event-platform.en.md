+++
date = "2024-12-23T10:00:00+02:00"
draft = false
title = "Event Management Platform — Push Start"
subtitle = "Symfony/API Platform API & Vue.js front-end - IUT Montpellier-Sète"
description = "Event management web application for the Push Start association: a JWT-secured REST API (Symfony 6.4 / API Platform 4) and a Vue 3 client, fully containerised."
tags = [
  "Symfony",
  "API Platform",
  "Vue.js",
  "REST API",
  "JWT",
  "Docker",
  "Academic"
]
category = "projects"
sector = "appsweb-etude"
status = "Completed"
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
event_type = "Ranking"
suffix = "th"

[development_time]
total = "2 months"
start_date = "2024-10-24T00:00:00.000Z"
end_date = "2024-12-23T00:00:00.000Z"

[[actions]]
type = "github"
label = "View source code"
url = "https://github.com/clixmods/iut-archive-event-platform"
primary = true
fieldGroup = "actions_group"

[[galleries]]
title = "Preview"
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
roles = [ "Developer" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "victor-vidaux"
roles = [ "Developer" ]
fieldGroup = "contributors_group"

[[contributors]]
person = "teo-moerel"
roles = [ "Developer" ]
fieldGroup = "contributors_group"
+++

## Overview

Fifth-semester academic project of the BUT degree, built as a team of three at IUT Montpellier-Sète. The goal: give **Push Start** — an association supporting video game creators and digital culture — a platform to organise its themed events: industry meetups, creative workshops and talks.

The application is built on a **decoupled architecture**: a REST API developed with Symfony and API Platform on one side, a standalone Vue.js client on the other, communicating solely over HTTP and authenticated with JWT tokens.

- **Three distinct roles**: attendee, organiser and administrator, each with its own permissions
- **Full event lifecycle**: creation by an organiser, attendee registration and cancellation, participant listing
- **Two months of development** split in two phases: API design (October–November), then front-end integration (December)

## My role: designing the API

### Domain model and business rules

I took ownership of modelling and implementing the business core, built around the `Event`, `Subscription` and `User` entities.

- **`Event` entity** carrying both general information and theme-specific attributes
- **Systematic validation on creation**: consistent pricing (strictly positive when the event is paid), valid maximum attendee count, and rejection of any date already in the past
- **Automatic organiser assignment** from the authenticated user, creation being restricted to the `ROLE_ORGANIZER` role
- **`Subscription` entity** holding the registration rules: verification that both the user and the event exist, remaining-seat checks, and a ban on registering for two overlapping events
- **Cascading deletion**: removing a user also removes the events they organise

### Security and role management

- **JWT authentication** via LexikJWTAuthenticationBundle, with the token carried in a cookie rather than a header, through a listener on authentication success
- **Stateless firewall**: no server-side session, the API stays entirely stateless
- **`json_login` entry point** on `/api/auth`, authenticating against the `login` field of the `User` entity
- **Role hierarchy** `ROLE_ORGANIZER → ROLE_USER`, alongside `ROLE_ADMIN`
- **Fine-grained access rules**: only the organiser can edit their event, the organiser or an administrator can delete it, and each user manages only their own profile

### API Platform and SOLID principles

Rather than concentrating logic inside the entities, each behaviour was isolated in a dedicated class of the API Platform lifecycle — a split that puts single responsibility and dependency inversion into practice.

- **Dedicated State Processors**: `EventProcessor` for event creation, `SubscriptionEventProcessor`, `SubscriptionPutProcessor` and `SubscriptionDeleteProcessor` for registrations, `UserProcessor` for password hashing
- **`SubscriptionProvider` State Provider** exposing the cross-referenced collections: attendees of an event, events of a user
- **`EventAttributeNormalizer`** applying conditional serialisation: the organiser decides whether the attendee list is public
- **Serialisation groups** to precisely control which fields are exposed on read and accepted on write

### Tooling

- **`create:user` console command** to provision accounts with their roles from the terminal, essential to seed the test database
- **Versioned Doctrine migrations** to rebuild the schema identically

## Vue.js front-end — team work

The client side was developed collectively in December; my contribution focused on integration with the API and on keeping the exchange contract consistent.

- **Vue 3 in TypeScript**, built with Vite, code quality enforced by ESLint and `vue-tsc`
- **Vue Router** with routes guarded by user role, restricting certain views to organisers and administrators
- **Reusable components** for forms (`FormulaireConnexion`, `FormulaireInscription`, `FormulaireEvent`, `FormulaireModification`) and data display (`BoiteEvent`, `BoiteUtilisateur`)
- **Centralised API calls** in an `apiStore.ts` utility module, concentrating JWT handling and error processing instead of scattering them across views

## Infrastructure

- **Docker Compose** orchestrating two services: an Apache server with PHP 8.1, and a MySQL database persisted on a volume
- **Local HTTPS** through a self-signed certificate and a dedicated Apache configuration
- **Vite dev server port exposed** by the container, so front-end work never leaves the containerised environment
- **CORS handled by NelmioCorsBundle**, required as soon as client and API are served from distinct origins
- **Reproducible setup** in a single command, with database and JWT keys generated through Symfony commands

## Teamwork

- **A team of three with an explicit split**: entities and business rules on my side, user routes and API testing for Victor, JWT and registrations for Téo
- **Version control on the IUT GitLab**, working on a shared `develop` branch, with the repository later mirrored to GitHub
- **Regular sync-ups and cross-reviews**, particularly around permissions, where one member's decisions directly affect everyone else's work
- **Shared documentation** in the README: installation and configuration on my side, routes and database seeding on Victor's

## Technologies

- **Back-end**: Symfony 6.4, API Platform 4, PHP 8.1, Doctrine ORM 3, LexikJWTAuthenticationBundle 3.1, NelmioCorsBundle
- **Front-end**: Vue 3.5, TypeScript 5.6, Vite 6, Vue Router 4, ESLint 9
- **Infrastructure**: Docker Compose, Apache, MySQL

## What I took away

- **Designing a stateless API** changes how you think about authentication: everything has to fit in the token, nothing can rely on a session anymore
- **API Platform's processor split** makes SOLID principles tangible — every business rule gets its own file, and entities stay readable
- **A decoupled architecture demands a clear contract** between the two halves of the team: the slightest ambiguity in a response format is paid for immediately on the client side
