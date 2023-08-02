import { Slot, component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  useDocumentHead,
  routeLoader$,
} from "@builder.io/qwik-city";
import { twMerge } from "tailwind-merge";
import type { Post } from "~/types/definitions";
import { PostCard } from "..";
import { LuTornado } from "@qwikest/icons/lucide";

export const usePrevNext = routeLoader$(async (req) => {
  const parseUrl = "".concat(req.url.origin, "/api/v1/posts");
  const posts: Post[] = await fetch(parseUrl).then((res) => res.json());

  const currentPost = posts.find((post) => post.permalink === req.url.pathname);

  if (!currentPost) {
    return {
      prev: null,
      next: null,
    };
  }

  const currentIndex = posts.indexOf(currentPost);

  const prev = posts[currentIndex - 1] || null;
  const next = posts[currentIndex + 1] || null;

  return {
    prev,
    next,
  };
});

export default component$(() => {
  const { frontmatter, title } = useDocumentHead();
  const prevNext = usePrevNext();

  const proseStuff = twMerge(
    "w-full prose mt-10 max-w-full prose-invert prose-lg prose-headings:mb-6",
    "prose-headings:font-heading prose-headings:text-neutral-100",
    "prose-p:text-neutral-300 prose-headings:font-semibold mt-10",
    "prose-headings:w-full prose-headings:border-b prose-headings:pb-3",
    "prose-headings:border-neutral-700 prose-h2:text-3xl",
    "prose-code:break-words prose-a:break-words prose-pre:rounded-xl",
    "prose-pre:scrollbar-thin prose-pre:scrollbar-thumb-neutral-700",
    "prose-pre:scrollbar-track-neutral-900 prose-pre:font-mono"
  );

  return (
    <>
      <section class="w-full max-w-4xl px-5 py-24 mx-auto min-h-screen relative">
        <h1 class="text-3xl md:text-5xl w-full mt-24 font-medium font-heading">
          {title.replace("realm | ", "")}
        </h1>
        <div
          class={twMerge(
            "flex flex-col lg:flex-row-reverse gap-2 w-full",
            "justify-between lg:items-center px-5 py-3 rounded-xl",
            "mt-5 bg-neutral-900"
          )}
        >
          <date class="text-neutral-100 px-3 py-1 rounded-full bg-neutral-950 block w-fit">
            {frontmatter.date}
          </date>
          <p class="text-neutral-300 line-clamp-2 lg:line-clamp-1">
            {frontmatter.desc}
          </p>
        </div>
        <div class={proseStuff}>
          <Slot />
          <h2>Read More</h2>
          <p>If you enjoyed this post, try some other ones:</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 mb-24">
          {prevNext.value.prev ? (
            <PostCard {...prevNext.value.prev} />
          ) : (
            <NoMoreItem text="You're at the newest post already, jeez." />
          )}
          {prevNext.value.next ? (
            <PostCard {...prevNext.value.next} />
          ) : (
            <NoMoreItem text="You're at the oldest post already, jeez." />
          )}
        </div>
      </section>
    </>
  );
});

export const NoMoreItem = component$((props: { text: string }) => {
  return (
    <div class="min-h-[160px] w-full text-sm flex flex-col gap-3 items-center justify-center p-5 bg-neutral-900/20 rounded-xl text-neutral-500">
      <LuTornado class="w-12 h-12 mx-auto" />
      {props.text}
    </div>
  );
});

export const head: DocumentHead = ({ head }) => {
  return {
    title: head.title,
    meta: [
      {
        name: "description",
        content: head.frontmatter.desc ?? "No description",
      },
      {
        name: "og:title",
        content: head.title,
      },
      {
        name: "og:description",
        content: head.frontmatter.desc ?? "No description",
      },
    ],
  };
};
