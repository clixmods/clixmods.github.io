# Configuration des badges de technologie

Ce document explique comment configurer les badges de technologie affichés dans la section projets du portfolio.

## Configuration des technologies

Les badges de technologie sont maintenant configurables via le fichier `data/technologies.yml`. Chaque technologie peut être personnalisée avec les propriétés suivantes :

### Structure du fichier technologies.yml

```yaml
technologies:
  - name: "React"          # Nom de la technologie (requis)
    icon: "🔵"            # Icône emoji (requis)
    color: "#61DAFB"      # Couleur en hexadécimal (optionnel)
    enabled: true         # Afficher dans les filtres (requis)
    order: 1              # Ordre d'affichage (requis)
```

### Propriétés disponibles

- **name** (string, requis) : Le nom de la technologie tel qu'il apparaîtra dans les badges
- **icon** (string, requis) : L'emoji qui précédera le nom de la technologie
- **color** (string, optionnel) : Couleur de surbrillance en hexadécimal (ex: #61DAFB)
- **enabled** (boolean, requis) : Détermine si cette technologie apparaît dans les filtres
- **order** (number, requis) : Ordre d'affichage des badges (croissant)

## Gestion via Front Matter CMS

Les technologies peuvent être gérées directement via l'interface Front Matter :

1. Ouvrir l'interface Front Matter
2. Aller dans "Data Files" > "Technologies Data"
3. Modifier, ajouter ou supprimer des technologies
4. Sauvegarder les modifications

## Correspondance avec les projets

Pour qu'une technologie soit filtrée correctement, elle doit correspondre exactement au nom utilisé dans le fichier `data/projects.yml` :

```yaml
projects:
  - title: "Mon Projet"
    technologies: ["React", "TypeScript"]  # Ces noms doivent correspondre à ceux dans technologies.yml
```

## Fonctionnalités

- **Filtrage automatique** : Les badges filtrent automatiquement les projets selon les technologies
- **Couleurs personnalisées** : Chaque technologie peut avoir sa propre couleur de surbrillance
- **Ordre configurable** : L'ordre d'affichage est entièrement personnalisable
- **Activation/désactivation** : Les technologies peuvent être désactivées sans les supprimer

## Exemples d'utilisation

### Ajouter une nouvelle technologie

```yaml
- name: "Vue.js"
  icon: "🟢"
  color: "#4FC08D"
  enabled: true
  order: 8
```

### Désactiver temporairement une technologie

```yaml
- name: "Angular"
  icon: "🔴"
  color: "#DD0031"
  enabled: false  # Ne s'affichera pas dans les filtres
  order: 9
```

### Réorganiser l'ordre d'affichage

Modifiez simplement la propriété `order` pour changer l'ordre d'affichage des badges.

## Notes techniques

- Les couleurs sont appliquées dynamiquement via CSS custom properties
- La fonction JavaScript `initializeTechBadgeColors()` convertit les couleurs hex en RGB
- Le filtrage fonctionne en comparant les noms exacts entre technologies.yml et projects.yml
