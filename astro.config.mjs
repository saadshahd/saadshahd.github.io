import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://saadshahd.github.io",
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "IBM Plex Sans",
        weights: ["500", "700"],
        cssVariable: "--font-sans"
      },
      {
        provider: fontProviders.google(),
        name: "IBM Plex Serif",
        weights: ["400", "600"],
        cssVariable: "--font-serif"
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
