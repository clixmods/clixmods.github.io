+++
date = "2026-09-07T10:00:00+02:00"
draft = false
title = "MC Skin Creator"
slug = "mc-skin-creator"
subtitle = "Minecraft skin creator running 100% in the browser"
description = "Web application with no server and no dependency: a catalogue of 703 stackable layer elements, a pixel editor, a WebGL 3D engine and a GIF encoder all written from scratch"
tags = [
  "JavaScript",
  "WebGL",
  "Static Site",
  "Zero Dependency",
  "Cloudflare Workers"
]
category = "projects"
sector = "appsweb-personnel"
featured = true
featuredInCV = false
fmContentType = "project-content-type"
status = "In Production"
image = "/images/projects/mc-skin-creator/catalogue-3d.webp"
programming_languages = [ "lang_javascript", "lang_html", "lang_css" ]
frameworks_engines = [ "fw_webgl", "fw_nodejs" ]
specialties = [
  "spec_interface_utilisateur",
  "spec_experience_utilisateur_ux",
  "spec_architecture_logicielle",
  "spec_developpement_outils",
  "spec_algorithmique",
  "spec_optimisation",
  "spec_gestion_de_fichiers",
  "spec_design_pattern_et_refactoring",
  "spec_developpement_dapplications"
]
soft_skills = [
  "skill_resolution_problemes",
  "skill_creativite",
  "skill_visionvisualisation"
]
tools = [ "tool_visual_studio_code", "tool_github", "tool_cloudflare_workers", "tool_claude" ]

[[actions]]
type = "website"
label = "Visit website"
url = "https://mcskincreator.app/"
primary = true
fieldGroup = "actions_group"

[[contributors]]
person = "clement-garcia"
roles = [ "Developer", "Designer" ]
fieldGroup = "contributors_group"

[[galleries]]
title = "The application"
description = ""
size = "size-large"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/mc-skin-creator/vue-3d-texture.webp"
  caption = "3D preview and texture side by side: whatever you paint shows up on the character right away."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/mc-skin-creator/editeur-pixels.webp"
  caption = "The pixel editor on the 64×64 texture, with grid, face outlines and mirror mode."
  fieldGroup = "gallery_group"

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

# MC Skin Creator

## Project Description

> *"Building a Minecraft skin the way you get dressed: by stacking clothes, not by repainting pixels one by one."*

**MC Skin Creator** is a Minecraft skin creator that runs **entirely in the browser**, live at **[mcskincreator.app](https://mcskincreator.app/)**. No account, no download, no application server: the page loads its catalogue and everything then happens client-side.

The project starts from a simple observation. Existing skin editors either ask you to paint a 64×64 texture pixel by pixel, or let you pick a ready-made skin you can no longer modify. Here, a skin is a **stack of layers**: skin tone, hair, eyes, top, trousers, shoes — each one still editable, reorderable and recolourable afterwards.

The catalogue holds **703 elements** across categories (skin tones, hair, eyes, mouths, hats, accessories, tops, jackets, trousers, shoes…), each **recolourable zone by zone** while keeping its shadows and grain. On top of that: a **pixel editor** on the 64×64 texture, a **real-time 3D preview** with poses and a first-person view, and **exports** to PNG, animated GIF, sprite sheet or a reusable project file.

The site is available in **French, English and Spanish**, and it is a **personal project**, built solo from design through to deployment.

*Unofficial project. Not approved by or associated with Mojang or Microsoft. "Minecraft" is a trademark of Mojang Synergies AB.*
