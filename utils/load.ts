// deno-lint-ignore-file no-explicit-any
import { parse } from "frontmatter";
import { relative } from "relative";
import { Post } from "../types.d.tsx";

export function loadPost(postsDirectory: string, path: string): [string, Post] {
  let contents = "";
  try {
    contents = Deno.readTextFileSync(path);
  } catch (_e) {
    // ...
  }
  let pathname = "/" + relative(postsDirectory, path);
  pathname = pathname.slice(0, -3);

  const { content, data } = parse(contents) as {
    data: Record<any, any>;
    content: string;
  };

  const post: Post = {
    title: data.title ?? "Untitled",
    date: data.date,
    desc: data.desc,
    tag: data.tag,
    path: data.path ?? pathname,
    md: content,
  };
  return [pathname, post];
}
