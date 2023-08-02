import {
  Resource,
  component$,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import {
  Link,
  type DocumentHeadProps,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { twMerge } from "tailwind-merge";
import { asyncMap } from "~/lib/asyncmap";
import type { Post } from "~/types/definitions";
import { searchPost } from "~/lib/fuzzy";

export default component$(() => {
  const searchingValue = useSignal<string>("");

  const postRes = useResource$(async ({ track }): Promise<Post[]> => {
    const searchValue = track(() => searchingValue.value);
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

    if (searchValue !== "") {
      return searchPost(searchValue.toLowerCase(), posts);
    }

    return posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  });

  return (
    <>
      <section class="w-full max-w-4xl px-5 py-24 mx-auto min-h-screen relative">
        <h1 class="text-3xl md:text-5xl lg:text-6xl w-full mt-24 font-medium font-heading">
          Blog posts
        </h1>
        <p class="mt-5 text-neutral-300 text-lg">All that I've written.</p>
        <input
          type="text"
          placeholder="Search posts..."
          class={twMerge(
            "mt-10 bg-neutral-900 rounded-full w-full px-5 py-3",
            "focus:bg-neutral-800 text-neutral-300 placeholder-neutral-400",
            "placeholder:italic focus:outline-none focus:ring-2",
            "focus:ring-cyan-500 transition my-5"
          )}
          bind:value={searchingValue}
        />
        <Resource
          value={postRes}
          onResolved={(posts) => (
            <div class="flex flex-col gap-5">
              {import.meta.env.PUBLIC_ENV === "development" &&
                posts
                  .filter((post) => post.draft)
                  .map((post) => <PostCard key={post.permalink} {...post} />)}
              {posts
                .filter((post) => !post.draft)
                .map((post) => (
                  <PostCard key={post.permalink} {...post} />
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

export const PostCard = component$((props: Post) => {
  return (
    <Link
      key={props.permalink}
      href={props.permalink}
      class={twMerge(
        "flex flex-col p-5 bg-neutral-900 rounded-xl",
        "group hover:bg-neutral-800 transition relative"
      )}
    >
      <h2 class="text-xl font-medium font-heading truncate">{props.title}</h2>
      <p class="mt-2 text-neutral-300 truncate">{props.desc}</p>
      <p class="mt-2 text-neutral-300 text-sm">{props.date}</p>
      {props.tags.length > 0 && (
        <div class="flex flex-row flex-wrap mt-2">
          {props.tags.map((tag) => (
            <span
              key={tag}
              class={twMerge(
                "px-3 py-1 mr-2 bg-neutral-800 group-hover:bg-neutral-700",
                "rounded-full text-neutral-300 text-xs transition"
              )}
            >
              {tag}
            </span>
          ))}
          {props.draft && (
            <span
              class={twMerge(
                "px-3 py-1 mr-2 bg-yellow-400 group-hover:bg-yellow-300",
                "rounded-full text-neutral-900 text-xs transition"
              )}
              title="This post is still a draft and will not be shown in production"
            >
              draft
            </span>
          )}
        </div>
      )}
    </Link>
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
