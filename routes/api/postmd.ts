import { Handlers } from "$fresh/server.ts";
import { Language, minify } from "minifier";
import { Post } from "@/types.d.tsx";
import { loadContent } from "@utils/load.ts";

const posts = await loadContent("posts/");

export const handler: Handlers = {
  GET(req, _ctx) {
    const url = new URL(req.url);
    const page = new PostApiWithMd(url);
    return page.render();
  },
};

export class PostApiWithMd {
  private url: URL;
  private params: URLSearchParams;

  constructor(url: URL) {
    this.url = url;
    this.params = url.searchParams;
  }

  generate() {
    const postProps: Post[] = [];

    for (const [_key, post] of posts.entries()) {
      postProps.push(post);
    }

    postProps.sort((a, b) => {
      return a.date && b.date && a.date < b.date ? 1 : -1;
    });

    if (this.params.has("tag")) {
      const tag = this.params.get("tag") as string;
      return JSON.stringify(
        postProps.filter((post) => post?.tag?.includes(tag)),
      );
    }

    if (this.params.has("title")) {
      const title = decodeURIComponent(this.params.get("title") as string);
      return JSON.stringify(
        postProps.filter((post) => post?.title?.toLowerCase().includes(title)),
      );
    }

    return JSON.stringify(postProps);
  }

  render() {
    return new Response(minify(Language.JSON, this.generate()), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
