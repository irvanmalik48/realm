import { Handlers } from "$fresh/server.ts";

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
    const welcome = {
      title: "Welcome to IrvanMA's Realm API Index Page!",
      desc: "This is a simple API Index Page for IrvanMA's Realm.",
      url: this.url.protocol + "//" + this.url.host + "/",
      locations: {
        post: this.url.protocol + "//" + this.url.host + "/api/post",
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
