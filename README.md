# AstroLinks - Dynamic Fork

![Astrolinks Demo Video](/public/astrolinks-demo.gif)

A minimalist link-in-bio template built with Astro v5.5.5, Tailwind CSS, and React. This fork extends the original [AstroLinks](https://github.com/JPerez00/astrolinks) by adding support for **volatile featured links** alongside static social links, making it perfect for temporarily promoting events, campaigns, or special content.

**Built in a lazy Saturday thanks to [Claude Code](https://claude.com/claude-code)**

## Live Demo

[https://vcelletti.github.io/astrolinks/](https://vcelletti.github.io/astrolinks/)

## What Makes This Fork Different?

While the original AstroLinks template focuses on static social links, this fork introduces:

### Featured Links Section
Display **time-sensitive or promotional content** with rich preview cards featuring:
- Automatic screenshot previews fetched at build time
- Custom titles, descriptions, and icons
- Eye-catching card design with hover effects
- Easy JSON-based configuration

### Dual Link Types
1. **Featured Links** (volatile): JSON-configured cards with images, perfect for campaigns, events, or temporary promotions
2. **Social Links** (static): Traditional icon buttons for permanent profiles (GitHub, LinkedIn, Instagram, etc.)

This makes the template ideal for creators who need both permanent branding and flexible promotional space.

## Features

- **Astro v5.5.5 + Tailwind CSS**: Modern, fast, utility-first architecture
- **Light & Dark Mode**: Automatic theme detection with manual toggle
- **Featured Links with Previews**: JSON-configured cards with automatic image fetching
- **React Integration**: Interactive components (theme toggle, typewriter effect)
- **Icon System**: Local SVG support via [astro-icon](https://www.astroicon.dev/)
- **GitHub Pages Ready**: Pre-configured deployment workflow
- **Optimized Images**: Automatic WebP conversion and compression (30-50 KB per preview)

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/vcelletti/astrolinks.git
cd astrolinks

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Adding Featured Links

Featured links are managed through [src/data/links.json](src/data/links.json). Each link requires:

```json
{
  "title": "Your Link Title",
  "description": "A brief description of what this link is about",
  "url": "https://example.com",
  "image": "/astrolinks/previews/example-com.webp",
  "icon": "terminal"
}
```

**To add a new featured link:**

1. Edit [src/data/links.json](src/data/links.json) and add your entry
2. Run `npm run fetch-previews` to download and optimize the preview image
3. Build the site with `npm run build`

### Customizing Social Links

Static social links are hardcoded in [src/pages/index.astro](src/pages/index.astro) (lines 8-34). Modify the `links` array:

```javascript
const links = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: "github",
  },
  // Add more links...
];
```

Add corresponding SVG icons to [src/icons/](src/icons/).

## How Image Management Works

This fork includes a powerful build-time image optimization system:

### Automatic Preview Fetching

The [scripts/fetch-previews.js](scripts/fetch-previews.js) script:

1. Reads all URLs from [links.json](src/data/links.json)
2. Fetches high-quality screenshots via [Microlink API](https://microlink.io/)
3. Optimizes images using [Sharp](https://sharp.pixelplumbing.com/):
   - Resizes to 1200x630px
   - Converts to WebP format
   - Applies 80% quality compression
   - Result: 30-50 KB per image (90%+ size reduction)
4. Saves optimized images to `public/previews/`

### Build Commands

| Command | Description |
|---------|-------------|
| `npm run fetch-previews` | Download and optimize preview images only |
| `npm run build` | Full build: fetch images + build production site to `./dist/` |
| `npm run build:fast` | Quick build: skip image fetching, use cached previews |

**When to use each:**
- Use `build` for the first build or when adding new links
- Use `build:fast` for quick rebuilds when only changing text/styles
- Run `fetch-previews` manually when you only need to update images

### Image Caching

Preview images are cached in `public/previews/` and persist between builds. This means:
- `build:fast` can skip the API calls entirely
- Images are only re-fetched when you explicitly run `fetch-previews`
- Deploys are faster and don't depend on external APIs

## Commands Reference

All commands are run from the project root:

| Command | Action |
| :------------------------ | :----------------------------------------------- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Fetch preview images + build production site to `./dist/` |
| `npm run build:fast` | Build production site without fetching images (uses cached previews) |
| `npm run fetch-previews` | Download and optimize preview images from links.json |
| `npm run preview` | Preview production build locally |
| `npm run astro ...` | Run Astro CLI commands (e.g., `npm run astro add`, `npm run astro check`) |

## Project Structure

```text
/
├── public/
│   ├── previews/              # Optimized WebP preview images
│   ├── favicon.svg
│   └── valerio.webp
├── scripts/
│   └── fetch-previews.js      # Image fetching and optimization script
├── src/
│   ├── components/
│   │   ├── Footer.astro
│   │   ├── TypewriterText.tsx
│   │   └── ToggleTheme.tsx
│   ├── data/
│   │   └── links.json         # Featured links configuration
│   ├── icons/                 # Local SVG icons
│   │   ├── github.svg
│   │   ├── linkedin.svg
│   │   ├── terminal.svg
│   │   └── ...
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro        # Main page with social links array
│   └── styles/
│       └── global.css
├── astro.config.mjs           # GitHub Pages configuration
└── package.json
```

For more about Astro's project structure, see the [official guide](https://docs.astro.build/en/basics/project-structure/).

## Deployment

This project is pre-configured for GitHub Pages deployment via GitHub Actions.

### Setup

1. Update [astro.config.mjs](astro.config.mjs) with your GitHub username and repo name:
   ```javascript
   export default defineConfig({
     site: 'https://yourusername.github.io',
     base: '/your-repo-name',
     // ...
   });
   ```

2. Update the base path in [src/pages/index.astro](src/pages/index.astro) for images and links

3. Push to the `main` branch - GitHub Actions will automatically build and deploy

4. Enable GitHub Pages in your repo settings (Source: "GitHub Actions")

The deployment workflow is defined in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

## Credits

This project is a fork of the excellent [AstroLinks template](https://github.com/JPerez00/astrolinks) by [Jorge Perez](https://www.jorge-perez.dev/). The original template provides the foundation for the static social links functionality.

**Enhancements in this fork:**
- Featured links system with preview cards
- JSON-based link configuration
- Automated image fetching and optimization
- Build-time image processing with Sharp
- Extended documentation

## License

MIT License - see [LICENSE](LICENSE) file for details.

Original AstroLinks template also under MIT License.

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Claude Code](https://claude.com/claude-code)
