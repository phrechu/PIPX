// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: env.PUBLIC_SITE_URL || 'http://localhost:4321',
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
})