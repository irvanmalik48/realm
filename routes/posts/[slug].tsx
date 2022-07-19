/** @jsx h */
import { h } from "preact";
import { Post } from "../../types.d.tsx";
import { PageProps, Handlers } from "$fresh/server.ts";
import { tw } from "../../utils/twind.ts";
import { css, apply } from "twind/css";
import { loadPost } from "../../utils/load.ts";

const postDir = "posts/";

export const handler: Handlers<Post | null> = {
  GET(_, ctx) {
    const { slug } = ctx.params;

    const [, check] = loadPost(
      postDir,
      `${postDir}${slug}.md`
    )

    if (check == null) {
      return ctx.render(null);
    }

    return ctx.render(check);
  },
};

export default function PostPage({ data, ...props }: PageProps<{post: Post, result: string} | null>) {
  console.log(data);
  console.log(props);
}