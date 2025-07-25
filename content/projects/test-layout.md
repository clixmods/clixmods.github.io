+++
date = "2024-01-01T10:00:00+02:00"
draft = false
title = "Test Layout System"
subtitle = "Démonstration complète du système de boîtes"
description = "Projet de test pour démontrer toutes les tailles et fonctionnalités des boîtes d'information"
tags = [ "Test", "Layout", "Design System" ]
technologies = [ "Hugo", "CSS Grid", "JavaScript" ]
category = "projects"
sector = "test"
featured = false
fmContentType = "project-content-type"
image = "/images/projects/test/test-layout.jpg"

[[actions]]
type = "github"
label = "Voir sur GitHub"
url = "#"
icon = "github"
primary = true

[[notable_facts]]
type = "feature"
icon = "🎨"
value = "Système de <span class='highlight'>grille</span>"
label = "Layout flexible 12 colonnes"
contributors_size = "size-xl"
development_time_size = "size-small"
gallery_size = "size-large"
technical_specs_size = "size-medium"
awards_size = "size-small"
testimonials_size = "size-xl"
youtube_size = "size-large"
youtube_single_size = "size-medium"

[[contributors]]
name = "John Doe"
role = "Lead Designer"
avatar = "/images/people/john-avatar.jpg"

[[contributors]]
name = "Jane Smith"
role = "Frontend Developer"
avatar = "/images/people/jane-avatar.jpg"

[[contributors]]
name = "Bob Wilson"
role = "Backend Developer"

[[contributors]]
name = "Alice Brown"
role = "UI/UX Designer"
avatar = "/images/people/alice-avatar.jpg"

[[contributors]]
name = "Team Alpha"
role = "Quality Assurance"

[[contributors]]
name = "Community Contributors"
role = "Feedback & Testing"

[development_time]
total = "8 mois"
start_date = "Mai 2023"
end_date = "Janvier 2024"

  [[development_time.phases]]
  name = "Recherche & Design"
  duration = "1 mois"

  [[development_time.phases]]
  name = "Prototypage"
  duration = "2 mois"

  [[development_time.phases]]
  name = "Développement"
  duration = "4 mois"

  [[development_time.phases]]
  name = "Tests & Optimisation"
  duration = "1 mois"

[[gallery]]
url = "/images/projects/nuketown/nuketown-1.jpg"
caption = "Interface principale du système"

[[gallery]]
url = "/images/projects/nuketown/nuketown-2.jpg"
caption = "Vue mobile responsive"

[[gallery]]
url = "/images/projects/nuketown/nuketown-3.jpg"
caption = "Dark mode implementation"

[[gallery]]
url = "/images/projects/nuketown/nuketown-4.jpg"
caption = "Animation system"

[[gallery]]
url = "/images/projects/nuketown/nuketown-5.jpg"
caption = "Animation system"

[[gallery]]
url = "/images/projects/nuketown/nuketown-6.jpg"
caption = "Animation system"

[[gallery]]
url = "/images/projects/nuketown/nuketown-7.jpg"
caption = "Animation system"

[[technical_specs]]
label = "Frontend Framework"
value = "Hugo Static Site Generator"

[[technical_specs]]
label = "CSS Architecture"
value = "CSS Grid + Flexbox"

[[technical_specs]]
label = "JavaScript"
value = "Vanilla ES6+"

[[technical_specs]]
label = "Build Tool"
value = "Hugo Pipes"

[[technical_specs]]
label = "Browser Support"
value = "Modern browsers (ES6+)"

[[technical_specs]]
label = "Performance"
value = "95+ Lighthouse score"

[[awards]]
title = "Best Design System"
organization = "Design Awards 2024"
date = "2024"

[[awards]]
title = "Innovation Prize"
organization = "Web Excellence"
date = "2024"

[[testimonials]]
quote = "Ce système de layout est révolutionnaire ! La flexibilité est incroyable et l'implémentation est parfaite. Cela va changer ma façon de concevoir des interfaces."
name = "Sarah Johnson"
role = "Senior UI Designer chez Google"
avatar = "/images/people/sarah-google.jpg"
rating = 5

[[testimonials]]
quote = "En tant que développeur frontend, j'apprécie particulièrement la propreté du code et la performance du système. Excellent travail !"
name = "Mike Chen"
role = "Frontend Lead Developer"
rating = 5

[[testimonials]]
quote = "L'expérience utilisateur est exceptionnelle sur tous les devices. Le responsive design est impeccable."
name = "Lisa Rodriguez"
role = "UX Researcher"
avatar = "/images/people/lisa-ux.jpg"
rating = 4

[[testimonials]]
quote = "Ce projet démontre une maîtrise technique impressionnante. Le système de grille CSS est particulièrement bien pensé."
name = "Alex Kumar"
role = "Technical Architect"
rating = 5

[[testimonials]]
quote = "Perfect implementation of modern design principles. This will be my new reference for layout systems!"
name = "Emma Thompson"
role = "Design System Lead"
avatar = "/images/people/emma-design.jpg"
rating = 5

[[testimonials]]
quote = "La documentation est claire et les exemples sont parfaits. Facile à intégrer dans nos projets existants."
name = "David Kim"
role = "Project Manager"
rating = 4

# Vidéos YouTube de démonstration
[[youtube_videos]]
video_id = "hb-kF-VZvnE"
title = "Présentation du projet Test Layout"
description = "Une démonstration complète du système de layout avec tous les composants et fonctionnalités."
duration = "4:32"
views = "1.2K vues"
date = "il y a 2 jours"

[[youtube_videos]]
video_id = "dQw4w9WgXcQ"
title = "Tutorial - Configuration avancée"
description = "Apprenez à configurer et personnaliser le système selon vos besoins spécifiques."
duration = "7:45"
views = "856 vues"
date = "il y a 1 semaine"

[[youtube_videos]]
video_id = "jNQXAC9IVRw"
title = "Responsive Design - Best Practices"
description = "Découvrez les meilleures pratiques pour un design responsive optimal sur tous les appareils."
duration = "5:18"
views = "2.1K vues"
date = "il y a 3 jours"

# Vidéo YouTube unique
[youtube_single]
video_id = "hb-kF-VZvnE"
title = "Démonstration en direct du système"
duration = "4:32"

+++

# Test Layout System

*Démonstration complète du nouveau système de boîtes d'information avec toutes les tailles et fonctionnalités.*

Ce projet de test présente l'ensemble des fonctionnalités du système de layout développé pour le portfolio. Il sert de référence pour valider tous les cas d'usage et tailles de boîtes.

## Fonctionnalités testées

### Système de tailles
- **size-small** : Boîtes compactes (3 colonnes)
- **size-medium** : Taille standard (4 colonnes) 
- **size-large** : Boîtes proéminentes (6 colonnes)
- **size-xl** : Showcase complet (8 colonnes)

### Aperçus spéciaux
- **Contributeurs** : Avatars superposés avec compteur
- **Galerie** : Carousel automatique d'images
- **Testimonials** : Rotation automatique des commentaires
- **YouTube** : Aperçu avec lecteur modal intégré

### Responsive design
- **Desktop** : Grid 12 colonnes
- **Tablette** : Grid 8 colonnes
- **Mobile** : Colonne unique

## Configuration du test

```yaml
contributors_size: "size-xl"
development_time_size: "size-small"
gallery_size: "size-large"
technical_specs_size: "size-medium"
awards_size: "size-small"
testimonials_size: "size-xl"
youtube_size: "size-large"
```

Ce test valide le bon fonctionnement de toutes les combinaisons possibles.
