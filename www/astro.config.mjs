// @ts-check
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
dotenv.config();

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';


import playformCompress from '@playform/compress';


// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },

  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',

  output: 'static',

  integrations: [sitemap(), playformCompress({ CSS: false, HTML: true, Image: false, JavaScript: false, SVG: true, })],

  vite: {
    plugins: [tailwindcss()],
  },
})