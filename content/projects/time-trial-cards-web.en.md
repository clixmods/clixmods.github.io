+++
date = "2026-04-25T09:00:00.000Z"
draft = false
title = "Time Trial Cards - Web Platform"
subtitle = "Teacher dashboard for educational card game sessions"
description = "A Laravel 12 web platform that enables teachers to create and manage interactive educational sessions based on chronological card sequences, with class management, student result tracking, and a REST API consumed by the companion Time Trial Cards Unity application."
tags = [ "PHP", "Laravel", "Docker", "REST API", "Freelance" ]
category = "projects"
sector = "appsweb-professionnel"
featured = true
fmContentType = "project-content-type"
status = "In progress"
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
label = "View platform"
url = "https://edtech.timetrialcards.com/"
primary = true
fieldGroup = "actions_group"

[development_time]
total = "2 days"
start_date = "2026-04-23"
end_date = "2026-04-25"

[[notable_facts]]
value = "Unity REST API"
label = "Public endpoints for the Unity client to join sessions and submit results"
fieldGroup = "notable_facts_group"

[[notable_facts]]
value = "Docker"
label = "Reproducible local development environment set up from scratch"
fieldGroup = "notable_facts_group"

[[notable_facts]]
value = "make deploy"
label = "Automated deployment to o2switch hosting via SSH in a single command"
fieldGroup = "notable_facts_group"

[[galleries]]
title = "Platform overview"
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

## Context

Time Trial Cards - Web Platform is the server-side component of the Time Trial Cards educational project. It provides teachers and administrators with a web dashboard to organize educational content, launch game sessions, and analyze student results. The platform communicates directly with the Time Trial Cards Unity game through a stateless REST API.

## Architecture

The application follows a strict layered architecture:

- **Thin Controllers** - validate input, delegate to services, return JSON or Blade responses
- **Services** containing all business logic, implementing typed PHP interfaces for dependency injection and testability
- **Managers** handling cross-cutting operations spanning multiple services (e.g., creating a user with their teacher profile in a single database transaction)
- **Eloquent Models** representing database entities with bilingual accessors and defined relationships

## Contributions

### REST API for the Unity Client

Design and implementation of unauthenticated public endpoints enabling the Unity game to interact with the platform to join sessions, verify their status, and submit game results.

### Docker Environment

Set up a Docker Compose stack for local development, where none previously existed, allowing any developer to run the full application locally with a single command.

### Deployment Automation

Created a `Makefile` automating production releases to o2switch shared hosting via SSH in a single command.

### GitHub Copilot Configuration

Set up GitHub Copilot configuration files (instructions, skills, agents) to streamline AI-assisted development on the project.
