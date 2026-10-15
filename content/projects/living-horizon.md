+++
date = "2026-10-13T10:00:00+02:00"
draft = false
title = "Living Horizon"
slug = "living-horizon"
subtitle = "Mod Minecraft multi-loader qui fait vivre l'horizon au-delà de la distance de rendu"
description = "Mod Minecraft pour Fabric, Quilt, NeoForge et Forge, de 1.20 à 26.3 depuis un seul code source compilé avec Stonecutter : animaux, villageois, oiseaux et autres joueurs restent visibles bien au-delà de la distance de rendu, sur le terrain lointain de Voxy et Distant Horizons, avec un pack de données optionnel pour les serveurs"
tags = [
  "Java",
  "Fabric",
  "NeoForge",
  "Forge",
  "Quilt",
  "Stonecutter",
  "Modding",
  "Minecraft",
  "Rendu",
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
status = "En cours"
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
label = "Voir le site du mod"
url = "https://mc-skin-creator.github.io/living-horizon-website/"
primary = true
fieldGroup = "actions_group"

[[actions]]
type = "website"
label = "Télécharger sur CurseForge"
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
label = "Voir sur GitHub"
url = "https://github.com/MC-Skin-Creator/living-horizon"
primary = false
fieldGroup = "actions_group"

[[contributors]]
person = "clement-garcia"
roles = [ "Développeur" ]
fieldGroup = "contributors_group"

[[galleries]]
title = "Avant / après, en jeu"
description = "Mêmes réglages des deux côtés (distance de rendu et de simulation à 12) : sans le mod, puis avec."
size = "size-large"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon/shaders-sans-le-mod.webp"
  caption = "Avec un shader pack, sans le mod : au-delà de quelques chunks, les collines sont vides."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon/shaders-avec-le-mod.webp"
  caption = "Même vue avec Living Horizon : les troupeaux réapparaissent sur les collines lointaines."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon/vanilla-sans-le-mod.webp"
  caption = "Sans shaders, sans le mod : seuls les cochons les plus proches sont dessinés."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon/vanilla-avec-le-mod.webp"
  caption = "Avec le mod : vaches, chevaux et moutons remplissent les plaines jusqu'à l'horizon."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon/test-de-charge-villageois.webp"
  caption = "Un test de charge : des centaines de villageois lointains dessinés en même temps."
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

**Living Horizon** donne vie au lointain. Dans Minecraft, le jeu arrête de dessiner les animaux et les joueurs à quelques chunks de distance ; les mods de terrain lointain comme **Voxy** et **Distant Horizons** prolongent le paysage jusqu'à l'horizon, mais ce paysage reste vide et immobile. Avec Living Horizon, les animaux broutent sur les collines lointaines, les villageois vivent autour des villages au loin, les oiseaux traversent le ciel et les autres joueurs continuent de marcher, avec leur skin, leur armure et leur monture, bien au-delà de la distance de rendu.

Le mod s'installe dans le jeu du joueur et fonctionne sur n'importe quel serveur, sans rien y installer ; côté serveur, un **pack de données optionnel** rend les positions exactes à toute distance. Il tourne sur **Fabric, Quilt, NeoForge et Forge**, de **Minecraft 1.20 à 26.3** (53 builds), depuis un seul code source compilé avec **Stonecutter**. Il marche aussi sans mod de terrain lointain : on peut jouer avec une distance de rendu et de simulation minimales et garder un monde vivant, ce qui fait gagner des images par seconde. Projet personnel en source disponible, publié sur [CurseForge](https://www.curseforge.com/minecraft/mc-mods/living-horizon) et [Nexus Mods](https://www.nexusmods.com/minecraft/mods/1376), plus de 5 500 téléchargements dans sa première semaine. Il a son propre [site de présentation](/projects/living-horizon-website/).

{{< figure src="/images/projects/living-horizon/avant-apres-shaders.webp" alt="Avant / après Living Horizon" caption="À gauche sans le mod, à droite avec : même vue, mêmes réglages (distance de rendu 12, shader pack)." >}}

## Ce que fait le mod

- **Des joueurs visibles de loin.** Ils continuent de marcher là où ils sont, au-delà de la portée où le serveur arrête de les envoyer, avec leur skin, leur cape, leurs élytres, leur armure et ce qu'ils chevauchent. Un joueur déconnecté reste endormi là où il est parti.
- **Des mobs qui vivent au loin.** Animaux, villageois et golems broutent et se promènent autour des villages lointains, cachés par le relief pixel par pixel, shaders compris.
- **Un ciel animé.** Nuées, oies en V, mouettes sur la côte, pigeons sur les bâtiments, canards sur les lacs, chauves-souris la nuit… et, de temps en temps, une soucoupe volante qui enlève une vache.
- **Un pack de données optionnel** pour les serveurs, qui rend les positions exactes à n'importe quelle distance.
- **Tout est réglable** dans le jeu : quels mobs, quels oiseaux, combien, jusqu'où, avec des préréglages de qualité.

{{< image-grid >}}

{{< figure src="/images/projects/living-horizon/vanilla-sans-le-mod.webp" alt="Sans le mod" caption="Sans le mod : la plaine se vide après quelques chunks." >}}

{{< figure src="/images/projects/living-horizon/vanilla-avec-le-mod.webp" alt="Avec le mod" caption="Avec le mod : les troupeaux restent visibles jusqu'à l'horizon." >}}

{{< /image-grid >}}

## Les défis techniques

**Savoir où sont les choses, sans rien demander au serveur.** Le client ne reçoit les entités que dans un rayon limité. Pour les joueurs, le mod se sert de la *locator bar* du jeu : au-delà de 332 blocs, elle ne donne qu'une direction. Une direction, c'est une droite et pas un point ; mais quand on se déplace, on voit cette droite d'ailleurs et les droites se croisent. Un **filtre particulaire** estime ainsi la distance : une minute de marche de côté place un joueur à 1,7 km à 25–190 blocs près. Pour les mobs, chaque client mémorise ceux qu'il a croisés ; en solo, un scan lit directement les chunks sauvegardés sans les charger ni les générer.

**Faire vivre des milliers de mobs sans IA.** Aucune intelligence artificielle ne tourne : des animations sont écrites une fois, posées sur le terrain lu autour du mob (depuis les chunks chargés ou depuis Voxy / Distant Horizons), tournées dans huit directions et retenues seulement si elles ne quittent jamais le sol, ne tombent pas d'une falaise et ne franchissent pas de clôture. Pendant qu'elles jouent, on ne calcule qu'un point de l'animation. Le passage de relais avec le vrai mob envoyé par le serveur ne laisse jamais de trou ni de saut.

**Dessiner sur le terrain des autres mods, sans jamais le modifier.** Voxy et Distant Horizons dessinent leur terrain dans leurs propres buffers. Pour que les mobs lointains soient cachés par leurs collines, le mod lit leur profondeur, la fusionne dans celle du jeu juste le temps de dessiner les entités, puis remet tout en place avant que quiconque ne la relise. Le tout doit cohabiter avec **Iris** et les shader packs (Photon, Complementary…), le rendu **Vulkan** du jeu, l'upscaling TAAU de Photon, et les profondeurs inversées de 26.2 : une règle du projet interdit de changer un seul pixel de ce que dessinent les autres mods.

**Des imposteurs pour tenir la charge.** Au-delà d'une certaine distance, un mob n'est plus dessiné comme un modèle 3D mais comme une image plate tournée vers la caméra. Ces images sont cuites par les propres renderers du jeu (skins, armures, resource packs et modèles d'autres mods suivent donc d'eux-mêmes), sous huit angles, avec des niveaux de mip calculés à la main pour qu'une silhouette de quelques pixels ne devienne ni un fantôme ni plus épaisse que le modèle. Les mobs cachés par le relief sont écartés par des **requêtes d'occlusion GPU**, lues avec une ou deux images de retard pour ne jamais bloquer.

{{< figure src="/images/projects/living-horizon/test-de-charge-villageois.webp" alt="Test de charge" caption="Test de charge : des centaines de villageois lointains à l'écran." >}}

## Un seul code source, 14 versions du jeu, 4 loaders

Le mod est compilé avec **[Stonecutter](https://stonecutter.kikugie.dev/)**, un plugin Gradle de compilation multi-versions : le code est écrit une fois, des commentaires conditionnels (`//? if >=26.1 {`, `//? if neoforge {`…) choisissent les variantes, et chaque couple version de Minecraft × loader devient un projet Gradle à part, construit et testé par la CI. Le tout avec les mappings officiels de Mojang : Java 17 jusqu'à 1.20.4, Java 21 à partir de 1.20.5, Java 25 sur 26.x. Avant 1.21.2, le jeu n'a pas d'états de rendu d'entité : le mod fournit des doublures du même nom. Avant 1.21.6, il n'a pas de cible de rendu redirigeable : les imposteurs sont cuits dans une cible propre au mod. Ce qui diffère entre loaders (événements, dossier de configuration) vit dans une seule couche `platform/`.

## Qualité, CI/CD et tests en jeu

- **GitHub Actions** compile et teste chaque cible sur chaque pull request, et joint les jars en artefact.
- **Versionnage et publication automatiques** : la version est calculée à partir des commits conventionnels ; une fusion sur `main` construit chaque cible sur son propre runner, crée la release GitHub, publie sur CurseForge et Nexus Mods (via son API) et annonce la version sur Discord, en anglais et en français. `develop` produit des préversions.
- **Tests JUnit** sur la logique pure, et un test qui compile chaque fonction du pack de données avec le propre dispatcher de commandes du jeu.
- **Tests dans le vrai client** : le jeu est lancé sans écran (Xvfb, OpenGL logiciel), piloté par des scénarios et photographié. Les tests unitaires ne montrent pas ce que le jeu dessine ; les captures, si.

## Un projet mené avec l'IA

Comme [MC Skin Creator](/projects/mc-skin-creator-mod/), le mod est développé avec **Claude Code**. Je fixe les règles (ne jamais toucher au rendu des autres mods, ne rien envoyer au serveur, une fonction de remplacement plutôt qu'une impasse quand une API manque) et je valide en jeu. Chaque bug trouvé en débogage devient une entrée d'une liste de vérification dans le dépôt, que la session suivante relit d'abord : le projet garde la mémoire de ses pièges.

*Projet non officiel. Non approuvé par, ni associé à Mojang ou Microsoft. « Minecraft » est une marque déposée de Mojang Studios.*
