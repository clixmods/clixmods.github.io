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
tools = [ "tool_visual_studio_code", "tool_github", "tool_cloudflare_workers" ]

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

This is a **personal project**, built solo, from product design through to deployment.

## The technical stance: zero dependency

The site is **HTML, CSS and ES5 JavaScript served as-is**: no framework, no bundler, no transpilation, no back-end, and **no external dependency** — no CDN, no remote font, no third-party network call. Each file is an IIFE publishing a global, and the order of the page's `<script>` tags acts as the dependency graph.

That constraint has a direct consequence: **everything the site does had to be written**. The 3D engine, the GIF encoder, the minifier and the test suite are all code from the repository.

**Impact**: a page that loads without any third-party network, stays readable and debuggable ten years from now, and where no vulnerability can arrive through a dependency update.

## My Contributions

### A single data pipeline, from PNG to texture

All rendering converges on **one RGBA 64×64 buffer**, the skin texture:

- each catalogue element is a **transparent 64×64 PNG**, loaded once at startup and cached;
- a layer copies it, **recolours** it, then applies its own hue, saturation and lightness settings;
- compositing the layers produces the final texture, sent both to the **WebGL texture** and to the editor's **zoomed 2D canvas**.

Recompositing goes through a **`dirty` flag** and happens **only once per frame**, which makes pixel drawing possible without recompositing on every stroke.

### The colourable-zone map

Turning elements into images rather than code created a problem: you lose the **colour pickers** (a crown's gem, a sneaker's sole…).

**Technical Solution**:
- each PNG carries a **map giving, for every pixel, the colour key it depends on**, RLE-encoded and **omitted when trivial**;
- the generator derives it on its own, by rendering each element **twice per key** with two very different colours: any pixel that moves depends on that key;
- when recolouring, each pixel receives the **HSL delta** between its default colour and the chosen one.

**Impact**: part of an element can be repainted **while keeping its shadows, gradients and grain** — where a plain fill would have wiped them out.

### Hand-written WebGL 3D engine

**Technical Solution**:
- **WebGL 1 with no library**: one VBO per part/layer pair, 36 vertices, 12 draw calls;
- **two passes** — the base, then the inflated outer layer, **sorted back to front** so partial opacity stays correct;
- **picking via off-screen rendering** (the texel is encoded in the colour and rendered into an FBO): this is what makes **painting directly on the 3D model** possible;
- the same off-screen render path feeds **the preview, the PNG export, the GIF and the sprite sheet** — what you see is exactly what you export;
- a **first-person view** whose framing was **fitted numerically** against a game capture, by coordinate descent on the squared error, rather than eyeballed.

### Animated GIF encoder, also written from scratch

**Technical Solution**:
- full GIF89a: histogram over all frames, **median-cut quantisation**, global colour table, **standard-compliant LZW**;
- index 255 reserved for transparency and a matching disposal method, to avoid trails on a transparent background;
- the animation runs over **exactly one pose period**, giving a loop with no visible seam.

**Impact**: exporting a GIF of the character turning, with no external service and no upload.

### Asset generator and starter models

The 703 elements are not drawn by hand: a **Node generator** produces them from a **drawing DSL** that hides UV coordinates entirely — a preset describes a face of a box, not a rectangle of texels.

The **starter models** come from **slicing reference textures** into ordinary catalogue layers, under two invariants checked on every build:
- the slicing is **exhaustive and exclusive** — stacking the pieces reproduces the original texture **pixel for pixel**;
- a piece is only filled in **where a piece above it covers it**, so whatever is invented is hidden by construction.

Hole filling mirrors the pattern, borrows the immediate neighbour, and when needed rebuilds **a reference body recalibrated face by face** — which is why removing a top does not leave a hole in the torso. The **shadow cast** by a garment is given back to it and converted into **semi-transparent black whose opacity is measured by least squares**, otherwise the garment would carry its original owner's skin tone onto every complexion.

### Quality: tests, safety nets and deployment

**Technical Solution**:
- an **in-house test suite** (~130 tests, no dependency) replayed **in Node inside a `vm` sandbox** and **in the browser**, where the whole application is driven through its real interface in an iframe;
- continuously monitored invariants: no UV zone overlaps, the three languages carry exactly the same keys, every animation loops on its period, serialisation loses no layer property;
- a **minifier written in the repository** (−17%), which renames nothing and **re-reads every file it produces** — token comparison then recompilation — so it refuses to publish damaged code;
- a **content fingerprint in the URLs**, because a cache header does not repair a cache that has already been built;
- deployment on **Cloudflare Workers**, chosen on a precise figure: the site requires **~775 requests on a cold visit**, and it is that number — not the bytes — that rules out the competing free tiers.

### Internationalisation

**Technical Solution**: three languages (French, English, Spanish) covering the interface **and the 703 element names**, with systematic fallback to French, a remembered choice, URL forcing, and **search accepting all three languages at once**.

## Conclusion

**MC Skin Creator** is the project where I pushed hardest on the idea of **writing what you use**: 3D rendering, GIF encoding, asset generation, minification, testing. The "zero dependency" constraint was not an affectation — it is what made every building block understandable, measurable and replaceable.

*Unofficial project. Not approved by or associated with Mojang or Microsoft. "Minecraft" is a trademark of Mojang Synergies AB.*
