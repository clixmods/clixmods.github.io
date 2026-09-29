+++
date = "2026-09-29T10:00:00+02:00"
draft = false
title = "MC Skin Creator (mod)"
slug = "mc-skin-creator-mod"
subtitle = "Mod Fabric : l'éditeur de skins directement dans Minecraft"
description = "Mod Fabric côté client qui embarque l'éditeur de MC Skin Creator dans Minecraft : catalogue de pièces, calques, aperçu 3D en jeu et application du skin sur le compte, pour Minecraft 1.21.11 et 26.2 depuis un seul code source"
tags = [
  "Java",
  "Fabric",
  "Modding",
  "Minecraft",
  "Mixin",
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
image = "/images/projects/mc-skin-creator-mod/vue-en-jeu.webp"
programming_languages = [ "lang_java" ]
frameworks_engines = [ "fw_fabric" ]
specialties = [
  "spec_modding",
  "spec_interface_utilisateur",
  "spec_experience_utilisateur_ux",
  "spec_architecture_logicielle",
  "spec_securite_et_optimisation"
]
soft_skills = [
  "skill_resolution_problemes",
  "skill_creativite"
]
tools = [ "tool_gradle", "tool_junit", "tool_github_actions", "tool_github", "tool_claude" ]

[[actions]]
type = "github"
label = "Voir sur GitHub"
url = "https://github.com/MC-Skin-Creator/mcskincreator-mod"
primary = true
fieldGroup = "actions_group"

[[actions]]
type = "website"
label = "Télécharger sur Modrinth"
url = "https://modrinth.com/project/pYSOnbJQ"
primary = false
fieldGroup = "actions_group"

[[contributors]]
person = "clement-garcia"
roles = [ "Développeur", "Designer" ]
fieldGroup = "contributors_group"

[[galleries]]
title = "Le mod en jeu"
description = ""
size = "size-large"
fieldGroup = "galleries_group"

  [[galleries.images]]
  url = "/images/projects/mc-skin-creator-mod/editeur.webp"
  caption = "L'éditeur ouvert dans Minecraft : bibliothèque de pièces, aperçu 3D et pile de calques avec leurs réglages."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/mc-skin-creator-mod/vue-en-jeu.webp"
  caption = "Vue « En jeu » : le vrai personnage, dessiné dans le monde par le moteur de Minecraft, ici sous shader pack."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/mc-skin-creator-mod/menu-titre.webp"
  caption = "Un bouton Skin Creator sur l'écran-titre, à côté du personnage du compte."
  fieldGroup = "gallery_group"

  [[galleries.images]]
  url = "/images/projects/mc-skin-creator-mod/menu-pause.webp"
  caption = "Le même bouton dans le menu pause, en pleine partie."
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

# MC Skin Creator (mod)

Le mod **MC Skin Creator** apporte l'éditeur de skins du site **[mcskincreator.app](https://mcskincreator.app/)** directement dans Minecraft. Un bouton sur l'écran-titre et le menu pause ouvre l'éditeur : on choisit des pièces (cheveux, visages, vêtements, accessoires…), on les empile en calques, on voit le résultat sur son personnage puis on l'applique sur son compte Minecraft en un clic, sans redémarrer le jeu. Mod Fabric côté client uniquement, pour Minecraft 1.21.11 et 26.2 ; projet personnel mené seul, en source disponible.

## Comment ça fonctionne

**Le site et le mod partagent le même back-end.** Le mod n'embarque aucun asset : tout le catalogue de pièces vient de l'API du site (Java / Spring Boot), la même que celle qui alimente l'éditeur web. Un skin composé dans le jeu est donc fait des mêmes éléments, avec les mêmes crédits et les mêmes noms traduits, et un nouvel élément ajouté au catalogue apparaît dans le jeu sans mise à jour du mod.

- **Une API figée pour les clients installés.** Le back-end expose deux préfixes : `/api/…`, propre au front du site et libre de changer, et `/api/v1/…`, un contrat gelé où l'on ajoute des routes et des champs sans jamais en retirer. Le mod n'appelle que `/api/v1`, et seulement des routes de lecture (catalogue, atlas, recherche, provenance d'un élément, rendu de face) : un joueur peut avoir dix versions de retard et le mod continue de marcher.
- **Des planches plutôt que des milliers d'images.** Le catalogue est servi par catégorie sous forme de planches de sprites ; le mod en découpe les miniatures de la bibliothèque, au lieu de faire une requête par pièce. Les deux cents modèles et tenues prêts à l'emploi sont composés de la même façon en local, sans demander deux cents rendus au serveur.
- **Un moteur de composition partagé, pas recopié.** Transformer une pile de calques en texture 64×64 existait déjà en trois versions (référence JavaScript, TypeScript du navigateur, Java du serveur), tenues ensemble par des tests octet par octet. Plutôt que d'en écrire une quatrième, j'ai extrait ce calcul du site dans une bibliothèque Java sans dépendance, `mcsc-engine`, embarquée dans le jar du mod. La parité n'est plus un test : c'est le même bytecode, donc le skin du jeu est celui du site.
- **Composition dans le jeu, pas par HTTP.** Un aller-retour réseau à chaque changement était tenable pour une rafale de clics, pas pour un curseur qu'on fait glisser. Le mod compose localement en une fraction d'image, et l'aperçu suit la pile en direct ; l'API ne sert plus que des données.
- **Un format de projet identique à celui du serveur.** La pile de calques s'écrit dans le format que valide le back-end (une seule classe l'écrit et le lit, avec un test par règle), ce qui évite deux représentations qui dériveraient. Les skins enregistrés sont de simples fichiers dans le dossier de config du jeu ; le mod ne stocke rien sur le serveur et n'identifie pas l'installation.
- **Toujours un projet en cours.** Fermer et rouvrir l'éditeur remet la pile exactement comme elle était. À la première ouverture, le skin du compte est comparé aux modèles du catalogue pour repartir de celui qui correspond ; si le skin du compte change ailleurs, le projet courant est mis de côté dans la bibliothèque et un nouveau démarre.

**Appliquer le skin.** Le skin est envoyé à Mojang (bras classiques ou fins) depuis une seule classe, vers un seul point d'accès, sur un clic et jamais automatiquement : le jeton de session n'est ni journalisé ni écrit sur le disque, et n'est accessible qu'à ce paquetage. Comme le profil du client n'est pas rafraîchi avant une reconnexion, le mod fait porter au joueur le skin envoyé dès la réussite de l'envoi, pour qu'il le voie tout de suite au lieu de croire à un échec.

## Défis techniques côté Minecraft

- **Un seul code source, deux générations du jeu.** Stonecutter compile le même arbre de sources pour 1.21.11 (Java 21) et 26.2 (Java 25, mappings officiels Mojang) : 26.x a remplacé le dessin immédiat de l'interface par une extraction d'état de rendu. Tout le dessin passe par un seul objet (`Canvas`), seul fichier de l'interface à connaître une version du jeu, et les écarts restent de petites branches versionnées, jamais un test de version à l'exécution.
- **Une interface faite avec les sprites du jeu.** L'éditeur reprend la disposition du site mais peint avec les boutons, cases et polices de Minecraft : un resource pack qui restyle le jeu restyle aussi l'éditeur. Comme l'interface ne touche jamais le client Minecraft directement, elle peut être rendue en image dans les tests, avec la vraie police extraite du jar, sans lancer le jeu.
- **Voir son skin dans le monde.** La vue « En jeu » dessine le vrai personnage dans le monde, sous la lumière du jeu et sous un shader pack. Le moteur ne dessine le joueur local que s'il est la caméra : j'ai donc utilisé la troisième personne du jeu, orbite comprise. L'animation du personnage passe par un mixin sur l'état de rendu, qui ne modifie qu'une image sur ce client, alors que modifier l'entité aurait été de l'état de jeu envoyé au serveur.
- **Trois mixins, pas un de plus.** Un seul pour porter le skin envoyé avant que Mojang le propage, un pour poser le personnage dans le monde, un pour masquer le HUD sans cacher le bras en première personne. Chacun est justifié dans le dépôt et vérifié dans le bytecode des deux versions, y compris le remappage des descripteurs.

## Qualité et livraison

Tests JUnit 5 sur la logique pure (pile de calques et historique, composition, document de projet, lecture du catalogue). Pipeline GitHub Actions avec un job par version de Minecraft sur chaque pull request, versionnage sémantique calculé à partir des commits conventionnels, publication automatique des jars sur GitHub et Modrinth.

*Projet non officiel. Non approuvé par, ni associé à Mojang ou Microsoft. « Minecraft » est une marque déposée de Mojang Studios.*
