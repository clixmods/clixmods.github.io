# Portfolio Hugo Site - AI Coding Instructions

This is a **French developer portfolio** built with Hugo static site generator, featuring a custom theme with macOS-inspired UI components.

## Architecture Overview

### Hugo Structure
- **Main site**: `/` with `hugo.toml` config and French content in `/content/`
- **Custom theme**: `/themes/portfolio.theme/` (separate git submodule)
- **Data-driven**: JSON files in `/data/` drive most content (profile, skills, projects, etc.)
- **Bilingual-ready**: Uses `hugo.toml` and structured content types via `frontmatter.json`

### Key Components
- **Dock Navigation**: macOS-style dock (`/themes/portfolio.theme/layouts/_partials/dock.html`)
- **Profile Section**: Data from `/data/profile.json` with French personal info
- **Projects**: Markdown files in `/content/projects/` with technology filtering
- **Blog**: French technical posts in `/content/posts/`
- **Technology Management**: Automated tech badges via `/data/technologies.json`

## Content Management Patterns

### Technology System
Technologies are centrally managed in `/data/technologies.json` with:
```json
{
  "name": "C#", "icon": "🔷", "color": "#239120", 
  "enabled": true, "order": 1, "experience": "4 ans", "level": "Expert"
}
```
Projects reference these by exact name match in their `technologies` frontmatter field.

### Project Structure
Project files use TOML frontmatter:
```toml
title = "Project Name"
technologies = ["Hugo", "HTML/CSS", "JavaScript"]
sector = "apps-web"
featured = true
fmContentType = "project-content-type"
```

### FrontMatter CMS Integration
The site uses FrontMatter CMS with extensive configuration in `frontmatter.json` (1400+ lines) defining content types, fields, and editorial workflows.

## Development Workflow

### Local Development
```bash
hugo serve --bind 0.0.0.0 --baseURL http://localhost --navigateToChanged
```
Use the existing VS Code task "Hugo Serve" which runs this command in background mode.

### Theme Development
- Custom theme lives in `/themes/portfolio.theme/` 
- Main layout: `baseof.html` with French comments and macOS-style components
- Partials organized by feature: `dock.html`, `profile.html`, `projects.html`, etc.
- SCSS modules in `/themes/portfolio.theme/assets/scss/`

### Technology Badge Generation
Use `/scripts/generate-tech-config.js` to generate technology configurations with predefined colors and icons for common tech stacks.

## Critical Patterns

### Data File Integration
Most content comes from JSON files in `/data/`:
- `profile.json`: Personal info in French
- `technologies.json`: Tech stack with SVG icons and experience levels
- `config.json`: Site navigation with French labels and emoji icons

### Asset Management
- Images stored in `/static/images/` with organized subdirectories
- Technology SVGs in `/static/images/technologies/`
- Generated assets in `/public/` (excluded from git)

### Content Types
Three main content types via FrontMatter CMS:
1. **Projects**: `/content/projects/` with tech filtering
2. **Blog Posts**: `/content/posts/` with French technical content
3. **Landing**: Special pages like `/content/landing.md`

## Specific Conventions

### French Language
- All content, comments, and UI text in French
- Personal branding: "Clément 'Clix' GARCIA"
- Professional focus: Game development and Unity/C#

### Technology Integration
- Always update `/data/technologies.json` when adding new tech
- Use exact name matching between projects and technology data
- SVG icons preferred over emoji for technologies

### Theme Customization
- Modify theme files in `/themes/portfolio.theme/layouts/`
- SCSS changes go in theme's `/assets/scss/` directory
- JavaScript components in theme's `/assets/js/`

When adding new features, maintain the data-driven approach and ensure French localization throughout.
