+++
date = "2026-09-07T10:00:00+02:00"
draft = false
title = "MC Skin Creator"
slug = "mc-skin-creator"
subtitle = "Online Minecraft skin editor: Java / Spring Boot back end, Angular front end"
description = "Browser-based Minecraft skin editor: REST API and texture composition engine in Java 21 / Spring Boot 4, Angular 21 front end with custom WebGL 3D rendering, shipped as a single executable jar"
tags = [
  "Java",
  "Spring Boot",
  "JPA",
  "Flyway",
  "Angular",
  "TypeScript",
  "WebGL",
  "JUnit",
  "Playwright",
  "GitHub Actions"
]
category = "projects"
sector = "appsweb-personnel"
featured = true
featuredInCV = false
fmContentType = "project-content-type"
status = "In Production"
image = "/images/projects/mc-skin-creator/catalogue-3d.webp"
programming_languages = [ "lang_java", "lang_typescript" ]
frameworks_engines = [ "fw_spring_boot", "fw_jpa", "fw_flyway", "fw_angular", "fw_webgl" ]
specialties = [
  "spec_developpement_dapi",
  "spec_architecture_logicielle",
  "spec_gestion_des_donnees",
  "spec_securite_et_optimisation",
  "spec_algorithmique",
  "spec_optimisation",
  "spec_developpement_dapplications",
  "spec_interface_utilisateur",
  "spec_experience_utilisateur_ux",
  "spec_gestion_de_fichiers",
  "spec_design_pattern_et_refactoring"
]
soft_skills = [
  "skill_resolution_problemes",
  "skill_creativite",
  "skill_visionvisualisation"
]
tools = [ "tool_junit", "tool_playwright", "tool_github_actions", "tool_github", "tool_visual_studio_code", "tool_claude" ]

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

**Stack:** Java 21 · Spring Boot · JPA / Flyway · Angular · TypeScript · WebGL · JUnit · Playwright · GitHub Actions

**MC Skin Creator** is a Minecraft skin editor that runs in the browser, live at **[mcskincreator.app](https://mcskincreator.app/)**. You build a character by stacking layers (skin, eyes, hair, clothes…) picked from a catalogue of more than 500 elements, recolour them, draw pixel by pixel and watch the result in animated 3D, then export it as PNG, GIF or a sprite sheet. The application combines a **Java 21 / Spring Boot 4** back end with an **Angular 21** front end, shipped together as a single executable jar built by Maven. Interface in French, English and Spanish; a personal project, entirely developed with AI assistance (Claude).

## Back end — Java 21, Spring Boot 4

- **Texture composition engine in Java**: recolours each element zone by zone, applies hue / saturation / lightness adjustments, stacks the layers, then produces the final 64×64 texture and its thumbnail, recomputed and stored on every save. A test compares the output byte for byte with the reference implementation across the whole catalogue (more than 1,800 cases).
- **REST API for skin storage** (Spring MVC, Spring Data JPA, Flyway migrations, H2 database): auto-saved draft, named skins, texture and thumbnail served as PNG. Anonymous clients identified by a UUID header, with a data model designed to take a user accounts table later.
- **Validation and import**: a malformed project is rejected with a 400 in *problem details* format (RFC 9457), listing every violation with its path (e.g. `layers[3].adj.hue`). Imports PNG skins in 64×64, legacy 64×32 (unfolded by symmetry) or HD (downscaled), each rejection carrying an error code that the front end translates.
- **Catalogue and fast loading**: merges several asset sources with hot reload, paginated search in all three languages, reproducible seeded random picks, credits and licence details for every element. More than 1,000 PNGs are packed into one compressed sheet per category, with a content hash in the URL for long-term caching: the editor is ready in under 300 ms.
- **Profiles, security and SEO**: two Spring profiles, including a public one that only serves elements whose licence allows publication (enforced by a test). A filter sets security headers (strict CSP, no inline scripts) and per-file cache rules; sitemap, robots.txt and a 1200×630 Open Graph share image are generated server-side.

## Front end — Angular 21, TypeScript

- **Full-featured editor**: library organised by regions and categories, drag-and-drop layer stack, colour inspector, 2D pixel editor, undo / redo history.
- **Custom WebGL 3D rendering**, no 3D library: ten animations taken from the game, first-person view, painting directly on the 3D model (texel picking via off-screen rendering).
- **Angular architecture**: standalone components, signal-based state, zoneless change detection, animation loop running outside Angular. Abstracted storage layer: the same front end runs against the Java API or localStorage.
- **Exports and mobile**: in-project animated GIF encoder (median-cut quantisation, LZW compression), mobile-friendly interface (drawers, touch gestures, two-finger pinch in the pixel editor).

**Quality:** JUnit tests (API, engine, profiles, validation), Vitest (TypeScript engine, i18n, SEO) and 41 Playwright end-to-end tests (draft surviving a reload, two isolated clients, import, export); parity tests guaranteeing the Java and TypeScript engines produce exactly the same bytes; GitHub Actions pipeline running the full Maven build, Java tests and front-end tests.

*Unofficial project. Not approved by or associated with Mojang or Microsoft. "Minecraft" is a trademark of Mojang Synergies AB.*
