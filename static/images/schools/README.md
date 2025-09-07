# Logos d'écoles

Ce dossier contient les logos des institutions d'enseignement pour les formations.

## Format recommandé
- **Format** : PNG ou SVG
- **Taille** : 64x64px minimum (jusqu'à 512x512px)
- **Fond** : Transparent de préférence
- **Nom** : Nom de l'école en minuscules avec tirets (ex: `iut-montpellier.png`)

## Utilisation dans les formations

Ajouter le champ `school_logo` dans le frontmatter :

```yaml
---
title: "BUT Intégration d'applications"
institution: "IUT Montpellier-Sète"
school_logo: "/images/schools/iut-montpellier.png"
icon: "💻"  # Fallback si le logo n'est pas trouvé
---
```

## Priorité d'affichage
1. **school_logo** (si défini) - Logo de l'école
2. **icon** (si pas de logo) - Émoji de fallback

## Exemples de noms de fichiers
- `iut-montpellier.png` - IUT Montpellier-Sète
- `universite-paul-valery.png` - Université Paul Valéry
- `e-artsup.png` - e-artsup
- `epitech.png` - Epitech
- `supinfo.png` - Supinfo
