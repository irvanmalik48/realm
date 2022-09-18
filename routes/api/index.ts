import { Handlers } from "$fresh/server.ts";
import { IndexAPIResponse } from "@/types.d.tsx";

export const handler: Handlers = {
  GET(req, _ctx) {
    const url = new URL(req.url);
    const page = new PostApi(url);
    return page.render();
  },
};

export class PostApi {
  private url: URL;
  private params: URLSearchParams;

  constructor(url: URL) {
    this.url = url;
    this.params = url.searchParams;
  }

  generate() {
    const welcome: IndexAPIResponse = {
      title: "Welcome to IrvanMA's Realm API Index Page!",
      desc: "This is a simple API Index Page for IrvanMA's Realm.",
      url: this.url.protocol + "//" + this.url.host + "/",
      repo: "https://github.com/irvanmalik48/realm",
      locations: {
        index: {
          url: this.url.protocol + "//" + this.url.host + "/api",
          desc: "This page.",
        },
        post: {
          url: this.url.protocol + "//" + this.url.host + "/api/post",
          desc: "Get all posts from IrvanMA's Realm (slug only).",
        },
        postmd: {
          url: this.url.protocol + "//" + this.url.host + "/api/postmd",
          desc: "Get all posts from IrvanMA's Realm (with markdown).",
        },
      },
    };

    return JSON.stringify(welcome, null, 2);
  }

  render() {
    return new Response(this.generate(), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
