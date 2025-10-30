import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import astrobook from "@northstarthemes/astrobook";
import mdx from "@astrojs/mdx";
import mermaid from "astro-mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://saadshahd.github.io",
  trailingSlash: 'never',  // Prevent trailing slash redirects in production
  integrations: [
    mermaid({
      mermaidConfig: {
        theme: 'base',  // Required for custom variables
        themeVariables: {
          // Default node styling (Blueprint Authority palette)
          primaryColor: '#F5F1E8',           // Limestone cream background
          primaryBorderColor: '#CBD5E1',     // Warm gray border
          primaryTextColor: '#0F172A',       // Blueprint ink text

          // Typography
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '14px',

          // Connections
          lineColor: '#475569',              // Slate ink
          edgeLabelBackground: '#FEFDFB',    // Surface color

          // Clusters/subgraphs
          clusterBkg: '#FEFDFB',            // Clean surface
          clusterBorder: '#CBD5E1',         // Light border

          // Secondary elements
          secondaryColor: '#DBEAFE',         // Sky blue (derived nodes)
          tertiaryColor: '#FEF3C7',          // Warm amber (atomic nodes)
        }
      }
    }),  // ⚠️ Must come BEFORE mdx() to process code fences first
    mdx(),
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
