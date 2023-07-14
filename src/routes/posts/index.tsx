import { Resource, component$, useResource$ } from "@builder.io/qwik";
import {
  Link,
  type DocumentHeadProps,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { asyncMap } from "~/lib/asyncmap";

type PostSummary = {
  title: string;
  desc: string;
  date: string;
  permalink: string;
  tags: string[];
  draft: boolean;
};

export const getPosts = async (): Promise<PostSummary[]> => {
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

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
};

export default component$(() => {
  const postRes = useResource$(getPosts);

  return (
    <>
      <section class="w-full max-w-4xl px-5 py-24 mx-auto min-h-screen relative">
        <h1 class="text-3xl md:text-5xl lg:text-6xl w-full mt-24 font-medium font-heading">
          Blog posts
        </h1>
        <p class="mt-5 text-neutral-300 text-lg">All that I've written.</p>
        <Resource
          value={postRes}
          onResolved={(posts) => (
            <div class="flex flex-col mt-10 border-y border-neutral-800 divide-y divide-neutral-800">
              {posts.map((post) => (
                <Link
                  key={post.permalink}
                  href={post.permalink}
                  class="flex flex-col p-5 hover:bg-neutral-900 hover:bg-opacity-20 transition"
                >
                  <h2 class="text-xl font-medium font-heading truncate">
                    {post.title}
                  </h2>
                  <p class="mt-2 text-neutral-300 truncate">{post.desc}</p>
                  <p class="mt-2 text-neutral-300 text-sm">{post.date}</p>
                  {post.tags.length > 0 && (
                    <div class="flex flex-row flex-wrap mt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          class="px-3 py-1 mr-2 bg-neutral-800 rounded-full text-neutral-300 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        />
        <p class="mt-10 text-neutral-300 text-center">
          Every post is written in{" "}
          <a
            href="https://mdxjs.com/"
            class="hover:text-neutral-100 transition underline underline-offset-2"
          >
            MDX
          </a>{" "}
          and licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            class="hover:text-neutral-100 transition underline underline-offset-2"
          >
            CC BY-NC-SA 4.0
          </a>
        </p>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Posts",
  meta: [
    {
      name: "description",
      content: "Posts I've made",
    },
    {
      name: "og:title",
      content: "Posts",
    },
    {
      name: "og:description",
      content: "Posts I've made",
    },
  ],
};
