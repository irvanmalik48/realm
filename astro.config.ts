import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import vercel from "@astrojs/vercel/serverless";
import solidJs from "@astrojs/solid-js";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { AstroIntegration } from "astro";

const shikiResourcePaths = Object.keys(
  import.meta.glob([
    "./node_modules/.pnpm/shiki@*/node_modules/shiki/languages/*.tmLanguage.json",
    "./node_modules/.pnpm/shiki@*/node_modules/shiki/themes/*.json",
  ])
);

// https://astro.build/config
export default defineConfig({
  site: "https://irvanma.eu.org",
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: true,
        path: "./tailwind.config.cjs",
      },
    }) as AstroIntegration,
    partytown({}),
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
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
  output: "server",
  adapter: vercel({
    includeFiles: shikiResourcePaths,
  }) as AstroIntegration,
});
