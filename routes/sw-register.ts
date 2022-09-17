import { Handlers } from "$fresh/server.ts";
import { Language, minify } from "minifier";

export const handler: Handlers = {
  GET(_req, _ctx) {
    const page = new RealmServiceWorkerRegister();
    return page.render();
  },
};

export class RealmServiceWorkerRegister {
  generate() {
    return /* javascript */ `import "https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate";

    const el = document.createElement("pwa-update");
    el.setAttribute("swpath", "sw");
    document.body.appendChild(el);
    `;
  }

  render() {
    return new Response(minify(Language.JS, this.generate()), {
      headers: { "Content-Type": "text/javascript" },
    });
  }
}
