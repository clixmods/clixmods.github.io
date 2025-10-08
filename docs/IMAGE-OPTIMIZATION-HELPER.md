# Helper d'optimisation d'images avec conversion WebP

Le partial `get-optimized-image.html` centralise toute la logique de traitement et conversion d'images en WebP.

## 📦 Emplacement

`themes/portfolio.theme/layouts/_partials/get-optimized-image.html`

## 🎯 Fonctionnalités

- ✅ Conversion automatique en WebP
- ✅ Redimensionnement intelligent
- ✅ Gestion des SVG (pas de conversion)
- ✅ Détection des WebP existants (pas de re-conversion)
- ✅ Fallback automatique en cas d'erreur
- ✅ Retourne les dimensions pour éviter le CLS
- ✅ Qualité configurable

## 📝 Utilisation

### Exemple basique (WebP 800px)

```go-html-template
{{- $img := partial "get-optimized-image.html" (dict "imagePath" .Params.image "width" 800 "quality" 85) -}}
<img src="{{ $img.src }}" 
     width="{{ $img.width }}" 
     height="{{ $img.height }}" 
     alt="Image description"
     loading="lazy">
```

### Exemple avec vérification de ressource

```go-html-template
{{- $img := partial "get-optimized-image.html" (dict "imagePath" "/images/photo.jpg" "width" 1200 "quality" 90) -}}
<img src="{{ $img.src }}" 
     alt="Photo"
     {{- if $img.isResource }} 
     width="{{ $img.width }}" 
     height="{{ $img.height }}"
     {{- end -}}
     loading="lazy">
```

### Exemple pour background-image CSS

```go-html-template
{{- $bgImg := partial "get-optimized-image.html" (dict "imagePath" .Params.background_image "width" 1920 "quality" 80) -}}
<div style="background-image: url('{{ $bgImg.src }}');">
    <!-- Contenu -->
</div>
```

### Exemple avec format personnalisé (JPG au lieu de WebP)

```go-html-template
{{- $img := partial "get-optimized-image.html" (dict "imagePath" .Params.image "width" 600 "quality" 85 "format" "jpg") -}}
<img src="{{ $img.src }}" alt="Image JPG optimisée">
```

### Exemple pour thumbnails (petite taille, qualité réduite)

```go-html-template
{{- $thumb := partial "get-optimized-image.html" (dict "imagePath" .Params.thumbnail "width" 300 "quality" 75) -}}
<img src="{{ $thumb.src }}" 
     width="{{ $thumb.width }}" 
     height="{{ $thumb.height }}" 
     alt="Miniature"
     loading="lazy">
```

## 📊 Paramètres

| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `imagePath` | string | `""` | Chemin de l'image (ex: `/images/photo.jpg`) |
| `width` | int | `800` | Largeur cible en pixels |
| `quality` | int | `85` | Qualité de 1 à 100 |
| `format` | string | `"webp"` | Format de sortie: `"webp"`, `"jpg"`, `"png"` ou `"original"` |

## 🔄 Valeurs retournées

Le helper retourne un dictionnaire avec :

```go
{
    "src": "/images/photo_hu_abc123.webp",  // URL de l'image optimisée
    "width": 800,                            // Largeur (0 si non traité)
    "height": 533,                           // Hauteur (0 si non traité)
    "isResource": true                       // true si traité par Hugo
}
```

## 🎨 Cas d'usage dans le site

### 1. Tuiles de projets (`project-tile.html`)

```go-html-template
{{- $imagePath := $project.Params.image | default "images/placeholder-project.jpg" -}}
{{- $optimizedImage := partial "get-optimized-image.html" (dict "imagePath" $imagePath "width" 800 "quality" 85) -}}

<img src="{{ $optimizedImage.src }}" 
     alt="{{ $project.Title }}"
     width="{{ $optimizedImage.width }}" 
     height="{{ $optimizedImage.height }}">
```

### 2. Images de blog posts

```go-html-template
{{- $img := partial "get-optimized-image.html" (dict "imagePath" .Params.featured_image "width" 1200 "quality" 90) -}}
<img src="{{ $img.src }}" 
     width="{{ $img.width }}" 
     height="{{ $img.height }}" 
     alt="{{ .Title }}"
     class="featured-image">
```

### 3. Avatars de personnes

```go-html-template
{{- $avatar := partial "get-optimized-image.html" (dict "imagePath" .Params.avatar "width" 200 "quality" 80) -}}
<img src="{{ $avatar.src }}" 
     width="{{ $avatar.width }}" 
     height="{{ $avatar.height }}" 
     alt="{{ .Params.name }}"
     class="avatar">
```

### 4. Logos d'entreprises

```go-html-template
{{- $logo := partial "get-optimized-image.html" (dict "imagePath" .Params.company_logo "width" 400 "quality" 90) -}}
<img src="{{ $logo.src }}" 
     width="{{ $logo.width }}" 
     height="{{ $logo.height }}" 
     alt="Logo {{ .Params.company }}"
     class="company-logo">
```

## 🔍 Comportement intelligent

### SVG
Les fichiers SVG ne sont **pas convertis** car ce sont des vecteurs. Ils sont utilisés tels quels.

### WebP existants
Si l'image source est déjà en WebP et que le format demandé est WebP, elle n'est **pas reconvertie** mais redimensionnée si nécessaire.

### Fallback
Si la conversion échoue (image corrompue, format non supporté), le helper retourne automatiquement le chemin statique original avec `isResource: false`.

### Performance
Les images sont générées une seule fois au build et mises en cache. Les rebuilds suivants sont très rapides.

## 💡 Bonnes pratiques

1. **Utilisez toujours `loading="lazy"`** pour les images hors viewport
2. **Spécifiez width/height** quand `isResource` est true (évite le CLS)
3. **Ajustez la qualité** selon l'usage :
   - 90-95 : Images hero, photos importantes
   - 85 : Standard (bon compromis)
   - 75-80 : Thumbnails, images de fond
4. **Choisissez la bonne largeur** :
   - 300px : Thumbnails/avatars
   - 800px : Tuiles de projets
   - 1200px : Images featured de blog
   - 1920px : Backgrounds pleine largeur

## 🚀 Avantages

- **Réduction de ~30-40%** de la taille des fichiers (vs JPG)
- **Amélioration des Core Web Vitals** (LCP, CLS)
- **Code DRY** : une seule source de vérité
- **Maintenabilité** : modification centralisée
- **Type-safe** : retour structuré prévisible
