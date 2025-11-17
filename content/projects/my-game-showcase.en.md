+++
date = "2025-01-15T10:00:00+02:00"
draft = false
title = "My Game Showcase"
slug = "my-game-showcase"
subtitle = "Digital artbook platform for video game studios"
description = "Web application for video game studios to create digital artbooks from assets"
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
status = "In Production"

[[contributors]]
person = "francois-bertrand"
roles = ["Project Lead", "Developer"]
fieldGroup = "contributors_group"

[[contributors]]
person = "anthony-expert"
roles = ["Artist"]
fieldGroup = "contributors_group"

[[contributors]]
person = "clement-garcia"
roles = ["Developer"]
fieldGroup = "contributors_group"

[ranking]
event_type = "Ranking"
suffix = "th"

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

## Project Description

> *"Transform your game's image and music assets into a deliverable artbook application in minutes."* - Studio La Moutarde

**My Game Showcase** is a **B2B solution** that transforms batches of images and music into **showcase applications ready for submission** on **PS5, Xbox Series and Nintendo Switch**. All directly from a **web platform**, which generates an **application** for end users.

Developed for video game studios and publishers, this web application allows them to **centralize, structure and showcase their assets** (images, music) as **digital artbooks** in just a few clicks.

## My Contributions

I contributed to the **design and development** of this B2B solution, working on both the **backend architecture** (API .NET 8, SignalR) and the **Blazor frontend** and **advanced features** for application generation.

### Backend API Implementation

- Implementation of the **complete API in .NET 8** with FastEndpoint (typed MinimalAPI)
- **Modular architecture** separating responsibilities (upload, processing, export)
- Management of **large file uploads** with server-side validation
- **Audio metadata editing** with TagLib#
- **Dynamic PDF generation**

### SignalR Implementation for Real-time Synchronization

Long-running processes (conversion, PDF generation) require instant user feedback and synchronization between users.

**Technical Solution**:
- **SignalR implementation** for bidirectional notifications
- Real-time progress updates for processing (audio/video conversion, export generation)
- **Multi-user synchronization** for collaborative editing

**Impact**: Smooth user experience with instant feedback on long operations.

### Advanced File Management (upload, residual, cleanup, metadata)

**Technical Solution**:
- **Smart upload system** with validation and error handling
- Automatic **metadata extraction**
- **Automatic cleanup** of residual and temporary files
- Specific processing per asset type with multi-format support
- Optimized memory management for large files

**Impact**: Zero manual input for most assets, drastic reduction of errors.

### Frontend Development: Pages and Components

**Technical Solution**:
- **Page development under the Blazor framework** for project and artbook administration
- **Creation of reusable components** for multimedia collection editing
- **Upload component with real-time preview** and error handling
- **Contextual navigation** adapted to user workflow
- **Backend API integration**

**Impact**: Professional and accessible interface, reducing learning time.

### Advanced Features: Automatic Generation and Preview

**Technical Solution**:
- **Automatic application generation** from uploaded assets
- **Real-time demo build system** for dynamic preview
- Support for **various formats** with specific processing for each use
- **Multi-platform export** (PS5, Xbox, Switch, PDF, ZIP)

**Impact**: From asset upload to delivered console application in just a few clicks.

### Multi-client Architecture and White Label

**Challenge**: Design a reusable solution for multiple studios/publishers with their own visual identities.

**Technical Solution**:
- **Multi-tenant** architecture with data isolation per client
- **Dynamic branding** system (customizable logos, colors, themes)

### Commercial Product-oriented Design

**Technical Solution**:
- Design with **reusable and extensible product** logic
- Technical documentation and integration guides
- Version management and backward compatibility
- Automated tests on critical modules

## Conclusion

**My Game Showcase** allowed me to work at the product/technical crossroads: making a useful, reliable and fast tool for teams under pressure at the end of production.

