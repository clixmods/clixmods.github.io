---
name: project-description-writing
description: Write, edit or rewrite the presentation of a portfolio project (content/projects/<name>.md and <name>.en.md, also experiences and educations) so that anyone understands it at first read - a plain-language subtitle and description, an opening paragraph that says what it is and why it is interesting, and the technical depth kept for the sections that follow, without jargon up front and without over-promising. Use whenever a project is added or updated, when a project's subtitle, description or body is reworded, and when the user asks to make the projects clearer, simpler or more readable.
---

# Rédiger la présentation d'un projet

Le portfolio est lu par des gens très différents : un recruteur RH qui ne code pas, un
joueur qui a cliqué depuis un lien CurseForge, un ami, un lead technique. La plupart ne
lisent que la carte du projet et la première phrase. **Tout ce qui est au-dessus de la
ligne de flottaison doit être compris par quelqu'un qui n'a jamais ouvert un IDE.** La
technique reste, et elle compte pour un portfolio de développeur, mais elle vient
*après*, à sa place.

Le ton visé : celui d'une bonne fiche de présentation de jeu ou d'application. Sûr de
lui, naturel, concret, concis. On présente ce que le projet fait et ce qu'il apporte,
pas comment le code est rangé.

## Où chaque champ s'affiche

Vérifié dans `themes/portfolio.theme/layouts/` :

| Champ | Où il apparaît | Qui le lit |
|---|---|---|
| `title` | carte, en-tête, onglet | tout le monde |
| `subtitle` | **la carte du projet** (`partials/project-card.html`) et le sous-titre de l'en-tête de la page | tout le monde, en deux secondes |
| `description` | balise meta / aperçu de lien (`partials/head.html`), et carte quand il n'y a pas de `subtitle` | Google, Discord, LinkedIn, recruteurs |
| premier paragraphe du corps | haut de la page projet | quiconque a cliqué |
| sections suivantes (`## Les défis techniques`…) | plus bas | les curieux et les techniques |
| `tags`, `programming_languages`, `frameworks_engines`, `tools`… | pastilles et filtres | les techniques |

Conséquence : le nom des technologies a déjà sa place dans les clés et les pastilles.
Il n'a pas besoin d'encombrer le sous-titre ni la description.

## Étapes

1. Lire les deux fichiers du projet (`<nom>.md` en FR, `<nom>.en.md` en EN) en entier,
   front matter compris, et un projet déjà réécrit pour le ton s'il en existe un.
2. Vérifier chaque fait : ce que fait le projet, pour qui, dans quel cadre (école,
   perso, client, game jam), son état (`status`), les chiffres. Sources : le corps
   actuel, les liens `[[actions]]`, le dépôt si l'utilisateur l'a, l'utilisateur sinon.
   Ne jamais inventer un chiffre, un public ou une fonctionnalité.
3. Écrire le français et l'anglais ensemble, avec les mêmes faits (*Voix*, *Modèles*,
   *Règles*).
4. Ne toucher qu'au texte : `title`, `subtitle`, `description` et le corps. Les clés
   (`lang_*`, `fw_*`, `spec_*`, `skill_*`, `tool_*`), `tags`, `[[actions]]`, `[[galleries]]`,
   `fieldGroup`, `fmContentType`, les dates et les images restent tels quels, sauf
   demande explicite.
5. Relire chaque texte comme quelqu'un qui ne connaît ni le jeu, ni la techno, ni le
   contexte, et le confronter à *Avant de terminer*.
6. Si Hugo est installé, `hugo --gc --minify --environment production` pour vérifier que
   le front matter TOML est toujours valide (guillemets, `+++`).

## Voix

- **Dire littéralement ce que ça fait.** Pas de métaphore ni de formule d'accroche :
  « Mod Minecraft qui fait vivre l'horizon » est joli mais ne dit rien à qui ne connaît
  pas le projet. « Mod Minecraft qui débloque la limite de distance d'affichage
  des créatures et des joueurs, quelle que soit la distance » se comprend tout de suite : on nomme la limite du
  jeu et ce que le projet y change. Des verbes neutres et précis (« affiche »,
  « permet », « débloque ») plutôt que des verbes forts ou imagés (« brise », « fait vivre »). Test : quelqu'un qui lit seulement cette
  ligne peut-il expliquer à un ami ce que fait le projet ?
- **Le résultat d'abord.** Ce que le projet permet, montre ou fait vivre, avant comment
  il est construit. « Un éditeur pour créer son skin Minecraft pièce par pièce », pas
  « API REST et moteur de composition de textures ».
- **Concret.** Des faits qu'on peut se représenter : « affiche les mobs à n'importe
  quelle distance », « une soucoupe volante qui aspire tout, d'une carotte à une
  maison ». Une image n'est acceptable qu'en complément, jamais à la place du fait.
- **Résumer, ne pas énumérer.** « compatible avec les principales versions du jeu et
  plateformes de mods » plutôt que « Fabric, Quilt, NeoForge et Forge, de 1.20 à 26.3 ».
  La liste complète a sa place plus bas.
- **Dire pourquoi c'est intéressant** en une phrase courte quand ce n'est pas évident :
  le problème résolu, ce qui rend le projet différent, ce qu'il a demandé.
- **Calme et factuel.** Pas de points d'exclamation, pas de superlatifs creux
  (« incroyable », « révolutionnaire », « ultra-performant »). Un chiffre vrai convainc
  mieux qu'un adjectif.
- **Pas d'étiquette vide.** « commercial », « professionnel », « personnel », « complet »,
  « avancé » ne disent pas ce qu'est le projet. « Jeu de rôle commercial du studio La
  Moutarde » ne dit rien ; « RPG isométrique sorti sur PC et consoles (PlayStation 5,
  Xbox Series, Nintendo Switch) » dit quel genre de jeu c'est et où y jouer. Le genre,
  la vue et les plateformes sont des faits concrets ; un cadre (studio, école) va
  après le tiret.
- **Voix par endroit.** `subtitle` et `description` : tournure impersonnelle ou nominale.
  Le corps : « je » pour ce que j'ai fait, « nous / l'équipe » pour un projet d'équipe,
  « vous » pour s'adresser au joueur d'un jeu (« vous incarnez… »). En anglais : « I »,
  « we », « you ».

## Modèles

### `subtitle` — la carte

Une ligne de **6 à 18 mots** qui dit *ce que c'est et ce que ça fait*, littéralement,
éventuellement suivie du cadre après un tiret.

```
<nature du projet> qui/pour <ce qu'il fait, concrètement> – <cadre, si utile>
```

- Bon : « Mod Minecraft qui débloque la limite de distance d'affichage des créatures
  et des joueurs, quelle que soit la distance », « Carte Black Ops 3 qui recrée
  Nuketown Zombies, jouable jusqu'à 8 joueurs », « Jeu d'horreur où l'on explore un
  hôpital abandonné avec une lampe qui surchauffe », « Mod Minecraft pour créer et changer son skin sans quitter le jeu »,
  « Jeu où l'on aspire tout avec une soucoupe volante »,
  « Jeu de Blackjack sur ordinateur – IUT Montpellier-Sète »,
  « Carte zombie pour Call of Duty: Black Ops 3 »
- À éviter : « Mod Minecraft qui fait vivre l'horizon » (métaphore), « Nuketown
  revisitée » (ne dit pas ce que c'est), « API Symfony/API Platform & front Vue.js –
  IUT », « Map Remastering », « Jeu cozy » (trop vague seul), un nom de techno seul.

### `description` — l'aperçu de lien

**1 à 2 phrases, 120 à 200 caractères** de préférence (au-delà, Google et les aperçus
coupent). Elle doit tenir debout seule, sans la carte ni la page.

```
<Ce que c'est et ce que ça permet, en mots de tous les jours>. <Ce qui le rend
intéressant, ou le cadre>. (<2–3 technos phares, seulement si elles parlent à un
recruteur.>)
```

Les technos en fin de description sont facultatives : uniquement les noms qu'un
recruteur reconnaît (Unity, Java, Angular, Symfony…), jamais les détails de version, de
build ou de bibliothèque (« Spring Boot 4 », « Stonecutter », « JWT », « jar exécutable »).

### Corps

```
# <Titre>

<Paragraphe d'accroche : 2 à 4 phrases, zéro jargon. Ce que c'est, pour qui, ce que ça
change pour la personne qui l'utilise ou y joue. Le cadre (école, perso, équipe, durée).
Un chiffre de portée s'il y en a un vrai : téléchargements, joueurs, taille d'équipe.>

<Image ou avant / après si le projet en a.>

## Ce que fait le projet / Le jeu / Fonctionnalités
<Liste courte, chaque point commence par un **résultat visible en gras**, puis une phrase.>

## Les défis techniques / Ma contribution
<Ici la technique a toute sa place. Chaque paragraphe ouvre par une phrase que tout le
monde comprend (le problème), puis la solution technique.>

## <Autres sections existantes : CI/CD, outils, IA, équipe…>
```

Le corps existant garde ses sections, ses figures et ses shortcodes (`{{< figure >}}`,
`{{< image-grid >}}`) ; on réécrit la prose, on ne restructure pas sans raison.

## Règles

1. **Aucun jargon au-dessus de la première section technique.** Dans `subtitle`,
   `description` et le paragraphe d'accroche : pas d'acronyme ni de nom d'outil interne
   (API REST, JWT, MVC, UML, CI/CD, Mixin, shader, buffer, loader, mappings, conteneurisé,
   multi-loader, Stonecutter…). Si un terme est indispensable, il est expliqué dans la
   même phrase.
2. **Expliquer le jeu ou le domaine.** Ne pas supposer qu'on connaît Minecraft, Black
   Ops 3, Geometry Wars ou le mode Zombies : une demi-phrase suffit (« un jeu de tir
   en arène où des vagues d'ennemis arrivent de partout »).
3. **Dans les sections techniques, ouvrir par le problème.** « Le jeu cesse d'afficher
   les animaux au-delà de quelques dizaines de mètres. » avant « le client ne reçoit les
   entités que dans un rayon limité ».
4. **Ne jamais exagérer.** Un prototype est un prototype, un projet d'école est un projet
   d'école, une estimation est une estimation. Pas de « complet », « avancé »,
   « professionnel » sans fait derrière.
5. **Garder les chiffres qui donnent l'échelle** (5 500 téléchargements, 53 builds,
   48 h de game jam, équipe de 4, 14 versions du jeu), dans le corps de préférence.
   Pas les numéros de version d'outils dans l'accroche.
6. **Un mot par concept**, en français et en anglais :

   | Terme technique | Français pour tous | English for everyone |
   |---|---|---|
   | render distance | distance d'affichage | render distance / how far the game draws |
   | loaders (Fabric, Forge…) | plateformes de mods | mod platforms |
   | multi-version build | une seule version du code pour toutes les versions du jeu | one codebase for every game version |
   | API REST / back-end | le serveur | the server |
   | front-end | l'interface | the interface |
   | JWT / authentification | connexion sécurisée / comptes utilisateurs | secure sign-in / user accounts |
   | conteneurisé (Docker) | facile à installer et à déployer | easy to install and deploy |
   | CI/CD | tests et publication automatiques | automatic testing and releases |
   | shaders | effets graphiques | visual effects |
   | remake / remaster | nouvelle version / version modernisée | remake / modernised version |
   | map (Call of Duty) | carte | map |
   | MVC, UML | (ne pas citer hors section technique) | (keep for the technical section) |

7. **Ne jamais changer ce que le projet est.** Reformuler et alléger librement, mais
   garder les faits exacts. En cas de doute (rôle exact, public, état), prendre la
   lecture la plus prudente ou demander à l'utilisateur.
8. **FR et EN disent la même chose**, avec le même nombre d'idées. L'anglais n'est pas
   une traduction mot à mot : il doit sonner naturel pour un anglophone.
9. **Guillemets TOML.** Dans un champ entre `"…"`, utiliser les guillemets typographiques
   « » ou ’ plutôt que `"` ; échapper `\"` sinon.

## Avant / après

Brouillons réels du site et ce qu'ils deviennent :

| Champ | Avant | Après |
|---|---|---|
| Living Horizon, `subtitle` | Mod Minecraft multi-loader qui fait vivre l'horizon au-delà de la distance de rendu | Mod Minecraft qui débloque la limite de distance d'affichage des créatures et des joueurs, quelle que soit la distance |
| Living Horizon, `description` | Mod Minecraft pour Fabric, Quilt, NeoForge et Forge, de 1.20 à 26.3 depuis un seul code source compilé avec Stonecutter : animaux, villageois, oiseaux et autres joueurs restent visibles bien au-delà de la distance de rendu… | Mod Minecraft qui affiche les animaux, les villageois, les oiseaux et les autres joueurs à n'importe quelle distance, bien au-delà de la limite où le jeu les fait disparaître. Plus de 5 500 téléchargements la première semaine. |
| MC Skin Creator, `description` | Éditeur de skins Minecraft dans le navigateur : API REST et moteur de composition de textures en Java 21 / Spring Boot 4, front Angular 21 avec rendu 3D WebGL sur mesure, livrés dans un seul jar exécutable | Éditeur en ligne pour créer son skin Minecraft pièce par pièce, avec un aperçu 3D du personnage en temps réel. (Java, Spring Boot, Angular.) |
| Plateforme d'événements, `subtitle` | API Symfony/API Platform & front Vue.js - IUT Montpellier-Sète | Application de gestion d'événements – IUT Montpellier-Sète |
| Plateforme d'événements, `description` | Projet d'étude : application web de gestion d'événements avec API REST sécurisée par JWT (Symfony 6.4 / API Platform 4) et client Vue 3, le tout conteneurisé. | Projet d'étude : une application web pour créer des événements, s'y inscrire et les gérer, avec des comptes utilisateurs sécurisés. (Symfony, Vue.js.) |
| Farm Remastered, `subtitle` | Map Remastering - Black Ops 3 | Version modernisée d'une carte de Black Ops 2, sur Black Ops 3 |
| Section technique, ouverture | Le client ne reçoit les entités que dans un rayon limité. Pour les joueurs, le mod se sert de la *locator bar*… | Le jeu ne dit pas où se trouvent les joueurs éloignés, seulement dans quelle direction. Pour les joueurs, le mod se sert de la *locator bar*… |

Les mêmes, en anglais :

```
subtitle    = "Minecraft mod that unlocks the display distance limit for mobs and players, whatever the distance"
description = "Minecraft mod that shows animals, villagers, birds and other players at any
               distance, far beyond the point where the game normally makes them disappear.
               Over 5,500 downloads in its first week."
```

## Avant de terminer

- Le `subtitle` dit-il littéralement ce qu'est le projet et ce qu'il fait, sans
  métaphore ni nom de techno ? Un inconnu pourrait-il le répéter à un ami ?
- La `description` tient-elle seule, en 1–2 phrases, sous ~200 caractères, sans jargon ?
- Le premier paragraphe du corps est-il compris par quelqu'un qui ne connaît ni le jeu ni
  le code ? Le jeu ou le domaine est-il expliqué ?
- Chaque section technique ouvre-t-elle par le problème, en mots simples ?
- Aucun fait inventé, aucun superlatif sans chiffre, le cadre (école / perso / équipe)
  dit honnêtement ?
- FR et EN alignés, clés et front matter non textuel intacts, TOML valide ?

Donner à l'utilisateur le résultat (les fichiers modifiés), pas un commentaire ligne à
ligne. Signaler un fait ambigu et comment il a été lu.
