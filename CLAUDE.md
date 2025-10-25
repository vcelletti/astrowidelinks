# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AstroLinks is a minimalist link-in-bio template built with Astro v5.5.5, Tailwind CSS, and React components. It's designed for deployment to GitHub Pages and features a responsive design with light/dark mode support and a typewriter text effect.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at localhost:4321 |
| `npm run build` | Fetch preview images + build production site to ./dist/ |
| `npm run build:fast` | Build production site without fetching images (uses cached previews) |
| `npm run fetch-previews` | Download and optimize preview images from links.json |
| `npm run preview` | Preview production build locally |
| `npm run astro ...` | Run Astro CLI commands (e.g., `npm run astro add`, `npm run astro check`) |

## Architecture

### Framework Stack
- **Astro v5.5.5**: Static site generator with partial hydration
- **React**: Used for interactive components (theme toggle, typewriter effect)
- **Tailwind CSS**: Utility-first styling with dark mode support via `class` strategy
- **astro-icon**: Icon system supporting local SVGs from `src/icons/`

### Key Architectural Patterns

**Astro Islands Architecture**: React components are selectively hydrated using `client:load` directive. Only interactive components (ToggleTheme, TypewriterText) are hydrated, while static content remains as HTML.

**Theme System**: Dark mode is implemented using:
- Tailwind's `darkMode: "class"` configuration
- Pre-emptive theme script in [Layout.astro:34-44](src/layouts/Layout.astro#L34-L44) to prevent theme flash on load
- localStorage persistence managed by [ToggleTheme.tsx](src/components/ToggleTheme.tsx)
- System preference detection via `prefers-color-scheme`

**GitHub Pages Configuration**: The project is configured for deployment to a GitHub Pages subpath:
- `site: 'https://jperez00.github.io/astrolinks'` in [astro.config.mjs:9](astro.config.mjs#L9)
- `base: '/astrolinks'` in [astro.config.mjs:10](astro.config.mjs#L10)
- All asset paths must include `/astrolinks` prefix (see [Layout.astro:25](src/layouts/Layout.astro#L25) and [index.astro:51](src/pages/index.astro#L51))

### Component Structure

**Layout.astro**: Base layout providing:
- Global CSS import
- Theme initialization script (prevents FOUC)
- Common meta tags and SEO
- Props interface for customization (title, description, creator, repoLink)

**index.astro**: Main page containing:

- Profile image and bio
- Featured links with preview images (from links.json)
- Social links array (configurable data structure)
- Icon integration via `astro-icon`
- Client-side hydrated components

**React Components**:

- `ToggleTheme.tsx`: Theme switcher with localStorage persistence and system preference detection
- `TypewriterText.tsx`: Animated typewriter effect using `typewriter-effect` library

### Dynamic Link Previews System

**Featured Links Configuration**: Links are managed through [src/data/links.json](src/data/links.json) with the following structure:

```json
{
  "title": "Link Title",
  "description": "Brief description of the link",
  "url": "https://example.com",
  "image": "/astrolinks/previews/example-com.webp",
  "icon": "icon-name"
}
```

**Build-time Image Optimization**: [scripts/fetch-previews.js](scripts/fetch-previews.js) automatically:

- Fetches screenshots from Microlink API for each URL in links.json
- Optimizes images using Sharp (resize to 1200x630, WebP format, 80% quality)
- Saves optimized images to `public/previews/` (typically 30-50 KB per image)
- Runs automatically during `npm run build` or manually via `npm run fetch-previews`

**Performance Benefits**:

- Static WebP images served from your hosting (no runtime API calls)
- 90%+ size reduction compared to unoptimized screenshots
- Cached between builds (use `build:fast` to skip image fetching)

### Icon System

Icons are stored in `src/icons/` as local SVG files and imported via the `astro-icon` package. Usage pattern:

```astro
<Icon name="github" class="w-5 h-5" />
```

## Deployment

Automated deployment via GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)):

- Triggers on push to `main` branch
- Uses `withastro/action@v3` for build
- Deploys to GitHub Pages automatically
- Requires GitHub Pages settings: Source = "GitHub Actions"

## Important Configuration Details

**Base Path**: When modifying asset paths or links, always include the `/astrolinks` base path for GitHub Pages compatibility.

**Hydration**: Only add `client:load` to components requiring interactivity. Static components should remain as pure Astro components for optimal performance.

**Tailwind Dark Mode**: Apply dark mode styles using `dark:` prefix (e.g., `dark:bg-zinc-950`). The theme toggle manipulates the `dark` class on `<html>`.

**Adding New Featured Links**:

1. Add entry to [src/data/links.json](src/data/links.json)
2. Run `npm run fetch-previews` to download and optimize the preview image
3. Build normally with `npm run build` (includes image fetching) or `npm run build:fast` (uses cached images)
