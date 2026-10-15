+++
date = "2026-10-15T10:00:00+02:00"
draft = false
title = "Living Horizon (website)"
slug = "living-horizon-website"
subtitle = "Landing site of the Living Horizon mod: Angular, static, fed by the project's APIs"
description = "One-page site for the Living Horizon Minecraft mod: serverless Angular 22, data pulled live from GitHub, CurseForge and Modrinth, a before / after slider and animated pixel-art illustrations on canvas, generated from the game's own models"
tags = [
  "Angular",
  "TypeScript",
  "Canvas",
  "Pixel art",
  "Python",
  "GitHub Pages",
  "GitHub Actions"
]
category = "projects"
sector = "appsweb-personnel"
featured = true
featuredInCV = false
fmContentType = "project-content-type"
status = "In Production"
image = "/images/projects/living-horizon-website/horizon-pixel-art.webp"
programming_languages = [ "lang_typescript", "lang_html", "lang_css", "lang_python" ]
frameworks_engines = [ "fw_angular" ]
specialties = [
  "spec_interface_utilisateur",
  "spec_experience_utilisateur_ux",
  "spec_gestion_des_donnees",
  "spec_developpement_outils"
]
soft_skills = [
  "skill_creativite"
]
tools = [ "tool_github_actions", "tool_github", "tool_claude" ]

[[actions]]
type = "website"
label = "Visit the website"
url = "https://mc-skin-creator.github.io/living-horizon-website/"
primary = true
fieldGroup = "actions_group"

[[actions]]
type = "github"
label = "View on GitHub"
url = "https://github.com/MC-Skin-Creator/living-horizon-website"
primary = false
fieldGroup = "actions_group"

[[contributors]]
person = "clement-garcia"
roles = [ "Developer", "Designer" ]
fieldGroup = "contributors_group"

[[galleries]]
title = "The website"
description = "Screenshots taken on the live site."
size = "size-large"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/accueil.webp"
  caption = "The hero: an animated pixel-art horizon in the background, and the project's figures read live (version, date, downloads, Minecraft versions)."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/horizon-pixel-art.webp"
  caption = "The hero's pixel-art horizon, animated live on a canvas: hills, mobs, players and birds all the way to the distance."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/concept.webp"
  caption = "The concept in one diagram: what you see without the mod, then with it, from the render distance to the horizon."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/avant-apres-illustration.webp"
  caption = "The before / after slider, here on an illustration: a far-off village coming back to life."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/avant-apres-cavaliers.webp"
  caption = "Another scene of the slider: riders on a ridge."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/compatibilite.webp"
  caption = "Compatibility: Distant Horizons, Voxy, vanilla, and the matrix of the 53 builds read from the mod's configuration."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/changelog.webp"
  caption = "The changelog, pulled from the mod repository's file on every visit."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/telechargement.webp"
  caption = "Download: pick a Minecraft version and a loader, the site gives the right jar and each platform's downloads."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/mobile.webp"
  caption = "On a phone (390 px)."
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

# Living Horizon (website)

The one-page site of the **[Living Horizon](/en/projects/living-horizon/)** mod, live at **[mc-skin-creator.github.io/living-horizon-website](https://mc-skin-creator.github.io/living-horizon-website/)**. In a few seconds it explains what the mod does, shows it before / after, says which versions it runs on and hands out the right file to download. A fully static **Angular 22** site, deployed to GitHub Pages, with no server and no database.

{{< figure src="/images/projects/living-horizon-website/accueil.webp" alt="Living Horizon website hero" caption="The hero: the animated horizon in the background is drawn live on a canvas." >}}

## No hardcoded data

Anything a source can answer is asked of that source:

- **Version, date, release files, GitHub downloads**: GitHub's releases API (pre-releases skipped).
- **Changelog**: the `changelog/en.md` file of the mod's repository.
- **Minecraft versions, loaders, tested or needing testers**: the mod's build configuration (`stonecutter.properties.toml`), parsed in the browser.
- **CurseForge and Modrinth downloads**: their respective APIs (Modrinth shows "Coming soon" while the project does not exist).

The page first renders from a JSON snapshot, then asks every source from the browser, with a 30-minute cache (GitHub allows only 60 anonymous calls an hour). A source that fails keeps the snapshot, and with neither, each section has its fallback. CI refreshes the snapshot on every build and once a day: a new mod version shows up on the site without touching it.

{{< figure src="/images/projects/living-horizon-website/compatibilite.webp" alt="Compatibility section" caption="The version and loader matrix is read from the mod's configuration, with the tested builds and those looking for testers." >}}

## Illustrations made with the game

- **Animated pixel-art horizons**, drawn on canvas at low resolution and scaled up without smoothing, like the game's own pixels. Each scene exists in two states: life limited to the render distance, or extended to the horizon. Every motion is a function of time, so both sides of the slider move in step.
- **Mobs built from the game's models.** A Python script reads each model out of the Minecraft client method that builds it, by **replaying its bytecode** (through `javap`), poses it and draws it one pixel per pixel of its texture. Nothing is drawn by eye: every box, pivot and texture offset is the game's.
- **Players made with [MC Skin Creator](/en/projects/mc-skin-creator/)**: the characters in the illustrations are skins composed in my other project, exported as animated avatars.
- **A before / after slider** that opens on real in-game screenshots, then on the illustrations.

{{< image-grid >}}

{{< figure src="/images/projects/living-horizon-website/concept.webp" alt="Concept diagram" caption="The concept: without the mod, the far terrain is empty; with it, it lives." >}}

{{< figure src="/images/projects/living-horizon-website/avant-apres-illustration.webp" alt="Before / after slider" caption="The slider, on a far-off village." >}}

{{< /image-grid >}}

## Download and deployment

The download section offers the right jar for the chosen Minecraft version and loader, with the Java version it needs and what it depends on, and adds up the downloads of every platform. The site is built by **GitHub Actions** on every pull request and deployed to **GitHub Pages** on every merge into `main`. Developed with **Claude Code**, on the same branch and review flow as the mod.

{{< figure src="/images/projects/living-horizon-website/telechargement.webp" alt="Download section" caption="The right file for your version and loader." >}}

*Unofficial project. Not approved by or associated with Mojang or Microsoft. "Minecraft" is a trademark of Mojang Studios.*
