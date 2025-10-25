import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://saadshahd.github.io',
  base: '/site',
  vite: {
    plugins: [tailwindcss()],
  },
});
