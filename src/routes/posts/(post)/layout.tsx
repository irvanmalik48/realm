import { Slot, component$ } from "@builder.io/qwik";
import { type DocumentHead, useDocumentHead } from "@builder.io/qwik-city";
import { twMerge } from "tailwind-merge";
import { LuMessageSquare } from "@qwikest/icons/lucide";

export default component$(() => {
  const { frontmatter, title } = useDocumentHead();

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
        </div>
        <h2
          class={twMerge(
            "text-xl rounded-full w-fit bg-neutral-900 bg-opacity-20",
            "px-7 py-2 mt-10 mb-3 font-semibold font-heading"
          )}
        >
          Comments
        </h2>
        <div
          class={twMerge(
            "bg-neutral-900 bg-opacity-20 rounded-xl w-full",
            "h-[200px] grid place-content-center px-5 gap-3"
          )}
        >
          <div class="text-neutral-300 mx-auto p-5 rounded-full bg-neutral-950">
            <LuMessageSquare class="w-10 h-10" />
          </div>
          <p class="text-neutral-300 text-center">
            Comments are not yet available.
          </p>
        </div>
      </section>
    </>
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
