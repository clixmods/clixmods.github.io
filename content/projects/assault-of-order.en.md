+++
date = "2022-07-01T08:00:00.000Z"
draft = false
title = "Assault of Order"
subtitle = "First year end project - e-artsup"
description = "First complete game project with UML and advanced C# development"
tags = [ "fw_unity", "First Year", "UML", "Game Development" ]
category = "projects"
sector = "games-personnel"
featured = true
fmContentType = "project-content-type"
status = "Completed"
logo = "/images/projects/assault-of-order/assault-of-order-logo.png"
image = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-3.jpg"
frameworks_engines = [ "fw_unity" ]
programming_languages = [ "lang_csharp" ]
specialties = [
  "spec_developpement_outils",
  "spec_lighting",
  "spec_environnement_building",
  "spec_developpement_gameplay",
  "spec_gestion_de_versions_avec_git",
  "spec_algorithmique"
]
soft_skills = [ "skill_resolution_problemes", "skill_communication" ]
tools = [
  "tool_fork",
  "tool_visual_studio",
  "tool_hacknplan",
  "tool_sonyvegas",
  "tool_github",
  "tool_discord"
]

[[actions]]
type = "download"
label = "Play the game"
url = "https://evil0games.itch.io/assault-of-order"
primary = true

[[actions]]
type = "youtube"
label = "Watch trailer"
url = "https://youtu.be/G1OzgE-y5Jk"
primary = false

[[contributors]]
person = "clement-garcia"
roles = ["Developer", "Level Designer", "Lighting"]
fieldGroup = "contributors_group"

[[contributors]]
person = "soundouss-khattabi"
roles = ["Artist"]
fieldGroup = "contributors_group"

[[contributors]]
person = "marion-abrial"
roles = ["Artist"]
fieldGroup = "contributors_group"

[[contributors]]
person = "ouzagua-nassim"
roles = ["Artist"]
fieldGroup = "contributors_group"

[[contributors]]
person = "shaim-somsanith"
roles = ["Artist"]
fieldGroup = "contributors_group"

[[contributors]]
person = "clement-courtois"
roles = ["Artist"]
fieldGroup = "contributors_group"

[[contributors]]
person = "aymeric-ducarme"
roles = ["Developer"]
fieldGroup = "contributors_group"

[[contributors]]
person = "matthieu-osten"
roles = ["Developer"]
fieldGroup = "contributors_group"

[development_time]
total = "2 Months"
start_date = "2022-05-30T22:00:00.000Z"
end_date = "2022-06-30T22:00:00.000Z"

[[galleries]]
title = "Photo"
size = "size-medium"
order = "90"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/aoo-photo.jpg"

[[galleries]]
title = "Gameplay"
size = "size-medium"
order = "90"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/aoo-gif-1.gif"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-ingame-1.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-ingame-2.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-ingame-3.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-ingame-4.jpg"

[[galleries]]
title = "Environment"
size = "size-medium"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-1.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-2.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-3.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-4.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-5.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-6.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-7.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-8.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-9.jpg"

  [[galleries.images]]
  url = "/images/projects/assault-of-order/clement-garcia-aoo-leveldesign-10.jpg"

[[youtube_singles]]
size = "size-medium"
video_id = "G1OzgE-y5Jk"
video_title = "Trailer"
duration = "1:35"
order = "1"
fieldGroup = "youtube_singles_group"

[ranking]
event_type = "Ranking"
suffix = "th"

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

# Assault of Order

## Project Description

End-of-first-year project completed at E-artsup.
Turn-based strategy game inspired by XCOM, where two teams face off on a grid battlefield.
Each unit has its own abilities and skills, pushing the player to think, plan, and anticipate each action to win.

On this project, I was primarily focused on the technical side and game system design.
My goal was to bring the core gameplay to life: the grid, unit movement, and turn progression.
I also contributed to setting up the game's visual environment and lighting.

## Development & Gameplay

- Complete design of the game grid system (tiles, coordinates, interactions)
- Development of internal tools allowing direct tile painting in the Unity editor
- Implementation of A* pathfinding algorithm for intelligent unit movement
- Visualization of the path traveled and movement cost on the grid
- Programming of the turn-based system (managing player A and B, unit order, transitions)
- Management of turns and game state: selection phase, movement, attack, end of round

## Environment & Lighting

- Creation of environment building from the level design provided by the team
- Work on the game's overall lighting (atmosphere, readability, contrast)

