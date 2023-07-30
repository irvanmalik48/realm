import type { DocumentHeadProps, RequestHandler } from "@builder.io/qwik-city";
import { asyncMap } from "~/lib/asyncmap";

export const onGet: RequestHandler = async (req) => {
  const modules = import.meta.glob("/src/routes/**/**/index.mdx");
  const posts = await asyncMap(Object.keys(modules), async (path) => {
    const data = (await modules[path]()) as DocumentHeadProps;

    return {
      title: data.head.title,
      desc: data.head.frontmatter.desc,
      date: data.head.frontmatter.date,
      permalink: data.head.frontmatter.permalink,
      tags: data.head.frontmatter.tags,
      draft: data.head.frontmatter.draft,
    };
  });

  const res = posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  req.json(200, res);
};
