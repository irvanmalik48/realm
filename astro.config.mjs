// @ts-check
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), sitemap(), partytown()],
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  }
});