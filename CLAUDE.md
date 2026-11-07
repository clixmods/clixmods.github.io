# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Bilingual (FR/EN) personal portfolio built with **Hugo Extended**, deployed to GitHub Pages at `https://clixmods.github.io/`. French is the default language served at the root; English is served under `/en/`. The site uses a vendored theme, `portfolio.theme` (checked into `themes/`, **not** a git submodule — see below).

## Commands

```bash
# Local dev server (auto-reloads, serves at http://localhost:1313)
hugo server --config hugo.dev.toml

# Production build (matches CI output in ./public)
hugo --gc --minify --environment production

# Include drafts / future-dated content while previewing
hugo server --config hugo.dev.toml -D -F
```

**Hugo Extended** (not standard Hugo) is required — the theme compiles SCSS with Dart Sass. The theme declares `min_version = "0.128.0"` in `theme.toml`; CI pins Hugo Extended `0.150.0`.

`hugo.toml` is the production config (baseURL `https://clixmods.github.io/`); `hugo.dev.toml` overrides only the baseURL to `http://localhost:1313/`. Both declare the same two languages (`fr` weight 1 at root, `en` weight 2 under `/en/`) and the same theme. `config/_default/` exists but is empty — the two root `hugo.*.toml` files are the only Hugo config. There is no `package.json` and no test suite.

## Theme & layouts

The theme `portfolio.theme` lives in `themes/portfolio.theme/` and is **vendored directly in this repo** — its files are tracked in the main repository, there is **no `.gitmodules`**, and `git submodule status` is empty. Editing the theme means editing files under `themes/portfolio.theme/` and committing them like any other file — there is no separate submodule to update or push.

- `themes/portfolio.theme/layouts/` — all layouts. There is **no top-level `layouts/`** at the repo root.
- `themes/portfolio.theme/assets/` — SCSS (Dart Sass), JS (`assets/js/main.js`) and Ionicons SVGs (`assets/icons/`).
- `themes/portfolio.theme/i18n/fr.yaml` and `en.yaml` — the i18n label tables (see below).

**Art direction — thème « Cadre » (Arc / Zen Browser):** sober and light. A tinted frame (two-color gradient per *space*) holds a left sidebar of tabs; content lives in a single white "sheet" (dark mode follows `prefers-color-scheme`). Typography Geist / Geist Mono (Google Fonts). Icons are **Ionicons filled** (MIT, the set Zen Browser uses for workspaces), vendored as SVG in `themes/portfolio.theme/assets/icons/` and inlined with `partial "icon.html" "<name>"`. SCSS is compiled with **Dart Sass** (`transpiler: dartsass` in `head.html`; the theme uses `@each`, `color-mix()`, `max()`).

**Spaces and tabs.** Four spaces: `home` (Accueil: home, all projects, skills, services, folders Expériences / Formations / Blog) and three project spaces `jeux`, `web`, `mods`, each with a landing page (`content/jeux.md`, `web.md`, `mods.md`, `type = "space"` → `layouts/space/single.html`; EN slug for games is `/en/games/`). A project's space and folder come from `partials/project-place.html` (sector → `jv`/`tools` → jeux, `app` → web, `mods` → mods; mod folders are derived from `frameworks_engines`: `fw_black_ops_iii_engine` → Black Ops III, Fabric/Forge/NeoForge/Quilt → Minecraft). `partials/spaces.html` builds the whole tab tree once per language (`partialCached`); `partials/sidebar-tabs.html` renders every space's tabs and CSS shows the one matching `<html data-space>` (set by `partials/space-of.html`). Every sidebar tab is a real page. Visitor state lives in `localStorage` (`cadre:*` keys): tab order (drag & drop), open folders, compact sidebar, last page per space, custom space colors (right-click › Modifier le thème de l'espace). The inline scripts in `head.html` / `sidebar.html` apply that state before first paint; `assets/js/main.js` holds the rest (⌘K search, context menu, theme editor, language popover, mobile drawer) followed by the page features (filters, testimonials, lightbox, skills modal). Page changes are soft navigations: `main.js` fetches the next page and swaps `#main`, `.crumb` and the URL bars (`[data-urlrow]`), so the sidebar never reloads; page features re-run through `window.CadrePage.init()/destroy()` (document/window listeners must use `sig()`, timers go in `cleanups`). Other languages, downloads and `target=_blank` links fall back to a full load (cross-document View Transitions).

**Project tabs (sites inside the sheet).** Folders follow Dia: a favicon-sized icon (project image / company logo, or an outline Ionicon `badge`), the name in semibold, then a chevron. Each experience with `projects[].project_ref` is a folder too: Wiki (the experience page) then its projects. Every project with `[[actions]]` becomes a nested folder in the sidebar (closed by default, its image as the folder icon): **Wiki** (the project page) then one tab per action. The content adapter `content/tabs/_content.gotmpl` reads the projects' front matter and generates a page `/tabs/<project>/<tab>/` (layout `layouts/tabs/single.html`, iframe) for each action that can be framed: YouTube videos (via youtube-nocookie embed) and the hosts in its `$embeddable` list. Other actions (GitHub, itch.io, Steam, consoles, CurseForge, Nexus, Modrinth… which send `X-Frame-Options`/`frame-ancestors`) are external tabs (`target=_blank`, "open elsewhere" icon). Per action: `tab = "<short tab name>"` (else `label`), `embed = true|false` to force. Per project: `wiki_tab` renames the Wiki tab, and `[[linked_wikis]]` (`ref` = another project file, `tab` = label) adds that project's page to the folder — an intentional exception (e.g. the Living Horizon website wiki inside the mod's folder). Tab favicons come from `static/images/favicons/<domain>.png` (`partials/favicon-of.html`, Ionicons fallback). Any page can open full width with `full_width = true` (visitors toggle it per page from the sheet bar, Notion-style; stored in `cadre:wide`). The space theme editor also stores `intensity` and `grain` (0–1) per space. Project pages also get a blurred backdrop from `image` (`.page-ambient`), disabled with `ambient = false`.

## Content + data architecture (the key concept)

Content is authored in `content/` as TOML-front-matter Markdown (`+++` fences), one file per language: `name.md` (FR) and `name.en.md` (EN). Content sections: `projects/`, `people/`, `experiences/`, `educations/`, `posts/`, `skills/`. Notes:
- `content/skills/` holds **only** `_index.md` / `_index.en.md` — there are no per-skill content files; skills are sourced from `data/` (see below).
- `content/people/` is largely FR-only.
- Standalone top-level pages: `_index.md`, `cv.md`, `cv-print.md`, `landing.md`, `demo.md`.

**Technologies, skills, tools, specialties, and languages are referenced by stable keys, never by display text.** In front matter you'll see arrays like:

```toml
programming_languages = [ "lang_csharp" ]
frameworks_engines    = [ "fw_unity" ]
specialties           = [ "spec_lighting", "spec_algorithmique" ]
soft_skills           = [ "skill_communication" ]
tools                 = [ "tool_github" ]
```

Each key resolves through two layers:
- **`data/*.json`** maps the key → presentation metadata: `icon` (emoji), `iconPath` (SVG/PNG under `static/images/technologies/`, may be `null`), `color` (hex), `experience` (years, fractional allowed), `displayedInPortfolio` (bool). Some entries omit optional fields. Key-based files: `programming_languages.json`, `frameworks_engines.json`, `specialties.json`, `soft_skills.json`, `tools.json`.
- **i18n tables in the theme** (`themes/portfolio.theme/i18n/{fr,en}.yaml`) map the key → human-readable label per language. These are plain versioned files in this repo, **not** in a submodule.

Other `data/` files: `profile`, `testimonials`, `certifications`, `config`, `icons`, `role-contributor` (each with a `.en.json` sibling), plus `internships.json` and `name-to-key-mapping.json`. A partial `data/en/` subfolder duplicates three of them (`profile`, `testimonials`, `internships`).

**`.en.json` nuance:** the key-based files (`programming_languages`, `frameworks_engines`, `specialties`, `soft_skills`, `tools`, `name-to-key-mapping`) are **language-agnostic and have NO `.en.json` sibling** — their labels come from the theme i18n tables. Only the localized content files (`profile`, `testimonials`, `certifications`, `config`, `icons`, `role-contributor`) have `.en.json` siblings.

`data/name-to-key-mapping.json` records the display-name → key mapping (with `fr`/`en` sub-objects) used during migrations.

When adding a technology/skill/tool to a project: use an existing key if one exists (check the matching `data/*.json`), or add a new entry to the `data/*.json` file (with an icon under `static/images/technologies/`) **and** the corresponding label in `themes/portfolio.theme/i18n/{fr,en}.yaml` — otherwise it renders as a raw key.

## Front matter fields

Beyond the key-reference arrays above, project/experience/education front matter uses:
- Scalar fields: `title`, `subtitle`, `description`, `tags`, `category`, `sector`, `status`, `featured`, `featuredInCV` (drives the CV page), `logo`, `image`, `date`, `draft`, and `fmContentType` (binds the file to a Front Matter CMS content type).
- Nested TOML blocks: `[[actions]]` (type/label/url/primary buttons), `[development_time]` with `[[development_time.phases]]`, and `[[galleries]]` with `[[galleries.images]]`. Each nested block carries a `fieldGroup` matching a Front Matter CMS field group.

## Front Matter CMS

This repo is configured for [Front Matter CMS](https://frontmatter.codes/) (VS Code). The content-type schemas, field groups, page-folder definitions, and data-file schemas are split across `.frontmatter/config/**` and the root `frontmatter.json`.

`frontmatter.json` (`frontMatter.taxonomy.contentTypes`) defines **6** content types: `default`, `education-content-type`, `experience-content-type`, `person-content-type`, `project-content-type`, `projects-index`. `.frontmatter/config/taxonomy/fieldgroups/` holds ~26 reusable field groups (e.g. `galleries_group`, `phases_group`, `actions_group`, `programming_languages_group`, `tools_group`, `testimonials_group`), and `.frontmatter/config/data/files/` plus `frontMatter.data.files` register the `data/*.json` files that back the relationship pickers. If you add a front-matter field that should be editable in the CMS, update the matching content-type JSON.

## Deployment

`.github/workflows/hugo.yaml` ("Build and deploy") builds and deploys to GitHub Pages on every push to `main` (job `build` → job `deploy` via `actions/deploy-pages@v4`). Toolchain pinned in the workflow `env`: Hugo Extended `0.150.0`, Go `1.25.1`, Dart Sass `1.92.1`, Node `22.18.0`, `TZ: Europe/Oslo`.

Before building, CI **strips `console.log`**: `sed -i '/console\.log/d'` over all `.html`, then `uglify-js --compress drop_console=true` (installed globally) over all `.js`. Don't rely on `console.log` surviving in production. Build command: `hugo --gc --minify --environment production --cacheDir …`.

Two workflow steps are effectively **inert** in the current repo state: checkout uses `submodules: recursive` (but there are no submodules) and a conditional `npm ci` (but there is no `package.json`/lockfile, so it's skipped).

## Local tooling / node_modules

A `node_modules/` directory exists locally (puppeteer, babel, glob, …) but there is **no tracked `package.json`/lockfile**. It supports some local `scripts/` (e.g. puppeteer-based screenshots) and is ignored by CI (`npm ci` is skipped). Don't assume these deps are available in the CI build.

## scripts/

Mostly one-off **migration utilities** (JS + PowerShell), not part of the normal build — they converted content and data from display-name references to the `lang_*` / `fw_*` / `spec_*` / `skill_*` / `tool_*` key system and aligned FR/EN i18n keys (`migrate-*.js`, `fix-*.ps1`, `migrate-*.ps1`; output lands in `scripts/migration-output/`). Re-run only when doing a similar bulk migration. The folder also holds reusable helpers still worth knowing: `generate-tech-config.js`, `experience-utils.js`, `trophies-utils.js`, `update-experience-fields.js`, and `validate-project-data.ps1`.
