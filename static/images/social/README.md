# Social Icons

Ce dossier contient les icônes SVG officielles des réseaux sociaux pour remplacer les émojis.

## Icônes disponibles

- **GitHub** (`github.svg`) - Icône officielle GitHub
- **LinkedIn** (`linkedin.svg`) - Icône officielle LinkedIn  
- **Discord** (`discord.svg`) - Icône officielle Discord
- **Email** (`email.svg`) - Icône générique pour email
- **Website** (`website.svg`) - Icône globale pour site web
- **Twitter/X** (`twitter.svg`) - Icône officielle X (anciennement Twitter)
- **Instagram** (`instagram.svg`) - Icône officielle Instagram
- **YouTube** (`youtube.svg`) - Icône officielle YouTube
- **External Link** (`external-link.svg`) - Icône générique pour lien externe

## Utilisation

Ces icônes sont automatiquement utilisées dans :

1. **Modales de profils** - Les icônes remplacent les émojis dans les boutons de contact des profils utilisateurs
2. **Top dock** - Les icônes sont déjà configurées en SVG
3. **Liens sociaux** - Via la configuration dans `data/config.json`

## Format

Toutes les icônes suivent le format Simple Icons (https://simpleicons.org/) :
- Viewbox : `0 0 24 24`
- Format SVG optimisé
- Support du `fill="currentColor"` pour l'adaptation aux thèmes
- Titre accessible intégré

## Ajout d'une nouvelle icône

Pour ajouter une nouvelle icône :

1. Créer le fichier SVG dans ce dossier
2. Mettre à jour la configuration dans `data/config.json` si nécessaire
3. Ajouter les styles CSS correspondants si requis
4. Mettre à jour cette documentation
