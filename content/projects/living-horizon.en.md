+++
date = "2026-10-08T10:00:00+02:00"
draft = false
title = "Living Horizon"
slug = "living-horizon"
subtitle = "Minecraft mod: bringing the horizon to life, past the render distance"
description = "Client-side mod for Fabric, Quilt, NeoForge and Forge that keeps players, animals, villagers and birds alive on the horizon, far past the render distance, on top of Voxy's or Distant Horizons' far terrain, from Minecraft 1.20 to 26.3 out of a single source tree"
tags = [
  "Java",
  "Fabric",
  "NeoForge",
  "Forge",
  "Modding",
  "Minecraft",
  "Mixin",
  "OpenGL",
  "Stonecutter",
  "Gradle",
  "JUnit",
  "GitHub Actions"
]
category = "projects"
sector = "mods"
featured = true
featuredInCV = false
fmContentType = "project-content-type"
status = "In progress"
image = "/images/projects/living-horizon/icon.webp"
programming_languages = [ "lang_java" ]
frameworks_engines = [ "fw_fabric" ]
specialties = [
  "spec_modding",
  "spec_shaders",
  "spec_optimisation",
  "spec_temps_reel",
  "spec_architecture_logicielle",
  "spec_maintenance_and_debogage"
]
soft_skills = [
  "skill_resolution_problemes",
  "skill_creativite"
]
tools = [ "tool_gradle", "tool_junit", "tool_github_actions", "tool_github", "tool_claude" ]

[[actions]]
type = "github"
label = "View on GitHub"
url = "https://github.com/MC-Skin-Creator/living-horizon"
primary = true
fieldGroup = "actions_group"

[[actions]]
type = "website"
label = "Download (releases)"
url = "https://github.com/MC-Skin-Creator/living-horizon/releases"
primary = false
fieldGroup = "actions_group"

[[contributors]]
person = "clement-garcia"
roles = [ "Developer" ]
fieldGroup = "contributors_group"

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

# Living Horizon

**Living Horizon gives life to the distance.** With mods like Voxy or Distant Horizons you can see mountains kilometres away… but the landscape is empty: past the render distance, the server stops sending entities. Living Horizon fills that gap: other players keep walking on the horizon with their skin and their mount, animals and villagers graze and wander around far-off villages, and the sky fills with birds. It is a **client-side only** mod: nothing is sent to the server. An optional server-side data pack makes positions exact at any distance.

A mod for **Fabric, Quilt, NeoForge and Forge**, from **Minecraft 1.20 to 1.21.11 and 26.1 to 26.3**, out of a single source tree. It works with the game alone at any render distance, and on top of Voxy or Distant Horizons when they are installed. A source-available personal project, built with AI and shipped through a full CI/CD pipeline.

## What the mod does

- **See players far away.** They keep moving where they are, far past the server's range, with skin, cape, elytra, armour and mount.
- **A living horizon.** Animals, villagers and golems stay visible around distant villages, and the terrain hides them pixel by pixel, shaders included.
- **Look up.** Flocks, geese in a V, gulls on the coast, pigeons on rooftops, bats at night… and now and then a flying saucer abducting a cow.
- **Find players where they left.** A player who logs off stays asleep where they were, until they come back.

## How it works

**Placing a player the server says nothing about.** Without the data pack, the mod only uses what a vanilla client already receives. The locator bar (1.21.6+) gives a player's *chunk* up to 332 blocks, then only a *direction*. A direction is a line, not a point — but as you move, you see that line from somewhere else, and the lines cross. A **particle filter** does exactly that: in the tests, one minute of walking (340 blocks) across the line of sight places a player 1.7 km away to within 25–190 blocks.

**A data pack for exact positions.** With no server-side mod, it needed a channel the server sends to every client at any distance: **scoreboards**. Five times a second, the data pack writes each player's position (and, every five seconds, the remembered mobs') into four objectives shown in the sidebars of four team colours nobody uses: invisible on screen, received by every client, read by the mod. A test compiles every function with the game's own command dispatcher.

**Mobs that live without AI.** No AI runs anywhere: the animations are written once (a stroll of a few blocks, with pauses to graze or look around), then laid on the real terrain read around the mob — from loaded chunks or from Voxy's / Distant Horizons' far world. An animation is only kept if it never leaves the ground nor climbs or drops more than one block at a time: never off a cliff, never over a fence. When the real mob comes back in range, the copy walks up to it and hands over, with no jump and no gap.

**Birds that read the terrain.** Each kind picks its habitat from the terrain: crops for robins, leaves for tits, a man-made block standing above its neighbours for pigeons, a beach or ocean for gulls.

## Rendering challenges

- **The far terrain's depth.** Distant Horizons draws into its own framebuffer and never writes its depth into the game's; some shader packs keep Voxy's out as well. The mod reads those depth textures and their projections, converts them and **merges them into the game's depth right before the entities**, then restores the original — except where an entity was drawn. Distant mobs are hidden by mountains pixel by pixel, and the shader pack still finds the depth it expects.
- **GPU occlusion queries.** To skip hidden mobs, each mob's box is drawn against that depth inside an *occlusion query* (`GL_ANY_SAMPLES_PASSED_CONSERVATIVE`), writing nothing; the answer is read a frame or two later, never waited for. On 26.x the same work goes through the game's GPU abstraction, Vulkan included.
- **Impostors.** Past 128 blocks, a player or mob is no longer a model but a flat picture facing the camera. The pictures are **baked by the game's own renderers** (eight views per figure), so skins, armour, other mods' models and resource packs are all respected. Mip levels computed on the CPU with an alpha ramp tuned to the cut-out shader's threshold, hysteresis against blinking, baking spread across frames (3 ms at most).
- **Measurable optimisations.** Animations frozen below 10 pixels tall, undrawn mobs frozen, a cap on the nearest mobs… Every optimisation has its own switch, and a debug panel (cost per tick and frame, boxes and outlines coloured by what became of each mob, depth view) lets you compare them.

## One source tree, 14 versions and 4 loaders

The mod targets **Minecraft 1.20.1 to 26.3** on **Fabric, Quilt, NeoForge and Forge**, with official Mojang mappings, from Java 17 to Java 25. **Stonecutter** compiles one source tree for every version/loader pair; the differences stay small versioned branches, and what depends on the loader lives in a `platform/` layer. When an older game lacks what is needed (no entity render states before 1.21.2, different option screens before 1.20.5), the mod brings its own stand-ins; when that is impossible, the feature is left out rather than imitated.

## Quality, CI/CD and in-game testing

- **GitHub Actions** builds and tests every target on each pull request; the jar and the data pack are available as artifacts.
- **Automatic versioning and publishing** from conventional commits: a merge into `main` builds each target on its own runner, tags, updates the changelog and publishes the release; `develop` produces pre-releases.
- **Strict Git Flow**: `feature/*` and `fix/*` branches, nothing merged without human review.
- **Real in-game tests.** Unit tests do not show what the game draws: a Minecraft client runs headless (Xvfb, software OpenGL), driven by scripted scenarios, and takes screenshots to check.

## A project built with AI

Like the [MC Skin Creator mod](/en/projects/mc-skin-creator-mod/), Living Horizon is developed with **Claude Code**: I set the architecture, the constraints and the repository rules (`CLAUDE.md`, with a debugging checklist extended each time a cause is found), the AI implements, CI and in-game tests decide, and I review every change before merging.

*Unofficial project. Not approved by or associated with Mojang or Microsoft. "Minecraft" is a trademark of Mojang Studios.*
