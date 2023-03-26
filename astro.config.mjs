import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import vercel from "@astrojs/vercel/serverless";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  site: "https://irvanma.eu.org",
  // Enable React to support React JSX components.
  integrations: [
    react(),
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
  ],
  output: "server",
  adapter: vercel(),
});
