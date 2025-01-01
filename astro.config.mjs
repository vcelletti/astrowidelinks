// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

export default defineConfig({
  integrations: [tailwind(), icon()],
  site: 'https://jperez00.github.io/astrolinks',
  base: '/astrolinks',
});