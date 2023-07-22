import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { partytownVite } from "@builder.io/partytown/utils";
import { join } from "path";
import rehypeToc from "rehype-toc";

export default defineConfig(async () => {
  const { default: rehypePrettyCode } = await import("rehype-pretty-code");

  return {
    plugins: [
      qwikCity({
        mdxPlugins: {
          rehypeSyntaxHighlight: false,
          remarkGfm: true,
          rehypeAutolinkHeadings: true,
        },
        mdx: {
          rehypePlugins: [[
            rehypePrettyCode,
            {
              theme: "dark-plus",
              keepBackground: false,
              onVisitLine(node: any) {
                if (node.children.length === 0) {
                  node.children = [{ type: 'text', value: ' ' }];
                }
              },
              onVisitHighlightedLine(node: any) {
                node.properties = node.properties || {};

                node.properties["data-is-highlighted"] = true;
              },
            }
          ], [rehypeToc, {
            headings: ['h2', 'h3', 'h4'],
            cssClasses: {
              list: 'list-disc'
            },
            customizeTOC: function (toc: any) {
              toc.children.unshift({
                type: 'element',
                tagName: 'h2',
                properties: {
                  id: 'toc',
                },
                children: [{
                  type: 'text',
                  value: 'Table of Contents'
                }]
              });
              
              return toc;
            },
          }]],
        }
      }),
      qwikVite(),
      tsconfigPaths(),
      partytownVite({ dest: join(__dirname, "dist", "~partytown") }),
    ],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    optimizeDeps: {
      include: ["@auth/core"],
    },
  };
});
