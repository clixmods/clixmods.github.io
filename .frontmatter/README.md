# Configuration Front Matter CMS - Structure Split

Ce dossier contient la configuration Front Matter CMS divisée en plusieurs fichiers pour une meilleure maintenabilité.

## Structure

```
.frontmatter/
├── config/
│   ├── content/
│   │   └── pagefolders/         # Dossiers de contenu
│   │       ├── posts.json
│   │       ├── projects.json
│   │       ├── people.json
│   │       ├── experiences.json
│   │       └── educations.json
│   ├── data/
│   │   └── files/               # Configuration des fichiers de données
│   │       ├── profile.json
│   │       ├── testimonials.json
│   │       ├── programming_languages_simple.json
│   │       ├── frameworks_engines_simple.json
│   │       ├── specialties.json
│   │       ├── soft_skills.json
│   │       └── tools.json
│   └── taxonomy/
│       ├── contenttypes/        # Types de contenu
│       │   ├── default.json
│       │   ├── projects-index.json
│       │   ├── project-content-type.json
│       │   ├── person-content-type.json
│       │   ├── experience-content-type.json
│       │   └── education-content-type.json
│       └── fieldgroups/         # Groupes de champs
│           ├── actions_group.json
│           ├── notable_facts_group.json
│           ├── contributors_group.json
│           ├── phases_group.json
│           ├── galleries_group.json
│           ├── gallery_group.json
│           ├── youtube_videos_group.json
│           ├── youtube_galleries_group.json
│           ├── youtube_singles_group.json
│           ├── technical_specs_group.json
│           ├── awards_group.json
│           ├── testimonials_group.json
│           ├── projects_group.json
│           └── years_detail_group.json
```

## Avantages de cette approche

1. **Maintenabilité améliorée** : Chaque type de contenu et groupe de champs est dans son propre fichier
2. **Navigation plus facile** : Plus besoin de chercher dans un fichier de 1900+ lignes
3. **Collaboration facilitée** : Les conflits de merge sont réduits
4. **Organisation logique** : Structure hiérarchique claire par catégorie

## Migration effectuée

- ✅ **Content Types** → `.frontmatter/config/taxonomy/contenttypes/`
- ✅ **Field Groups** → `.frontmatter/config/taxonomy/fieldgroups/`
- ✅ **Data Files** → `.frontmatter/config/data/files/`
- ✅ **Page Folders** → `.frontmatter/config/content/pagefolders/`
- ✅ **Configuration principale** → `frontmatter.json` (simplifié)

## Fichiers de sauvegarde

- `frontmatter.backup.json` : Copie de l'ancien fichier monolithique (pour référence)

## Utilisation

Front Matter CMS détecte automatiquement ces fichiers et applique la configuration. Aucune action supplémentaire n'est requise.

Pour modifier un type de contenu, éditez directement le fichier JSON correspondant dans la structure ci-dessus.