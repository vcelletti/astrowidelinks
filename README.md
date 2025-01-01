# AstroLinks

![Astrolinks Hero Banner](/public/astrolinks-hero.png)

A minimalist link-in-bio template for all your social media links, built with Astro and Tailwind CSS, and hosted on GitHub Pages.

This customized Astro starter kit includes Tailwind CSS and Astro Icon support, with automated deployment to GitHub Pages.

## Live Project Via GitHub Pages

[https://jperez00.github.io/astrolinks/](https://jperez00.github.io/astrolinks/)

## Features

- **Astro + Tailwind**: Integrated Tailwind for utility-first styling.
- **Layout & Components**: Created a reusable `Layout.astro` and a separate `index.astro` page.
- **Icons**: Used [astro-icon](https://www.astroicon.dev/) to import icons, including local SVGs in `src/icons/`.
- **GitHub Pages Deployment**: Configured `astro.config.mjs` with `site` and `base` settings, and added a GitHub Actions workflow (`.github/workflows/deploy.yml`) to deploy the site to [GitHub Pages](https://pages.github.com/).

## Project Structure

```text
/
├── public/
│   └── favicon.svg
│   └── portrait.webp
├── src/
│   ├── icons/          # Local SVG icons
│   │   └── github.svg
│   │   └── linkedin.svg
│   │   └── terminal.svg
│   │   └── twitter.svg
│   │   └── instagram.svg
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| npm install             | Installs dependencies                            |
| npm run dev             | Starts local dev server at localhost:4321      |
| npm run build           | Build your production site to ./dist/          |
| npm run preview         | Preview your build locally, before deploying     |
| npm run astro ...       | Run CLI commands like astro add, astro check |
| npm run astro -- --help | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
