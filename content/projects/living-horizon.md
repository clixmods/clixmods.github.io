+++
date = "2026-10-08T10:00:00+02:00"
draft = false
title = "Living Horizon"
slug = "living-horizon"
subtitle = "Mod Minecraft : donner vie à l'horizon, au-delà de la distance de rendu"
description = "Mod client pour Fabric, Quilt, NeoForge et Forge qui garde les joueurs, animaux, villageois et oiseaux vivants à l'horizon, bien au-delà de la distance de rendu, par-dessus le terrain lointain de Voxy ou Distant Horizons, de Minecraft 1.20 à 26.3 depuis un seul code source"
tags = [
  "Java",
  "Fabric",
  "Quilt",
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
status = "En cours"
image = "/images/projects/living-horizon/icon.webp"
programming_languages = [ "lang_java" ]
frameworks_engines = [ "fw_fabric", "fw_quilt", "fw_neoforge", "fw_forge" ]
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
label = "Voir sur GitHub"
url = "https://github.com/MC-Skin-Creator/living-horizon"
primary = true
fieldGroup = "actions_group"

[[actions]]
type = "website"
label = "Télécharger (releases)"
url = "https://github.com/MC-Skin-Creator/living-horizon/releases"
primary = false
fieldGroup = "actions_group"

[[contributors]]
person = "clement-garcia"
roles = [ "Développeur" ]
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

**Living Horizon donne vie à la distance.** Avec des mods comme Voxy ou Distant Horizons, on voit des montagnes à des kilomètres… mais un paysage vide : passé la distance de rendu, le serveur n'envoie plus aucune entité. Living Horizon remplit ce vide : les autres joueurs continuent de marcher à l'horizon avec leur skin et leur monture, les animaux et villageois broutent et flânent autour des villages lointains, et le ciel se peuple d'oiseaux. Mod **côté client uniquement** : rien n'est envoyé au serveur. Un data pack optionnel, côté serveur, rend les positions exactes à n'importe quelle distance.

Mod pour **Fabric, Quilt, NeoForge et Forge**, de **Minecraft 1.20 à 1.21.11 et de 26.1 à 26.3**, depuis un seul code source. Il fonctionne avec le jeu seul, à n'importe quelle distance de rendu, et par-dessus Voxy ou Distant Horizons s'ils sont installés. Projet personnel en source disponible, mené avec l'IA, et livré par une chaîne CI/CD complète.

## Ce que fait le mod

- **Voir les joueurs au loin.** Ils continuent d'avancer là où ils sont, bien au-delà de la portée du serveur, avec skin, cape, élytres, armure et monture.
- **Un horizon vivant.** Animaux, villageois et golems restent visibles autour des villages lointains, et le terrain les masque pixel par pixel, shaders compris.
- **Lever les yeux.** Nuées, oies en V, mouettes sur la côte, pigeons sur les toits, chauves-souris la nuit… et de temps en temps une soucoupe volante qui enlève une vache.
- **Retrouver les joueurs déconnectés.** Un joueur qui se déconnecte reste endormi là où il était, jusqu'à son retour.

## Comment ça fonctionne

**Placer un joueur sans que le serveur le dise.** Sans data pack, le mod n'utilise que ce qu'un client vanilla reçoit déjà. La barre de localisation (1.21.6+) donne le *chunk* d'un joueur jusqu'à 332 blocs, puis seulement une *direction*. Une direction est une droite, pas un point — mais en se déplaçant, on voit cette droite d'ailleurs, et les droites se croisent. Un **filtre particulaire** fait exactement ça : dans les tests, une minute de marche (340 blocs) perpendiculairement à la ligne de visée place un joueur à 1,7 km à 25–190 blocs près.

**Un data pack pour des positions exactes.** Sans mod côté serveur, il fallait un canal que le serveur envoie à tous les clients, à toute distance : les **scoreboards**. Cinq fois par seconde, le data pack écrit la position de chaque joueur (et, toutes les cinq secondes, celle des mobs mémorisés) dans quatre objectifs affichés dans les barres latérales de quatre couleurs d'équipe que personne n'utilise : invisibles à l'écran, reçus par tous les clients, lus par le mod. Un test compile chaque fonction avec le vrai dispatcher de commandes du jeu.

**Des mobs qui vivent sans IA.** Aucune IA ne tourne : les animations sont écrites une fois (une balade de quelques blocs, pauses pour brouter ou regarder autour), puis posées sur le vrai terrain lu autour du mob — depuis les chunks chargés ou depuis le monde lointain de Voxy / Distant Horizons. Une animation n'est retenue que si elle ne quitte jamais le sol, ne monte ni ne descend plus d'un bloc à la fois : jamais du haut d'une falaise, jamais par-dessus une clôture. Quand le vrai mob revient à portée, la copie marche jusqu'à lui et lui passe le relais, sans saut ni trou.

**Des oiseaux qui lisent le terrain.** Chaque espèce choisit son habitat dans le terrain : cultures pour les rouges-gorges, feuillages pour les mésanges, bloc construit qui dépasse ses voisins pour les pigeons, plage ou océan pour les mouettes.

## Défis techniques de rendu

- **La profondeur du terrain lointain.** Distant Horizons dessine dans son propre framebuffer et n'écrit jamais sa profondeur dans celle du jeu ; certains shader packs excluent aussi celle de Voxy. Le mod lit ces textures de profondeur et leurs projections, les convertit et les **fusionne dans la profondeur du jeu juste avant les entités**, puis restaure l'originale — sauf là où une entité a été dessinée. Les mobs lointains sont ainsi cachés par les montagnes pixel par pixel, et le shader pack retrouve la profondeur qu'il attend.
- **Occlusion queries GPU.** Pour ne pas dessiner les mobs cachés, la boîte de chaque mob est rendue contre cette profondeur dans une *occlusion query* (`GL_ANY_SAMPLES_PASSED_CONSERVATIVE`), sans rien écrire ; la réponse est lue une ou deux images plus tard, jamais attendue. Sur 26.x, le même travail passe par l'abstraction GPU du jeu, compatible Vulkan.
- **Impostors.** Au-delà de 128 blocs, un joueur ou un mob n'est plus un modèle mais une image plane tournée vers la caméra. Les images sont **cuites par les propres renderers du jeu** (huit vues par figure), donc skins, armures, modèles d'autres mods et resource packs sont respectés. Mipmaps calculées sur le CPU avec une rampe d'alpha calée sur le seuil du shader de découpe, hystérésis pour éviter le clignotement, cuisson étalée sur les images (3 ms maximum).
- **Optimisations mesurables.** Animations figées sous 10 pixels de haut, mobs non dessinés gelés, limite de mobs au plus proche… Chaque optimisation a son interrupteur, et un panneau de debug (coût par tick et par image, boîtes et contours colorés selon le sort de chaque mob, vue de profondeur) permet de les comparer.

## Un seul code source, 14 versions et 4 loaders

Le mod cible **Minecraft 1.20.1 à 26.3** sur **Fabric, Quilt, NeoForge et Forge**, en mappings officiels Mojang, de Java 17 à Java 25. **Stonecutter** compile un seul arbre de sources pour chaque couple version/loader ; les différences restent de petites branches versionnées, et ce qui dépend du loader vit dans une couche `platform/`. Quand l'ancien jeu n'a pas ce qu'il faut (pas d'états de rendu d'entité avant 1.21.2, écrans d'options différents avant 1.20.5), le mod fournit ses propres équivalents ; quand c'est impossible, la fonction est retirée plutôt qu'imitée.

## Qualité, CI/CD et tests en jeu

- **GitHub Actions** compile et teste chaque cible à chaque pull request ; le jar et le data pack sont disponibles en artefact.
- **Versionnage et publication automatiques** à partir des commits conventionnels : une fusion sur `main` construit chaque cible sur son propre runner, tague, met à jour le changelog et publie la release ; `develop` produit des préversions.
- **Git Flow strict** : branches `feature/*` et `fix/*`, rien n'est fusionné sans revue humaine.
- **Tests en jeu réels.** Les tests unitaires ne montrent pas ce que le jeu dessine : un client Minecraft tourne en headless (Xvfb, OpenGL logiciel), piloté par des scénarios scriptés, et prend des captures d'écran à vérifier.

## Un projet mené avec l'IA

Comme le [mod MC Skin Creator](/projects/mc-skin-creator-mod/), Living Horizon est développé avec **Claude Code** : je fixe l'architecture, les contraintes et les règles du dépôt (`CLAUDE.md`, avec une checklist de débogage enrichie à chaque cause trouvée), l'IA implémente, la CI et les tests en jeu tranchent, et je relis chaque changement avant fusion.

*Projet non officiel. Non approuvé par, ni associé à Mojang ou Microsoft. « Minecraft » est une marque déposée de Mojang Studios.*
