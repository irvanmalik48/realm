// @ts-check
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";
import unocss from "unocss/astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    solidJs(),
    sitemap(),
    partytown(),
    unocss({
      injectReset: true
    })
  ],
  adapter: vercel(),
  vite: {
    resolve: {
      alias: {
        "lodash-es": "es-toolkit/compat",
        lodash: "es-toolkit/compat"
      }
    }
  }
});
