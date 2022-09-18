import { Handlers } from "$fresh/server.ts";
import { SitemapContext } from "fresh-seo";
import { Post } from "@/types.d.tsx";
import manifest from "@/fresh.gen.ts";
import { loadContent } from "@utils/load.ts";

const postDir = "posts/";

const posts = await loadContent(postDir);

export const handler: Handlers = {
  GET(_req, _ctx) {
    const sitemap = new SitemapContext("https://www.irvanma.me", manifest);

    const postProps: Post[] = [];

    for (const [_key, post] of posts.entries()) {
      postProps.push(post);
    }

    postProps.sort((a, b) => {
      return a.date && b.date && a.date < b.date ? 1 : -1;
    });

    postProps.map((el) => {
      sitemap.add(`/posts${el.path}`);
    });

    return sitemap.render();
  },
};
