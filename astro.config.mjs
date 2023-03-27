import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import vercel from "@astrojs/vercel/serverless";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://irvanma.eu.org",
  // Enable React to support React JSX components.
  integrations: [
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: true,
        path: "./tailwind.config.cjs",
      },
    }),
    partytown(),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "dark-plus",
      },
      gfm: true,
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    prefetch(),
    solidJs(),
  ],
  output: "server",
  adapter: vercel(),
});
