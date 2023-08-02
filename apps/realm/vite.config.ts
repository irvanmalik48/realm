import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikNxVite } from "qwik-nx/plugins";
import { partytownVite } from "@builder.io/partytown/utils";
import rehypeToc from "rehype-toc";
import { join } from "path";

export default defineConfig(async () => {
  const { default: rehypePrettyCode } = await import("rehype-pretty-code");

  return {
    cacheDir: "../../node_modules/.vite/apps/realm",
    plugins: [
      qwikNxVite(),
      qwikCity({
        trailingSlash: false,
        mdxPlugins: {
          rehypeSyntaxHighlight: false,
          remarkGfm: true,
          rehypeAutolinkHeadings: true,
        },
        mdx: {
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: "dark-plus",
                keepBackground: false,
                onVisitLine(node: any) {
                  if (node.children.length === 0) {
                    node.children = [{ type: "text", value: " " }];
                  }
                },
                onVisitHighlightedLine(node: any) {
                  node.properties = node.properties || {};

                  node.properties["data-is-highlighted"] = true;
                },
              },
            ],
            [
              rehypeToc,
              {
                headings: ["h2", "h3", "h4"],
                cssClasses: {
                  list: "list-disc",
                },
                customizeTOC: function (toc: any) {
                  toc.children.unshift({
                    type: "element",
                    tagName: "h2",
                    properties: {
                      id: "toc",
                    },
                    children: [
                      {
                        type: "text",
                        value: "Table of Contents",
                      },
                    ],
                  });

                  return toc;
                },
              },
            ],
          ],
        },
      }),
      qwikVite({
        client: {
          outDir: "../../dist/apps/realm/client",
        },
        ssr: {
          outDir: "../../dist/apps/realm/server",
        },
      }),
      tsconfigPaths({ root: "../../" }),
      partytownVite({ dest: join(__dirname, "dist", "~partytown") }),
    ],
    server: {
      fs: {
        // Allow serving files from the project root
        allow: ["../../"],
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    test: {
      globals: true,
      cache: {
        dir: "../../node_modules/.vitest",
      },
      environment: "node",
      include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
  };
});
