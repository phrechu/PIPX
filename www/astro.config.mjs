// @ts-check
import { defineConfig } from 'astro/config';


import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: process.env.SITE_URL || 'http://localhost:4321',
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
})