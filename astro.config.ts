import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import vercel from "@astrojs/vercel/serverless";
import solidJs from "@astrojs/solid-js";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getAllPostLinks } from "./src/lib/posts";
import { getAllLyricLinks } from "./src/lib/lyrics";

export default defineConfig({
  site: "https://irvanma.eu.org",
  integrations: [
    sitemap({
      customPages: [
        "https://irvanma.eu.org/",
        "https://irvanma.eu.org/posts",
        "https://irvanma.eu.org/lyrics",
        "https://irvanma.eu.org/creed",
        "https://irvanma.eu.org/oath",
        ...getAllPostLinks(),
        ...getAllLyricLinks(),
      ],
      changefreq: "daily",
      priority: 0.8,
      lastmod: new Date(),
    }),
    tailwind({
      config: {
        applyBaseStyles: true,
        path: "./tailwind.config.cjs",
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      }
    }),
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
