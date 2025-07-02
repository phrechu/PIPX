// @ts-check
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
dotenv.config();

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';


// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },


  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
})

console.log('astro', process.env.PUBLIC_SITE_URL);
