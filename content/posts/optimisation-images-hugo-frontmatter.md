+++
title = "Optimiser automatiquement vos images statiques avec Hugo : Module Mounts et WebP"
date = 2025-10-08
draft = true
description = "Comment transformer vos images statiques en ressources Hugo optimisées sans toucher à votre workflow FrontMatter CMS. Découvrez la technique des module mounts pour convertir automatiquement vos images en WebP."
image = "/images/posts/hugo-image-optimization/hero.jpg"
category = "tech"
tags = [
  "Hugo",
  "Performance",
  "WebP",
  "Optimisation",
  "FrontMatter CMS"
]
+++

# Le problème : Images statiques vs Optimisation Hugo

Si vous utilisez **Hugo** avec **FrontMatter CMS**, vous avez probablement déjà rencontré ce dilemme :

- 📁 **FrontMatter CMS** ne lit que le dossier `static/` pour les images
- 🚀 **Hugo** ne peut optimiser que les images dans `assets/` comme ressources
- 🤔 Déplacer toutes les images casserait votre workflow CMS

Résultat ? Des images lourdes, non optimisées, qui ralentissent votre site.

## La solution : Module Mounts

Grâce aux **module mounts** de Hugo, on peut faire croire à Hugo que notre dossier `static/images` est en fait un dossier `assets/images`, **sans déplacer aucun fichier** !

### Configuration Hugo (`hugo.toml`)

Ajoutez cette section à votre `hugo.toml` :

```toml
# Module mounts - Allow Hugo to process static images as resources
[module]
  [[module.mounts]]
    source = "static/images"
    target = "assets/images"
  [[module.mounts]]
    source = "static"
    target = "static"
  [[module.mounts]]
    source = "assets"
    target = "assets"
```

**Explications :**
1. Le premier mount fait le pont : `static/images` → `assets/images`
2. Le deuxième mount préserve l'accès statique classique
3. Le troisième mount conserve le comportement normal du dossier `assets`

⚠️ **Important** : Placez cette section **après** la configuration des langues pour éviter les problèmes d'ordre de chargement.

## Créer un helper réutilisable

Créez un partial `layouts/_partials/get-optimized-image.html` :

```go-html-template
{{/*
  Partial helper for optimized image processing with WebP conversion
  
  Parameters (pass as dict):
  - imagePath: string - Path to the image (e.g., "/images/project.jpg")
  - width: int - Target width in pixels (default: 800)
  - quality: int - WebP quality 1-100 (default: 85)
  - format: string - Output format: "webp", "jpg", "png" (default: "webp")
  
  Returns a dict with:
  - src: string - URL of the optimized image
  - width: int - Width of the image (0 if not processed)
  - height: int - Height of the image (0 if not processed)
  - isResource: bool - true if processed as Hugo resource
*/}}

{{- $imagePath := .imagePath | default "" -}}
{{- $targetWidth := .width | default 800 -}}
{{- $quality := .quality | default 85 -}}
{{- $format := .format | default "webp" -}}

{{- $result := dict "src" "" "width" 0 "height" 0 "isResource" false -}}

{{- if $imagePath -}}
    {{/* Clean up the image path */}}
    {{- $cleanPath := strings.TrimPrefix "/" $imagePath -}}
    {{- $cleanPath = strings.TrimPrefix "images/" $cleanPath -}}
    {{- $resourcePath := printf "images/%s" $cleanPath -}}
    
    {{/* Try to get as Hugo resource */}}
    {{- $imgResource := resources.Get $resourcePath -}}
    
    {{- if $imgResource -}}
        {{- $ext := path.Ext $cleanPath -}}
        
        {{/* Skip processing for SVG (vector format) */}}
        {{- if eq $ext ".svg" -}}
            {{- $result = dict "src" ($imagePath | relURL) "width" 0 "height" 0 "isResource" false -}}
        
        {{/* If already in target format and format is webp, use as-is */}}
        {{- else if and (eq $format "webp") (eq $ext ".webp") -}}
            {{- $result = dict "src" ($imagePath | relURL) "width" 0 "height" 0 "isResource" false -}}
        
        {{/* Process and convert the image */}}
        {{- else -}}
            {{- $resizeSpec := "" -}}
            {{- if eq $format "webp" -}}
                {{- $resizeSpec = printf "%dx webp q%d" $targetWidth $quality -}}
            {{- else if eq $format "original" -}}
                {{- $resizeSpec = printf "%dx" $targetWidth -}}
            {{- else -}}
                {{- $resizeSpec = printf "%dx %s q%d" $targetWidth $format $quality -}}
            {{- end -}}
            
            {{/* Try to resize, with error handling */}}
            {{- with $imgResource.Resize $resizeSpec -}}
                {{- $result = dict "src" .RelPermalink "width" .Width "height" .Height "isResource" true -}}
            {{- else -}}
                {{/* Fallback if resize fails */}}
                {{- $result = dict "src" ($imagePath | relURL) "width" 0 "height" 0 "isResource" false -}}
            {{- end -}}
        {{- end -}}
    {{- else -}}
        {{/* Resource not found, use static path as fallback */}}
        {{- $result = dict "src" ($imagePath | relURL) "width" 0 "height" 0 "isResource" false -}}
    {{- end -}}
{{- end -}}

{{- return $result -}}
```

## Utilisation dans vos templates

### Exemple 1 : Image de projet

```go-html-template
{{- $imagePath := $project.Params.image | default "images/placeholder-project.jpg" -}}
{{- $optimizedImage := partial "get-optimized-image.html" (dict "imagePath" $imagePath "width" 800 "quality" 85) -}}

<img src="{{ $optimizedImage.src }}" 
     alt="{{ $project.Title }}"
     {{- if and $optimizedImage.isResource (gt $optimizedImage.width 0) }} 
     width="{{ $optimizedImage.width }}"
     {{- end -}}
     {{- if and $optimizedImage.isResource (gt $optimizedImage.height 0) }} 
     height="{{ $optimizedImage.height }}"
     {{- end -}}
     loading="lazy">
```

### Exemple 2 : Avatar optimisé

```go-html-template
{{- $avatar := partial "get-optimized-image.html" (dict "imagePath" .Params.avatar "width" 200 "quality" 85) -}}
<img src="{{ $avatar.src }}" 
     alt="{{ .Title }}" 
     class="avatar"
     loading="lazy">
```

### Exemple 3 : Image de blog

```go-html-template
{{- $blogImage := partial "get-optimized-image.html" (dict "imagePath" .Params.image "width" 1200 "quality" 90) -}}
<img src="{{ $blogImage.src }}" 
     alt="{{ .Title }}" 
     class="featured-image">
```

## Cas d'usage réels dans mon portfolio

J'ai appliqué cette technique à **7 endroits stratégiques** de mon site :

| Composant | Taille | Qualité | Usage |
|-----------|--------|---------|-------|
| **Tuiles de projets** | 800px | 85% | Grilles de projets |
| **Avatars témoignages** | 200px | 85% | Carousel de recommandations |
| **Logos d'écoles** | 150px | 90% | Timeline de formation |
| **Logos d'entreprises** | 200px | 90% | Timeline d'expériences |
| **Projets dans expériences** | 600px | 85% | Cartes de projets |
| **Avatar de profil** | 400px | 90% | Hero section |
| **Images de blog** | 800px | 85% | Articles de blog |

## Résultats obtenus

### Avant optimisation
- Image JPG : **571 KB**
- Format : JPG 1500x500px
- Temps de chargement : ~2s (3G)

### Après optimisation
- Image WebP : **6.4 KB** 
- Format : WebP 400x133px
- Temps de chargement : ~0.1s (3G)

**Gain : 89× plus léger ! 🚀**

### Génération automatique

Lors du build Hugo :
```bash
                  │ FR  │ EN  
──────────────────┼─────┼─────
 Pages            │ 568 │   7 
 Processed images │  65 │   0  # 65 images WebP générées !
 
Built in 38047 ms
```

## Avantages de cette approche

### ✅ Pour le workflow

- **Aucun changement** dans FrontMatter CMS
- Les images restent dans `static/images/`
- Upload d'images via l'interface FrontMatter fonctionne toujours
- Pas de migration de fichiers nécessaire

### ✅ Pour les performances

- **Conversion WebP automatique** (30-40% plus léger que JPG)
- **Redimensionnement intelligent** selon le contexte
- **Attributs width/height** ajoutés automatiquement (évite le CLS)
- **Lazy loading** sur les images hors viewport
- **Fallback automatique** si l'optimisation échoue

### ✅ Pour la maintenance

- **Code DRY** : un seul helper pour tout le site
- **Paramétrable** : width, quality, format personnalisables
- **Gestion d'erreur** : fallback vers l'image statique
- **Type-safe** : retourne un objet structuré

## Comportements intelligents

### SVG non traités
Les fichiers SVG (vectoriels) ne sont **pas convertis** :
```go-html-template
{{- if eq $ext ".svg" -}}
    {{/* Use as-is, no conversion needed */}}
```

### WebP existants
Si l'image source est déjà en WebP, elle n'est **pas reconvertie** mais peut être redimensionnée.

### Fallback gracieux
Si la conversion échoue (image corrompue, format non supporté), le helper retourne automatiquement le chemin statique original.

## Bonnes pratiques

### Choisir la bonne taille

```go-html-template
# Thumbnails/avatars
width: 200-300px, quality: 80-85%

# Tuiles de projets
width: 600-800px, quality: 85%

# Images hero/featured
width: 1200-1600px, quality: 90%

# Backgrounds pleine largeur
width: 1920px, quality: 80%
```

### Optimiser le chargement

```go-html-template
# Images above the fold (hero, header)
loading="eager" (ou pas de loading)

# Images below the fold
loading="lazy"
```

### Ajouter les dimensions

```go-html-template
{{- if and $img.isResource (gt $img.width 0) }}
width="{{ $img.width }}" height="{{ $img.height }}"
{{- end -}}
```
Cela évite le **CLS (Cumulative Layout Shift)** et améliore les Core Web Vitals.

## Limitations et considérations

### Cache Hugo

Les images sont générées une fois au build et mises en cache :
```toml
[caches]
  [caches.images]
    dir = ':cacheDir/images'
```

Pour régénérer toutes les images :
```bash
hugo --gc
```

### Taille du dépôt

Les images optimisées sont générées dans `public/images/` avec des suffixes de hash :
```
mon-image.jpg                        # Original (statique)
mon-image_hu_abc123def456.webp      # Version optimisée
```

Le dossier `public/` doit être exclu du git (`.gitignore`).

### Temps de build

La première génération prend plus de temps :
- **Premier build** : ~38s (génération de 65 images)
- **Rebuilds suivants** : ~2-3s (cache utilisé)

## Aller plus loin

### Responsive images

Créez plusieurs versions d'une même image :

```go-html-template
{{- $img400 := partial "get-optimized-image.html" (dict "imagePath" .Params.image "width" 400 "quality" 85) -}}
{{- $img800 := partial "get-optimized-image.html" (dict "imagePath" .Params.image "width" 800 "quality" 85) -}}
{{- $img1200 := partial "get-optimized-image.html" (dict "imagePath" .Params.image "width" 1200 "quality" 85) -}}

<img src="{{ $img800.src }}"
     srcset="{{ $img400.src }} 400w,
             {{ $img800.src }} 800w,
             {{ $img1200.src }} 1200w"
     sizes="(max-width: 640px) 400px,
            (max-width: 1024px) 800px,
            1200px"
     alt="{{ .Title }}">
```

### Formats multiples avec `<picture>`

```go-html-template
{{- $webp := partial "get-optimized-image.html" (dict "imagePath" .Params.image "width" 800 "quality" 85 "format" "webp") -}}
{{- $jpg := partial "get-optimized-image.html" (dict "imagePath" .Params.image "width" 800 "quality" 85 "format" "jpg") -}}

<picture>
  <source srcset="{{ $webp.src }}" type="image/webp">
  <source srcset="{{ $jpg.src }}" type="image/jpeg">
  <img src="{{ $jpg.src }}" alt="{{ .Title }}">
</picture>
```

## Conclusion

Cette technique des **module mounts** est un game-changer pour les sites Hugo utilisant un CMS headless comme FrontMatter. Elle permet de :

1. ✅ **Conserver** votre workflow CMS intact
2. ✅ **Optimiser** automatiquement toutes vos images
3. ✅ **Améliorer** drastiquement les performances
4. ✅ **Maintenir** un code propre et réutilisable

Le gain en performance est **massif** (jusqu'à 89× plus léger) sans aucun compromis sur la qualité ou l'expérience développeur.

---

## Ressources

- [Documentation Hugo - Module Mounts](https://gohugo.io/hugo-modules/configuration/#module-config-mounts)
- [Hugo Image Processing](https://gohugo.io/content-management/image-processing/)
- [FrontMatter CMS](https://frontmatter.codes/)
- [Code source de mon helper](https://github.com/clixmods/portfolio)

**Vous utilisez cette technique ? Partagez vos résultats en commentaire ! 👇**
