import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import astrobook from "@northstarthemes/astrobook";

// https://astro.build/config
export default defineConfig({
  site: "https://saadshahd.github.io",
  trailingSlash: 'never',  // Prevent trailing slash redirects in production
  integrations: [
    astrobook({
      title: "Egyptian Engineering Design System",
      subpath: "/design-system",
      css: ["./src/styles/global.css", "./src/styles/astrobook.css"],
    }),
  ],
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
      },
      {
        provider: fontProviders.google(),
        name: "Space Grotesk",
        weights: ["600", "700"],
        cssVariable: "--font-display",
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
