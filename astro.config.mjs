// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { SITE_URL } from "./src/consts.ts";

// Astro downloads exactly these weights, styles and subsets from Fontsource
// at build time, self-hosts them, writes the @font-face rules, and generates
// metric-matched fallbacks so the swap doesn't shift the layout.
const fontsource = fontProviders.fontsource();

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "ignore",
  // The dev toolbar sits over the page and costs frames while scrolling.
  devToolbar: { enabled: false },
  build: { format: "directory" },
  // Astro 7 defaults this to "jsx", which drops the whitespace at line breaks
  // around expressions and glues words together ("© 2026Md Hishaam").
  // `true` keeps HTML's own whitespace rules.
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  fonts: [
    {
      provider: fontsource,
      name: "Cormorant Garamond",
      cssVariable: "--font-cormorant",
      weights: [500, 600],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      // One Urdu word appears on the page. unicode-range keeps browsers from
      // fetching this until it renders.
      provider: fontsource,
      name: "Noto Nastaliq Urdu",
      cssVariable: "--font-nastaliq",
      weights: [400],
      styles: ["normal"],
      subsets: ["arabic"],
      fallbacks: ["serif"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
