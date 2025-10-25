# Portfolio Hugo Site - AI Coding Instructions

This is a **French developer portfolio** built with Hugo static site generator, featuring a custom theme with macOS-inspired UI components and sophisticated content management.

## Architecture Overview

### Core Structure
- **Main site**: `/` with bilingual Hugo config (`hugo.toml`) defaulting to French
- **Custom theme**: `/themes/portfolio.theme/` (separate git submodule with its own layouts/assets)
- **Data-driven architecture**: Structured JSON files in `/data/` control most UI and content
- **Content management**: FrontMatter CMS integration via extensive `frontmatter.json` (1639+ lines)

### Key Data Files
- `data/profile.json` + `data/profile.en.json`: Personal info with bilingual support
- `data/programming_languages.json`: Tech stack with SVG icons, experience levels, colors
- `data/frameworks_engines.json`: Frameworks with display preferences and experience
- `data/config.json` + `data/config.en.json`: Navigation with French labels and emoji icons
- `data/certifications.json`, `data/testimonials.json`, `data/trophies.json`: Portfolio content

### Content Architecture
Multiple content types organized in `/content/` with TOML frontmatter:
- **Projects** (`/content/projects/`): Tech filtering via exact name matching with data files
- **Blog posts** (`/content/posts/`): French technical content with technology tags
- **People** (`/content/people/`): Professional network profiles and collaborators
- **Experiences/Educations**: Professional and academic background

## Critical Development Patterns

### Technology Data Integration
Technologies are managed across **multiple JSON files** (not a single file):
- `programming_languages.json`: Languages with `experience` (years) and `displayedInPortfolio` boolean
- `frameworks_engines.json`: Frameworks with same structure
- `specialties.json`, `soft_skills.json`: Additional skill categories

Projects reference these by **exact string matching** in their `technologies` frontmatter arrays. Always maintain consistency between data file `name` fields and project technology references.

### FrontMatter CMS Workflows
The `frontmatter.json` defines complex content types and field groups:
- Custom content types like `"project-content-type"` with specialized fields
- Field groups for contributors, actions, notable facts with repeatable sections
- Data file integration allowing UI selection from JSON data sources
- Automated field validation and editorial workflows

### Theme Architecture
Custom theme in `/themes/portfolio.theme/` with:
- Modular SCSS in `/assets/scss/` with component-based organization
- Interactive JavaScript in `/assets/js/` (e.g., `skill-modal.js` with 937+ lines)
- Template hierarchy: `baseof.html` → section layouts → partials
- Asset pipeline handling SVG icons, SCSS compilation, JS bundling

## Development Workflow

### Local Development
Use the VS Code task "Hugo Serve" which runs:
```bash
hugo serve -D
```
This runs in background mode with fast rebuilds. The build output shows it generates 505+ pages (FR) + 7 pages (EN) with hot reload on file changes.

### Key Commands & Scripts
- `scripts/generate-tech-config.js`: Generates technology configurations with predefined colors/icons for 40+ common technologies
- `scripts/update-experience-fields.js`: Auto-updates calculated fields when experience dates change
- `scripts/experience-utils.js`, `scripts/trophies-utils.js`: Utility functions for content processing

### Asset Management Strategy
- **Static assets**: `/static/images/` organized by type (`/technologies/`, `/projects/`, `/people/`)
- **Theme assets**: `/themes/portfolio.theme/assets/` for SCSS/JS that need Hugo processing
- **Generated output**: `/public/` (excluded from git) with processed CSS, optimized images
- **Technology icons**: Prefer SVG files in `/static/images/technologies/` over emoji

### Bilingual Support
Hugo's multilingual setup with:
- French as default language at root (`/`)
- English under `/en/` subdirectory
- Separate data files: `profile.json` (FR) + `profile.en.json` (EN)
- Language-specific navigation in `config.json` vs `config.en.json`

## Critical Integration Points

### FrontMatter CMS Data Files
The `frontMatter.data.files` configuration creates editable interfaces for:
- Profile data with complex nested objects (personal, media, contact, details)
- Technology data with validation schemas and field groups
- Content type definitions with custom field groups like `contributors_group`, `actions_group`

### Technology Display Logic
Projects use arrays like `programming_languages = ["C#"]` and `frameworks_engines = ["Unity", "Blazor"]` which must match the `name` field in respective JSON data files exactly. The theme renders these with icons, colors, and experience levels from the data files.

### Content Type System
Three main FrontMatter content types:
1. **"project-content-type"**: Complex projects with contributors, tech stacks, sectors
2. **"default"**: Blog posts and general content
3. Specialized types for people, experiences, educations with custom field validations

## Specific Conventions

### French-First Development
- All UI text and content in French (user-facing content)
- **All documentation and code comments must be in English**
- Personal branding: "Clément 'Clix' GARCIA" 
- Professional focus: Game development, Unity/C#, alternance work-study program
- Error messages and debug output in French

### Content Writing Rules
- **NEVER use emojis in article titles, subtitles, or project descriptions** - They look childish and scream "AI-generated"
- **NEVER use emojis in blog post content** - This is a professional portfolio, not a social media post
- Emojis are ONLY acceptable in UI navigation elements (already defined in `config.json`)
- Professional, technical writing style - let the content speak for itself
- Avoid overly enthusiastic or marketing-like language that signals AI generation

### JavaScript Development Rules
- **NEVER generate HTML strings in JavaScript** - This is strictly forbidden
- **NEVER use createElement for complex UI structures** - Use Hugo partials instead
- **NEVER implement temporary solutions** - Always implement complete, final solutions
- **MINIMAL DOM manipulation only** - Only for dynamic interactions, not structure
- JavaScript should only handle: events, data processing, CSS class toggling, attribute changes
- All HTML structure must come from Hugo partials (server-side rendering)
- Separate presentation (HTML/Hugo) from behavior (JavaScript) completely
- When you see HTML generation in JS, replace it with Hugo partials + minimal JS interactions
- Always finish implementations completely - no TODO comments or placeholder code

### Data File Patterns
- JSON files use consistent `name`, `icon`/`iconPath`, `color`, `displayedInPortfolio`, `experience` fields
- Boolean flags like `featured`, `enabled` control UI visibility
- Order/priority controlled by numeric `order` or `experience` values
- SVG icon paths follow `/images/technologies/{Technology}.svg` pattern

### Theme Development
- SCSS organized in modules under `/themes/portfolio.theme/assets/scss/`
- JavaScript components support complex interactions (skill modals, project filtering)
- Layout inheritance: `baseof.html` → specific layouts → partials
- Asset pipeline: Hugo processes SCSS/JS, outputs to `/public/css/` and `/public/js/`

When making changes, always verify data file consistency, maintain French localization, and test both desktop and mobile layouts with the macOS-inspired design system.
