import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://saadshahd.github.io",
  trailingSlash: 'never',  // Prevent trailing slash redirects in production
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "IBM Plex Sans",
        weights: ["500", "700"],
        cssVariable: "--font-sans",
        display: "swap"
      },
      {
        provider: fontProviders.google(),
        name: "IBM Plex Serif",
        weights: ["400", "600"],
        cssVariable: "--font-serif",
        display: "swap"
      }
    ]
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark-default",
      wrap: true,
    },
  },
});
