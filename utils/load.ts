// deno-lint-ignore-file no-explicit-any
import { parse } from "frontmatter";
import { relative } from "relative";
import { Post } from "../types.d.tsx";

export async function loadPost(postsDirectory: string, path: string): Promise<[string,Post]> {
  let contents = "";
  try {
    contents = await Deno.readTextFile(path);
  } catch (_e) {
    return [path, {
      title: "Undefined",
      date: "Undefined",
      desc: "Undefined",
      tag: ["Undefined"],
      path: path,
      md: "Undefined",
    }];
  }
  
  let pathname = "/" + relative(postsDirectory, path);
  pathname = pathname.slice(0, -3);

  const { content, data } = parse(contents) as {
    data: Record<any, any>;
    content: string;
  };

  const post: Post = {
    title: data.title,
    date: data.date,
    desc: data.desc,
    tag: data.tag,
    path: data.path ?? pathname,
    md: content,
  };

  return [pathname, post];
}