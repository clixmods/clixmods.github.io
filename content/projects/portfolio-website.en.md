+++
date = "2024-09-01T09:00:00+02:00"
draft = false
title = "Personal Portfolio"
slug = "portfolio-website"
subtitle = "Personal website built with Hugo"
description = "Modern portfolio with custom theme, macOS-inspired design, data-driven architecture and integrated CMS"
tags = [
  "Hugo",
  "Static Site",
  "Portfolio",
  "GitHub Pages",
  "FrontMatter CMS"
]
category = "projects"
sector = "appsweb-professionnel"
featured = true
featuredInCV = false
fmContentType = "project-content-type"
status = "Terminé"
frameworks_engines = [ "fw_hugo" ]
programming_languages = [ "lang_javascript", "lang_html", "lang_css" ]
specialties = [
  "spec_interface_utilisateur",
  "spec_experience_utilisateur_ux",
  "spec_architecture_logicielle",
  "spec_design_pattern_et_refactoring",
  "spec_optimisation",
  "spec_gestion_des_donnees"
]
soft_skills = [ "skill_resolution_problemes", "skill_visionvisualisation" ]
tools = [
  "tool_copilot",
  "tool_visual_studio_code",
  "tool_github",
  "tool_photoshop"
]
image = "/images/projects/portfolio-site/realistic_laptop_with_smartphone.png"

[[actions]]
type = "github"
label = "View on GitHub"
url = "https://github.com/clixmods/portfolio"
primary = false

[[contributors]]
person = "clement-garcia"
roles = [ "Developer", "Designer" ]
fieldGroup = "contributors_group"

[development_time]
total = "3 months"

[ranking]
event_type = ""
suffix = ""

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
+++

# Personal Portfolio

## Project Description

> *"A developer portfolio that reflects my vision: modern, performant and user experience focused."*

This **personal portfolio** is a static website built with **Hugo**, showcasing my projects, skills and professional journey. Beyond a simple showcase, this project demonstrates my capabilities in front-end development, data architecture and interface design.

The site is **fully bilingual** (French/English) and uses a **data-driven architecture** where most content is managed through structured JSON files, facilitating maintenance and evolution.

## Technical Architecture

### Technology Stack

Choosing Hugo as the static site generator offers several major advantages:

- **Optimal performance**: Extremely fast build times and pre-generated pages
- **Enhanced security**: No database or exposed backend
- **Simplified deployment**: Free hosting on GitHub Pages
- **Total flexibility**: Custom theme developed from scratch

### Data-driven Architecture

The chosen approach clearly separates data from rendering:

- **Structured JSON files**: Technologies, skills, profile, configuration
- **Markdown content**: Articles, projects, experiences with TOML frontmatter
- **Go templates**: Modular and reusable rendering logic
- **i18n system**: Centralized translations for multilingual support

This architecture allows content modification without touching code, and design evolution without impacting data.


