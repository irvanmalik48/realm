/** @jsx h */
import { h } from "preact";
import { Post } from "../../types.d.tsx";
import { PageProps, Handlers } from "$fresh/server.ts";
import { tw } from "../../utils/twind.ts";
import { css, apply } from "twind/css";
import { loadPost } from "../../utils/load.ts";
import Markdown from "markdown-to-jsx";
import DefaultLayout from "../../components/DefaultLayout.tsx";

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

export default function PostPage({ data, ...props }: PageProps<Post | null>) {
  const styles = css({
    blockquote: apply`bg-dark-accent-semitrans text-dark-text px-5 py-2 my-2 rounded-xl border-l-4 border-dark-accent-solid`,
    h1: apply`text-2xl rounded-xl font-bold text-dark-text mt-1 mb-3 px-4 py-2 bg-dark-accent-semitrans`,
    "* + h1": apply`my-3`,
    h2: apply`text-xl rounded-xl font-semibold text-dark-text mt-1 mb-3 px-4 py-2 bg-dark-accent-quartertrans`,
    "* + h2": apply`my-3`,
    h3: apply`text-xl font-semibold text-dark-text mt-1 mb-3 pb-1 border-b-2 border-dark-accent-solid`,
    "* + h3": apply`my-3`,
    pre: apply`text-dark-text bg-dark-bg text-sm overflow-x-auto px-5 my-3 py-4 rounded-xl`,
    "pre::-webkit-scrollbar": apply`bg-transparent rounded-xl h-5`,
    "pre::-webkit-scrollbar-thumb": apply`bg-dark-accent-solid border-transparent border-[8px] border-solid bg-clip-content rounded-xl`,
    ol: apply`list-decimal list-inside my-3  ${css({
      p: apply`inline`,
      "::marker": apply`text-dark-accent-solid font-bold`,
      li: apply`my-0`,
      "li:first-child": apply`mt-3`,
    })}`,
    a: apply``,
  });

  if (!data) {
    return <div>Post doesn't exist</div>;
  }
  
  return (
    <DefaultLayout title={data.title} date={data.date} desc={data.desc} tag={data.tag}>
      <header
        class={tw`py-24 w-full flex flex-row justify-center items-center gap-5`}
      >
        <div class={tw`flex flex-col justify-center items-center`}>
          <p class={tw`text-dark-text text-center font-bold text-3xl`}>
            {data.title}
          </p>
          <p class={tw`w-full text-center text-dark-accent-solid text-lg`}>
            {data.date}
          </p>
          <div class={tw`w-full flex flex-row justify-center items-center`}>
            {data.tag.map((el: string, index: number) => (
              <p
                key={index}
                class={tw`bg-dark-accent-solid text-xs text-dark-side uppercase font-semibold px-2.5 py-0.5 mt-1 mb-1 rounded-3xl mr-2`}
              >
                #{el}
              </p>
            ))}
          </div>
        </div>
      </header>
      <Markdown class={tw`${tw(styles)} mb-10 w-full bg-dark-nav py-4 px-5 rounded-xl`}>{data.md}</Markdown>
    </DefaultLayout>
  )
}