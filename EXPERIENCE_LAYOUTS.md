# Configuration des Layouts d'Expérience

Ce document explique comment configurer l'affichage des projets dans la section expériences du portfolio.

## Fonctionnalité

Depuis la mise à jour, le choix du layout d'affichage des projets dans les expériences n'est plus accessible aux utilisateurs sur le site. Il est maintenant configuré directement dans les fichiers markdown des expériences via le frontmatter.

## Configuration

### Dans le frontmatter des expériences

Ajoutez le champ `projects_layout` dans le frontmatter de vos fichiers d'expérience :

```yaml
---
title: Développeur C# / Unity
company: Studio La Moutarde
# ... autres champs ...
projects_layout: horizontal  # ou "vertical"
projects:
  - role_description: Description du projet
    project_ref: nom-du-projet
    fieldGroup: projects_group
---
```

### Options disponibles

- **`horizontal`** (par défaut) : Affichage en grille avec tuiles carrées
- **`vertical`** : Affichage en liste avec tuiles rectangulaires

### Configuration dans frontmatter.json

Le champ est déjà configuré dans `frontmatter.json` avec les options suivantes :

```json
{
  "title": "projects_layout",
  "name": "projects_layout",
  "type": "choice",
  "choices": ["horizontal", "vertical"],
  "default": "horizontal"
}
```

## Avantages

- **Configuration par expérience** : Chaque expérience peut avoir son propre layout selon le contenu
- **Interface simplifiée** : Les utilisateurs ne voient plus les contrôles de changement de layout
- **Cohérence visuelle** : Le layout est déterminé en amont selon la nature des projets
- **Maintenabilité** : Configuration centralisée dans les fichiers markdown

## Exemple d'usage

### Layout horizontal (grille)
Idéal pour des projets visuels avec des images importantes :
```yaml
projects_layout: horizontal
```

### Layout vertical (liste)
Idéal pour des projets avec plus de texte descriptif :
```yaml
projects_layout: vertical
```

## Migration

Les expériences existantes qui n'ont pas le champ `projects_layout` utilisent automatiquement la valeur par défaut `horizontal`.
