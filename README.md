# AstroLinks - Valerio Celletti

![Astrolinks Demo Video](/public/astrolinks-demo.gif)

A minimalist link-in-bio template for all your social media links, built with Astro v5.5.5, Tailwind CSS and hosted on GitHub Pages.

This project is a fork and customization of the original [AstroLinks template](https://github.com/JPerez00/astrolinks) by [Jorge Perez](https://www.jorge-perez.dev/).

## Live Site

[https://vcelletti.github.io/astrolinks/](https://vcelletti.github.io/astrolinks/)

## Credits

Original template: [AstroLinks by Jorge Perez](https://github.com/JPerez00/astrolinks)

## Features

- **Astro + Tailwind**: Integrated Tailwind for utility-first styling.
- **Light & Dark mode toggle**: Integrated `darkclass` from Tailwind.
- **Layout & Components**: Created a reusable `Layout.astro` and a separate `index.astro` page.
- **Icons**: Used [astro-icon](https://www.astroicon.dev/) to import icons, including local SVGs in `src/icons/`.
- **GitHub Pages Deployment**: Configured `astro.config.mjs` with `site` and `base` settings, and added a GitHub Actions workflow (`.github/workflows/deploy.yml`) to deploy the site to [GitHub Pages](https://pages.github.com/).
- **Typewriter effect**: Using React components in Astro, thanks to `@astrojs/react`.

## Project Structure

```text
/
├── public/
│   └── favicon.svg
│   └── portrait.webp
├── src/
│   ├── components/
│   │   └── Footer.astro
│   │   └── TypewriterText.tsx
│   │   └── ToggleTheme.tsx
│   ├── icons/
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

To learn more about the folder structure of an Astro project, refer to [this guide on project structure](https://docs.astro.build/en/basics/project-structure/).

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

Feel free to check the [Astro documentation](https://docs.astro.build).
