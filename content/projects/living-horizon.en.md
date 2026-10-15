+++
date = "2026-10-13T10:00:00+02:00"
draft = false
title = "Living Horizon"
slug = "living-horizon"
subtitle = "Multi-loader Minecraft mod that brings the horizon to life past the render distance"
description = "Minecraft mod for Fabric, Quilt, NeoForge and Forge, from 1.20 to 26.3 out of a single source tree built with Stonecutter: animals, villagers, birds and other players stay visible far past the render distance, on the far terrain of Voxy and Distant Horizons, with an optional data pack for servers"
tags = [
  "Java",
  "Fabric",
  "NeoForge",
  "Forge",
  "Quilt",
  "Stonecutter",
  "Modding",
  "Minecraft",
  "Rendering",
  "Shaders",
  "Mixin",
  "Gradle",
  "GitHub Actions"
]
category = "projects"
sector = "mods"
featured = true
featuredInCV = false
fmContentType = "project-content-type"
status = "In progress"
image = "/images/projects/living-horizon/avant-apres-shaders.webp"
programming_languages = [ "lang_java" ]
frameworks_engines = [ "fw_fabric", "fw_quilt", "fw_neoforge", "fw_forge", "fw_stonecutter" ]
specialties = [
  "spec_modding",
  "spec_shaders",
  "spec_optimisation",
  "spec_temps_reel",
  "spec_architecture_logicielle"
]
soft_skills = [
  "skill_resolution_problemes",
  "skill_creativite"
]
tools = [ "tool_gradle", "tool_junit", "tool_github_actions", "tool_github", "tool_claude" ]

[[actions]]
type = "website"
label = "Visit the mod's website"
url = "https://mc-skin-creator.github.io/living-horizon-website/"
primary = true
fieldGroup = "actions_group"

[[actions]]
type = "website"
label = "Download on CurseForge"
url = "https://www.curseforge.com/minecraft/mc-mods/living-horizon"
primary = false
fieldGroup = "actions_group"

[[actions]]
type = "website"
label = "Nexus Mods"
url = "https://www.nexusmods.com/minecraft/mods/1376"
primary = false
fieldGroup = "actions_group"

[[actions]]
type = "github"
label = "View on GitHub"
url = "https://github.com/MC-Skin-Creator/living-horizon"
primary = false
fieldGroup = "actions_group"

[[contributors]]
person = "clement-garcia"
roles = [ "Developer" ]
fieldGroup = "contributors_group"

[[galleries]]
title = "Before / after, in game"
description = "Same settings on both sides (render and simulation distance 12): without the mod, then with it."
size = "size-large"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon/shaders-sans-le-mod.webp"
  caption = "With a shader pack, without the mod: past a few chunks, the hills are empty."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon/shaders-avec-le-mod.webp"
  caption = "Same view with Living Horizon: the herds are back on the far hills."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon/vanilla-sans-le-mod.webp"
  caption = "No shaders, no mod: only the nearest pigs are drawn."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon/vanilla-avec-le-mod.webp"
  caption = "With the mod: cows, horses and sheep fill the plains up to the horizon."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon/test-de-charge-villageois.webp"
  caption = "A load test: hundreds of distant villagers drawn at once."
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

# Living Horizon

**Living Horizon** gives life to the distance. Minecraft stops drawing animals and players a few chunks away; far-terrain mods such as **Voxy** and **Distant Horizons** stretch the landscape to the horizon, but that landscape stays empty and still. With Living Horizon, animals graze on the far hills, villagers live around far-off villages, birds cross the sky and other players keep walking, with their skin, armour and mount, far past the render distance.

The mod is installed in the player's game and works on any server, with nothing to install there; on the server side, an **optional data pack** makes positions exact at any distance. It runs on **Fabric, Quilt, NeoForge and Forge**, from **Minecraft 1.20 to 26.3** (53 builds), out of a single source tree built with **Stonecutter**. It also works without a far-terrain mod: play with minimal render and simulation distance and keep a living world, which wins back frames per second. A personal, source-available project, published on [CurseForge](https://www.curseforge.com/minecraft/mc-mods/living-horizon) and [Nexus Mods](https://www.nexusmods.com/minecraft/mods/1376), with over 5,500 downloads in its first week. It has its own [landing site](/en/projects/living-horizon-website/).

{{< figure src="/images/projects/living-horizon/avant-apres-shaders.webp" alt="Living Horizon before / after" caption="Left without the mod, right with it: same view, same settings (render distance 12, shader pack)." >}}

## What the mod does

- **Players visible from afar.** They keep walking where they are, past the range where the server stops sending them, with their skin, cape, elytra, armour and whatever they ride. A player who logged off stays asleep where they left.
- **Mobs living in the distance.** Animals, villagers and golems graze and wander around far-off villages, hidden by the terrain pixel by pixel, shaders included.
- **A living sky.** Flocks, geese in a V, gulls on the coast, pigeons on buildings, ducks on lakes, bats at night… and now and then a flying saucer taking a cow.
- **An optional data pack** for servers, which makes positions exact at any distance.
- **Everything is configurable** in game: which mobs, which birds, how many, how far, with quality presets.

{{< image-grid >}}

{{< figure src="/images/projects/living-horizon/vanilla-sans-le-mod.webp" alt="Without the mod" caption="Without the mod: the plain empties after a few chunks." >}}

{{< figure src="/images/projects/living-horizon/vanilla-avec-le-mod.webp" alt="With the mod" caption="With the mod: the herds stay visible up to the horizon." >}}

{{< /image-grid >}}

## Technical challenges

**Knowing where things are, without asking the server.** The client only receives entities within a limited range. For players, the mod uses the game's *locator bar*: past 332 blocks it only gives a direction. A direction is a line, not a point; but as you move, you see that line from somewhere else and the lines cross. A **particle filter** estimates the distance that way: a minute of walking sideways places a player 1.7 km away to within 25–190 blocks. For mobs, each client remembers those it met; in single player, a scan reads the saved chunks directly, without loading or generating them.

**Bringing thousands of mobs to life without AI.** No AI runs at all: animations are written once, laid on the terrain read around the mob (from loaded chunks or from Voxy / Distant Horizons), turned eight ways and kept only if they never leave the ground, never drop off a cliff and never cross a fence. While they play, only one point of the animation is computed. The hand-over with the real mob sent by the server never leaves a gap or a jump.

**Drawing on other mods' terrain, without ever changing it.** Voxy and Distant Horizons draw their terrain into their own buffers. For distant mobs to hide behind their hills, the mod reads their depth, merges it into the game's just long enough to draw the entities, then puts everything back before anyone reads it again. All of this has to live alongside **Iris** and shader packs (Photon, Complementary…), the game's **Vulkan** renderer, Photon's TAAU upscaling and 26.2's reversed depth: a project rule forbids changing a single pixel of what other mods draw.

**Impostors to carry the load.** Past a set distance, a mob is no longer drawn as a 3D model but as a flat picture turned to the camera. Those pictures are baked by the game's own renderers (so skins, armour, resource packs and other mods' models follow by themselves), from eight angles, with mip levels computed by hand so that a figure a few pixels tall is neither a ghost nor fatter than its model. Mobs hidden by terrain are skipped through **GPU occlusion queries**, read a frame or two late so they never stall.

{{< figure src="/images/projects/living-horizon/test-de-charge-villageois.webp" alt="Load test" caption="Load test: hundreds of distant villagers on screen." >}}

## One source tree, 14 game versions, 4 loaders

The mod is built with **[Stonecutter](https://stonecutter.kikugie.dev/)**, a Gradle plugin for multi-version builds: the code is written once, conditional comments (`//? if >=26.1 {`, `//? if neoforge {`…) pick the variants, and every Minecraft version × loader pair becomes a Gradle project of its own, built and tested by CI. All with Mojang's official mappings: Java 17 up to 1.20.4, Java 21 from 1.20.5, Java 25 on 26.x. Before 1.21.2 the game has no entity render states: the mod ships stand-ins with the same names. Before 1.21.6 it has no redirectable render target: impostors are baked into a target of the mod's own. What differs between loaders (events, config folder) lives in a single `platform/` layer.

## Quality, CI/CD and in-game testing

- **GitHub Actions** builds and tests every target on every pull request, and attaches the jars as an artifact.
- **Automatic versioning and publishing**: the version is derived from conventional commits; a merge into `main` builds each target on its own runner, creates the GitHub release, publishes to CurseForge and Nexus Mods (through its API) and announces the version on Discord, in English and French. `develop` produces pre-releases.
- **JUnit tests** on the pure logic, and a test that compiles every function of the data pack with the game's own command dispatcher.
- **Tests in the real client**: the game is started headless (Xvfb, software OpenGL), driven by scenarios and screenshotted. Unit tests do not show what the game draws; screenshots do.

## A project built with AI

Like [MC Skin Creator](/en/projects/mc-skin-creator-mod/), the mod is developed with **Claude Code**. I set the rules (never touch other mods' rendering, send nothing to the server, a fallback rather than a dead end when an API is missing) and I validate in game. Every bug found while debugging becomes an entry of a checklist in the repository, which the next session reads first: the project remembers its pitfalls.

*Unofficial project. Not approved by or associated with Mojang or Microsoft. "Minecraft" is a trademark of Mojang Studios.*
