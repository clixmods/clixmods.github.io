+++
date = "2026-09-07T10:00:00+02:00"
draft = false
title = "MC Skin Creator"
slug = "mc-skin-creator"
subtitle = "Créateur de skins Minecraft 100 % dans le navigateur"
description = "Application web sans serveur ni dépendance : catalogue de 703 éléments superposables en calques, éditeur de pixels, moteur 3D WebGL et encodeur GIF écrits à la main"
tags = [
  "JavaScript",
  "WebGL",
  "Site Statique",
  "Zéro Dépendance",
  "Cloudflare Workers"
]
category = "projects"
sector = "appsweb-personnel"
featured = true
featuredInCV = false
fmContentType = "project-content-type"
status = "En production"
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
label = "Voir le site"
url = "https://mcskincreator.app/"
primary = true
fieldGroup = "actions_group"

[[contributors]]
person = "clement-garcia"
roles = [ "Développeur", "Designer" ]
fieldGroup = "contributors_group"

[[galleries]]
title = "L'application"
description = ""
size = "size-large"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/mc-skin-creator/vue-3d-texture.webp"
  caption = "Aperçu 3D et texture côte à côte : ce qu'on peint apparaît immédiatement sur le personnage."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/mc-skin-creator/editeur-pixels.webp"
  caption = "L'éditeur de pixels sur la texture 64×64, avec grille, contours des faces et mode miroir."
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

## Description du projet

> *"Composer un skin Minecraft comme on s'habille : en empilant des vêtements, pas en repeignant des pixels un par un."*

**MC Skin Creator** est un créateur de skins Minecraft qui tourne **entièrement dans le navigateur**, en ligne sur **[mcskincreator.app](https://mcskincreator.app/)**. Pas de compte, pas de téléchargement, pas de serveur applicatif : la page charge son catalogue et tout se passe ensuite côté client.

Le projet part d'un constat simple. Les éditeurs de skins existants demandent soit de peindre une texture 64×64 pixel par pixel, soit de choisir un skin tout fait sans pouvoir le modifier. Ici, un skin est une **pile de calques** : une peau, des cheveux, des yeux, un haut, un pantalon, des chaussures — chacun restant modifiable, déplaçable et recolorable après coup.

C'est un **projet personnel**, développé seul, de la conception du produit jusqu'à la mise en ligne.

## Le parti pris technique : zéro dépendance

Le site est du **HTML, CSS et JavaScript ES5 servis tels quels** : pas de framework, pas de bundler, pas de transpilation, pas de back-end, et **aucune dépendance externe** — ni CDN, ni police distante, ni appel réseau vers un tiers. Chaque fichier est une IIFE qui publie un global, et l'ordre des `<script>` de la page fait office de graphe de dépendances.

Cette contrainte a une conséquence directe : **tout ce que le site fait, il a fallu l'écrire**. Le moteur 3D, l'encodeur GIF, le minifieur et la suite de tests sont tous du code du dépôt.

**Impact** : une page qui se charge sans réseau tiers, qui reste lisible et débogable dix ans plus tard, et dont aucune faille ne peut arriver par une mise à jour de dépendance.

## Mes contributions

### Un pipeline de données unique, du PNG à la texture

Tout le rendu converge vers **un seul tampon RGBA 64×64**, la texture du skin :

- chaque élément du catalogue est un **PNG 64×64 transparent**, chargé une fois au démarrage et mis en cache ;
- un calque le recopie, le **recolore**, puis lui applique ses réglages de teinte, saturation et luminosité ;
- la composition des calques produit la texture finale, envoyée à la fois à la **texture WebGL** et au **canvas 2D zoomé** de l'éditeur.

La recomposition passe par un **drapeau `dirty`** et n'a lieu **qu'une fois par frame**, ce qui permet de dessiner au pixel sans recomposer à chaque trait.

### La carte des zones colorables

Faire des éléments des images plutôt que du code posait un problème : on perd les **sélecteurs de couleur** (la gemme d'une couronne, la semelle d'une basket…).

**Solution technique** :
- chaque PNG est accompagné d'une **carte donnant, pour chaque pixel, la clé de couleur dont il dépend**, encodée en RLE et **omise quand elle est triviale** ;
- le générateur la déduit tout seul, en rendant chaque élément **deux fois par clé** avec deux couleurs très différentes : tout pixel qui bouge dépend de cette clé ;
- à la recoloration, chaque pixel reçoit l'**écart TSL** entre sa couleur par défaut et la couleur choisie.

**Impact** : on repeint une partie d'un élément **en conservant ses ombres, ses dégradés et son grain** — là où un simple remplissage les aurait effacés.

### Moteur 3D WebGL écrit à la main

**Solution technique** :
- **WebGL 1 sans librairie** : un VBO par couple partie/calque, 36 sommets, 12 appels de dessin ;
- **deux passes** — la base, puis le calque externe dilaté, **trié de l'arrière vers l'avant** pour que l'opacité partielle reste correcte ;
- **sélection par rendu hors écran** (le texel est encodé dans la couleur, rendu dans un FBO) : c'est ce qui permet de **peindre directement sur le modèle 3D** ;
- un même chemin de rendu hors écran alimente **l'aperçu, l'export PNG, le GIF et la planche de sprites** — ce qu'on voit est exactement ce qu'on exporte ;
- une **vue à la première personne** dont le cadrage a été **ajusté numériquement** sur une capture du jeu, par descente de coordonnées sur l'erreur quadratique, plutôt qu'estimé à l'œil.

### Encodeur GIF animé, également écrit à la main

**Solution technique** :
- GIF89a complet : histogramme sur toutes les images, **quantification median-cut**, table de couleurs globale, **LZW conforme** ;
- index 255 réservé au transparent et méthode d'élimination adaptée, pour éviter les traînées sur fond transparent ;
- l'animation varie sur **exactement une période de la pose**, ce qui donne un bouclage sans raccord visible.

**Impact** : export d'un GIF du personnage qui tourne, sans service externe ni upload.

### Générateur d'assets et modèles de départ

Les 703 éléments ne sont pas dessinés à la main : un **générateur Node** les produit à partir d'un **DSL de dessin** qui masque complètement les coordonnées UV — un preset décrit une face d'un pavé, pas un rectangle de texels.

Les **modèles de départ** viennent, eux, du **découpage de textures de référence** en calques ordinaires du catalogue, sous deux invariants vérifiés à chaque build :
- le découpage est **exhaustif et exclusif** — superposer les morceaux redonne la texture d'origine **au pixel près** ;
- on ne rebouche un morceau **que là où un morceau plus haut le recouvre**, donc ce qui est inventé est caché par construction.

Le rebouchage réfléchit le motif en miroir, reprend le voisin immédiat, et reconstruit au besoin **un corps de référence recalé face par face** — c'est ce qui fait que retirer un haut ne troue pas le torse. L'**ombre portée** par un vêtement, elle, lui est rendue et convertie en **noir semi-transparent dont l'opacité est mesurée aux moindres carrés**, sans quoi le vêtement traînerait le teint de son propriétaire d'origine sur toutes les carnations.

### Qualité : tests, garde-fous et mise en ligne

**Solution technique** :
- une **suite de tests maison** (~130 tests, sans dépendance) rejouée **en Node dans un bac à sable `vm`** et **dans le navigateur**, où l'application entière est pilotée par son interface réelle dans une iframe ;
- des invariants surveillés en continu : aucune zone UV ne se chevauche, les trois langues portent exactement les mêmes clés, chaque animation boucle sur sa période, la sérialisation ne perd aucune propriété de calque ;
- un **minifieur écrit dans le dépôt** (−17 %), qui ne renomme rien et **relit chaque fichier produit** — comparaison des jetons puis recompilation — pour refuser de publier du code abîmé ;
- une **empreinte de contenu dans les URL**, parce qu'un en-tête de cache ne répare pas un cache déjà constitué ;
- une mise en ligne sur **Cloudflare Workers**, choisie sur un chiffre précis : le site réclame **~775 requêtes par visite froide**, et c'est ce nombre — pas les octets — qui écarte les offres concurrentes.

### Internationalisation

**Solution technique** : trois langues (français, anglais, espagnol) couvrant l'interface **et les 703 noms d'éléments**, avec repli systématique sur le français, choix mémorisé, forçage par URL et **recherche acceptant les trois langues à la fois**.

## Conclusion

**MC Skin Creator** est le projet où j'ai poussé le plus loin l'idée d'**écrire soi-même ce qu'on utilise** : rendu 3D, encodage GIF, génération d'assets, minification, tests. La contrainte « zéro dépendance » n'était pas une coquetterie — c'est elle qui a rendu chaque brique compréhensible, mesurable et remplaçable.

*Projet non officiel. Non approuvé par, ni associé à Mojang ou Microsoft. « Minecraft » est une marque déposée de Mojang Synergies AB.*
