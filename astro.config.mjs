import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://saad-shahd.github.io',
  base: '/saad-shahd-portfolio',
  vite: {
    plugins: [tailwindcss()],
  },
});
