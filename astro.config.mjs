// @ts-check
import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'

import tailwindcss from '@tailwindcss/vite'

import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://jaweb.es',
  vite: {
    // @ts-ignore
    plugins: [tailwindcss()]
  },
  integrations: [icon(), sitemap()]
})
