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
- **NEVER use em dash "—" (tiret cadratin)** - Always use simple hyphen "-" instead
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

### Modal & Complex Component Architecture Pattern

When building modals or complex UI components (like trophies modal, skill modal, etc.), follow this **modular SCSS architecture**:

**Directory Structure Pattern:**
```
/assets/scss/modal/{component-name}/
├── {component-name}.scss        # Main entry point - imports all modules
├── _base.scss                   # Foundation: container, overlay, z-index
├── _header.scss                 # Top section: title, controls, navigation
├── _body.scss                   # Main content: scrollable area, grid/layout
├── _footer.scss                 # Bottom section: actions, stats, buttons
├── _cards.scss                  # Content cards/items (if applicable)
├── _animations.scss             # All animations and transitions
├── _responsive.scss             # All breakpoints and mobile adaptations
├── _notifications.scss          # Toast/notification styles (if needed)
└── README.md                    # Component documentation
```

**Component Organization Principles:**

1. **Base Module** (`_base.scss`):
   - Modal container positioning and dimensions
   - Overlay with backdrop-filter
   - Entry/exit state management
   - Z-index layering
   - Core animations (entrance/exit)

2. **Header Module** (`_header.scss`):
   - macOS-style window controls (if applicable)
   - Title and subtitle sections
   - Progress bars or status indicators
   - Close/action buttons
   - Top border/separator

3. **Body Module** (`_body.scss`):
   - Scrollable content area
   - Custom scrollbar styling (webkit + standard)
   - Grid or flex layout configuration
   - Content spacing and padding
   - Overflow handling

4. **Footer Module** (`_footer.scss`):
   - Statistics display
   - Action buttons (primary/secondary)
   - Status information
   - Bottom border/separator

5. **Cards Module** (`_cards.scss`) - if applicable:
   - Individual card/item styling
   - Hover states and interactions
   - Locked/unlocked or active/inactive states
   - Icon/image containers
   - Metadata displays

6. **Animations Module** (`_animations.scss`):
   - @keyframes definitions
   - Entrance/exit animations
   - Hover effects
   - State transitions
   - Stagger animations for grids
   - GPU-accelerated transforms

7. **Responsive Module** (`_responsive.scss`):
   - Mobile-first breakpoints (typically: 1024px, 768px, 480px, 360px)
   - Tablet adaptations
   - Mobile-specific layouts (often full-screen)
   - Landscape mode adjustments
   - Touch-optimized spacing
   - Adaptive typography

**Best Practices:**

- **Separation of Concerns**: Each file handles one aspect of the component
- **Import Order**: Base → Header → Body → Footer → Cards → Animations → Responsive
- **Naming Convention**: Use component prefix (e.g., `.trophies-modal-header`, `.skill-modal-body`)
- **Mobile Strategy**: Desktop-first with full mobile redesign at 768px breakpoint
- **macOS Inspiration**: Glassmorphism, subtle shadows, native window controls, smooth animations
- **Performance**: GPU-accelerated animations, will-change on transforms, optimized transitions
- **Documentation**: README.md with component overview, usage, and customization options

**Example from Trophies Modal:**
```scss
// trophies.scss (main entry)
@import 'base';        // Modal foundation + overlay
@import 'header';      // macOS controls + title + progress
@import 'body';        // Scrollable content + grid
@import 'footer';      // Stats + action buttons
@import 'trophy-cards'; // Individual trophy cards
@import 'notifications'; // Toast notifications
@import 'animations';  // All animations
@import 'responsive';  // All breakpoints
```

**HTML Structure Pattern:**
```html
<div class="component-modal">
  <div class="component-modal-overlay"></div>
  <div class="component-modal-content">
    <div class="component-modal-header">...</div>
    <div class="component-modal-body">...</div>
    <div class="component-modal-footer">...</div>
  </div>
</div>
```

This modular approach ensures:
- Easy maintenance and debugging
- Clear file organization (no 500+ line SCSS files)
- Reusable patterns across components
- Team collaboration friendly
- Performance optimization per module
- Independent responsive strategies

When making changes, always verify data file consistency, maintain French localization, and test both desktop and mobile layouts with the macOS-inspired design system.
