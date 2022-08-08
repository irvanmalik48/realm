import { parse } from "frontmatter";
import { relative } from "relative";
import { Post } from "@/types.d.tsx";
import { walk } from "walk";
import { Any } from "any";

export async function loadPost(
  postsDirectory: string,
  path: string
): Promise<[string, Post]> {
  let contents = "";
  try {
    contents = await Deno.readTextFile(path);
  } catch (_e) {
    return [
      path,
      {
        title: "Undefined",
        date: "Undefined",
        desc: "Undefined",
        tag: ["Undefined"],
        path: path,
        md: "Undefined",
      },
    ];
  }

  let pathname = "/" + relative(postsDirectory, path);
  pathname = pathname.slice(0, -3);

  const { content, data } = parse(contents) as {
    data: Any;
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

export async function loadContent(postsDirectory: string) {
  const posts = new Map<string, Post>();
  for await (const entry of walk(postsDirectory)) {
    if (entry.isFile && entry.path.endsWith(".md")) {
      const [key, post]: [string, Post] = await loadPost(
        postsDirectory,
        entry.path
      );
      posts.set(key, post);
    }
  }
  return posts;
}
