+++
date = "2026-10-15T10:00:00+02:00"
draft = false
title = "Living Horizon (site)"
slug = "living-horizon-website"
subtitle = "Site vitrine du mod Living Horizon : Angular, statique, alimenté par les API du projet"
description = "Site d'une page pour le mod Minecraft Living Horizon : Angular 22 sans serveur, données tirées en direct de GitHub, CurseForge et Modrinth, comparateur avant / après et illustrations en pixel art animées sur canvas, générées à partir des modèles du jeu"
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
status = "En production"
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
label = "Voir le site"
url = "https://mc-skin-creator.github.io/living-horizon-website/"
primary = true
fieldGroup = "actions_group"

[[actions]]
type = "github"
label = "Voir sur GitHub"
url = "https://github.com/MC-Skin-Creator/living-horizon-website"
primary = false
fieldGroup = "actions_group"

[[contributors]]
person = "clement-garcia"
roles = [ "Développeur", "Designer" ]
fieldGroup = "contributors_group"

[[galleries]]
title = "Le site"
description = "Captures prises sur le site en ligne."
size = "size-large"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/accueil.webp"
  caption = "L'accueil : un horizon en pixel art animé en fond, et les chiffres du projet lus en direct (version, date, téléchargements, versions de Minecraft)."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/horizon-pixel-art.webp"
  caption = "L'horizon en pixel art de l'accueil, animé en direct sur un canvas : collines, mobs, joueurs et oiseaux jusqu'au lointain."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/concept.webp"
  caption = "Le concept en un schéma : ce que l'on voit sans le mod, puis avec, de la distance de rendu jusqu'à l'horizon."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/avant-apres-illustration.webp"
  caption = "Le comparateur avant / après, ici sur une illustration : un village lointain qui reprend vie."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/avant-apres-cavaliers.webp"
  caption = "Une autre scène du comparateur : des cavaliers sur une crête."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/compatibilite.webp"
  caption = "La compatibilité : Distant Horizons, Voxy, vanilla, et la matrice des 53 builds lue dans la configuration du mod."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/changelog.webp"
  caption = "Le changelog, tiré du fichier du dépôt du mod à chaque visite."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/telechargement.webp"
  caption = "Le téléchargement : on choisit sa version de Minecraft et son loader, le site donne le bon jar et les téléchargements de chaque plateforme."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/living-horizon-website/mobile.webp"
  caption = "Sur téléphone (390 px)."
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

# Living Horizon (site)

Le site d'une page du mod **[Living Horizon](/projects/living-horizon/)**, en ligne sur **[mc-skin-creator.github.io/living-horizon-website](https://mc-skin-creator.github.io/living-horizon-website/)**. Il explique en quelques secondes ce que fait le mod, le montre en avant / après, dit sur quelles versions il fonctionne et donne le bon fichier à télécharger. Site **Angular 22** entièrement statique, déployé sur GitHub Pages, sans serveur ni base de données.

{{< figure src="/images/projects/living-horizon-website/accueil.webp" alt="Accueil du site Living Horizon" caption="L'accueil : l'horizon animé en fond est dessiné en direct sur un canvas." >}}

## Aucune donnée écrite en dur

Tout ce qu'une source peut dire est demandé à cette source :

- **Version, date, fichiers de la release, téléchargements GitHub** : l'API des releases de GitHub (les préversions sont ignorées).
- **Changelog** : le fichier `changelog/en.md` du dépôt du mod.
- **Versions de Minecraft, loaders, versions testées ou à tester** : la configuration de build du mod (`stonecutter.properties.toml`), analysée dans le navigateur.
- **Téléchargements CurseForge et Modrinth** : leurs API respectives (Modrinth affiche « Bientôt » tant que le projet n'existe pas).

La page s'affiche d'abord à partir d'un instantané JSON, puis interroge chaque source depuis le navigateur, avec un cache de 30 minutes (GitHub n'autorise que 60 appels anonymes par heure). Une source qui ne répond pas garde l'instantané, et sans aucun des deux, chaque section a son repli. La CI rafraîchit l'instantané à chaque build et une fois par jour : une nouvelle version du mod apparaît sur le site sans le toucher.

{{< figure src="/images/projects/living-horizon-website/compatibilite.webp" alt="Section compatibilité" caption="La matrice des versions et loaders est lue dans la configuration du mod, avec les builds testés et ceux qui cherchent des testeurs." >}}

## Des illustrations faites avec le jeu

- **Des horizons en pixel art animés**, dessinés sur canvas en basse résolution puis agrandis sans lissage, comme les pixels du jeu. Chaque scène existe en deux états : la vie limitée à la distance de rendu, ou étendue jusqu'à l'horizon. Chaque mouvement est une fonction du temps, donc les deux côtés du comparateur bougent en même temps.
- **Des mobs construits à partir des modèles du jeu.** Un script Python lit chaque modèle dans la méthode du client Minecraft qui le construit, en **rejouant son bytecode** (via `javap`), le pose et le dessine pixel par pixel de sa texture. Rien n'est dessiné à l'œil : chaque cube, pivot et décalage de texture est celui du jeu.
- **Des joueurs faits avec [MC Skin Creator](/projects/mc-skin-creator/)** : les personnages des illustrations sont des skins composés sur mon autre projet, exportés en avatars animés.
- **Un comparateur avant / après** qui s'ouvre sur de vraies captures en jeu, puis sur les illustrations.

{{< image-grid >}}

{{< figure src="/images/projects/living-horizon-website/concept.webp" alt="Schéma du concept" caption="Le concept : sans le mod, le terrain lointain est vide ; avec, il vit." >}}

{{< figure src="/images/projects/living-horizon-website/avant-apres-illustration.webp" alt="Comparateur avant / après" caption="Le comparateur, sur un village lointain." >}}

{{< /image-grid >}}

## Téléchargement et déploiement

La section de téléchargement propose le bon jar selon la version de Minecraft et le loader choisis, avec la version de Java requise et ce dont il dépend, et additionne les téléchargements de toutes les plateformes. Le site est construit par **GitHub Actions** sur chaque pull request et déployé sur **GitHub Pages** à chaque fusion sur `main`. Développé avec **Claude Code**, sur le même flux de branches et de revue que le mod.

{{< figure src="/images/projects/living-horizon-website/telechargement.webp" alt="Section téléchargement" caption="Le bon fichier pour sa version et son loader." >}}

*Projet non officiel. Non approuvé par, ni associé à Mojang ou Microsoft. « Minecraft » est une marque déposée de Mojang Studios.*
