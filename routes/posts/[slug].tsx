// deno-lint-ignore-file no-explicit-any
/** @jsx h */
import { h } from "preact";
import { Post } from "@/types.d.tsx";
import { PageProps, Handlers } from "$fresh/server.ts";
import { tw } from "@utils/twind.ts";
import { css, apply } from "twind/css";
import { loadContent, loadPost } from "@utils/load.ts";
import { Prism } from "rsh";
import * as Themes from "rsh/dist/esm/styles/prism";
import Markdown from "markdown-to-jsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import { syntaxHighlighterTheme } from "@utils/colors.ts";

const postDir = "posts/";

const posts = await loadContent(postDir);

export const handler: Handlers<Post | null> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;

    const [, check] = await loadPost(postDir, `${postDir}${slug}.md`);

    if (check == null) {
      return ctx.render(null);
    }

    return ctx.render(check);
  },
};

function CodeBlock(props: {
  className: string;
  children: h.JSX.Element | h.JSX.Element[] | string;
}) {
  let lang = "text";
  if (props.className && props.className.startsWith("lang-")) {
    lang = props.className.replace("lang-", "");
  }
  return (
    <Prism language={lang} style={Themes[syntaxHighlighterTheme]} showLineNumbers showInlineLineNumbers>
      {props.children}
    </Prism>
  );
}

function PreBlock(props: any) {
  if ("type" in props.children && props.children["type"] === "code") {
    return CodeBlock(props.children.props);
  }
  return <pre {...props.rest}>{props.children}</pre>;
}

export default function PostPage({ data, ...props }: PageProps<Post | null>) {
  const postProps: any[] = [];

  for (const [_key, post] of posts.entries()) {
    postProps.push(post);
  }

  postProps.sort((a: any, b: any) => {
    return a["date"] < b["date"] ? 1 : -1;
  });

  const position = postProps.findIndex((object) => {
    return object.path === data?.path;
  });
  const after = position === postProps.length - 1 ? -1 : position + 1;
  const before = position === 0 ? -1 : position - 1;

  const prevPost = postProps[before];
  const nextPost = postProps[after];

  const styles = css({
    blockquote: apply`bg-dark-accent-semitrans text-dark-text px-5 py-2 my-2 rounded-xl border-l-4 border-dark-accent-solid`,
    h1: apply`text-2xl rounded-xl font-bold text-dark-text mt-1 mb-3 px-4 py-2 bg-dark-accent-semitrans font-heading`,
    "* + h1": apply`my-3`,
    h2: apply`text-xl rounded-xl font-semibold text-dark-text mt-1 mb-3 px-4 py-2 bg-dark-accent-quartertrans font-heading`,
    "* + h2": apply`my-3`,
    h3: apply`text-xl font-semibold text-dark-text mt-1 mb-3 pb-1 border-b-2 border-dark-accent-solid font-heading`,
    "* + h3": apply`my-3`,
    pre: apply`text-dark-text font-mono bg-dark-bg text-sm overflow-x-auto px-5 my-3 py-4 rounded-xl ${css(
      {
        code: apply`bg-transparent font-mono text-dark-text p-0 m-0 font-normal`,
      }
    )}`,
    "pre::-webkit-scrollbar": apply`bg-transparent rounded-xl h-5`,
    "pre::-webkit-scrollbar-thumb": apply`bg-dark-accent-solid border-transparent border-[8px] border-solid bg-clip-content rounded-xl`,
    ol: apply`list-decimal list-inside my-3  ${css({
      p: apply`inline`,
      "::marker": apply`text-dark-accent-solid font-bold`,
      li: apply`my-0`,
      "li:first-child": apply`mt-3`,
    })}`,
    a: apply`text-dark-accent-solid hover:text-dark-text transition-all ease-linear duration-200 break-all`,
    ul: apply`list-disc list-inside my-3 ${css({
      ul: apply`list-none mt-0`,
    })}`,
    img: apply`w-full h-auto transition-all duration-200 ease-linear ring ring-transparent hover:ring-dark-accent-solid rounded-xl`,
    code: apply`font-mono bg-dark-accent-quartertrans text-sm text-dark-accent-solid font-semibold px-2.5 py-0.5 my-1 rounded-3xl`,
    "span.linenumber": apply`inline-block min-w-[2.5rem] border-r-4 border-dark-accent-semitrans mr-4`,
  });

  if (!data || data?.title === "Undefined") {
    return (
      <DefaultLayout
        title="Page not found"
        desc="The page you're looking for is not found."
      >
        <header
          className={tw`py-24 w-full flex flex-row justify-center items-center gap-5`}
        >
          <div className={tw`flex flex-col justify-center items-center`}>
            <p
              className={tw`text-dark-text text-center font-bold text-4xl mb-2 font-heading`}
            >
              404
            </p>
            <p
              className={tw`w-full text-center text-dark-accent-solid text-lg`}
            >
              Page{" "}
              <code
                className={tw`font-mono bg-dark-accent-quartertrans text-sm text-dark-accent-solid font-semibold px-2.5 py-0.5 my-1 rounded-3xl`}
              >
                {data?.path?.replace(".md", "")}
              </code>{" "}
              not found.
            </p>
          </div>
        </header>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout
      title={data.title}
      date={data.date}
      desc={data.desc}
      tag={data.tag}
    >
      <header
        className={tw`py-24 w-full flex flex-row justify-center items-center gap-5`}
      >
        <div className={tw`flex flex-col justify-center items-center`}>
          <p className={tw`text-dark-text text-center font-bold text-3xl`}>
            {data.title}
          </p>
          <p className={tw`w-full text-center text-dark-accent-solid text-lg`}>
            {data.date}
          </p>
          <div className={tw`w-full flex flex-row justify-center items-center`}>
            {data.tag?.map((el: string, index: number) => (
              <p
                key={index}
                className={tw`bg-dark-accent-solid text-xs text-dark-side uppercase font-semibold px-2.5 py-0.5 mt-1 mb-1 rounded-3xl mr-2`}
              >
                {el}
              </p>
            ))}
          </div>
        </div>
      </header>
      <Markdown
        class={tw`${tw(styles)} mb-5 w-full bg-dark-nav py-4 px-5 rounded-xl`}
        options={{
          overrides: {
            pre: PreBlock,
          },
        }}
      >
        {data.md !== undefined ? data.md : ""}
      </Markdown>
      <div
        className={tw`grid grid-cols-1 md:grid-cols-2 w-full gap-5 mb-5 bg-dark-nav p-5 rounded-xl`}
      >
        {before !== -1 && (
          <a
            href={"/posts" + prevPost.path}
            className={tw`overflow-hidden ring ring-transparent flex flex-col justify-between block w-full bg-dark-accent-quartertrans rounded-xl hover:bg-dark-accent-semitrans hover:ring-dark-accent-solid transition-all duration-200 ease-linear text-dark-text box-border`}
          >
            <div className={tw`px-5 py-1 bg-dark-accent-solid`}>
              <p
                className={tw`font-mono font-bold text-sm text-dark-nav w-full`}
              >
                NEWER POST
              </p>
            </div>
            <div className={tw`px-5 pt-3`}>
              <p
                className={tw`text-dark-accent-solid font-semibold font-heading`}
              >
                {prevPost.title}
              </p>
              <p className={tw`text-dark-text text-xs mb-2`}>{prevPost.date}</p>
              <p className={tw`text-dark-text text-sm mb-1`}>{prevPost.desc}</p>
            </div>
            <div className={tw`box-border px-5 pb-3 flex-wrap flex flex-row`}>
              {prevPost.tag.map((el: string, index: any) => (
                <p
                  key={index}
                  className={tw`bg-dark-accent-solid text-xs text-dark-side uppercase font-semibold px-2.5 py-0.5 mt-1 mb-1 rounded-3xl mr-2`}
                >
                  {el}
                </p>
              ))}
            </div>
          </a>
        )}
        {before === -1 && <div></div>}
        {after !== -1 && (
          <a
            href={"/posts" + nextPost.path}
            className={tw`overflow-hidden ring ring-transparent flex flex-col justify-between block w-full bg-dark-accent-quartertrans rounded-xl hover:bg-dark-accent-semitrans hover:ring-dark-accent-solid transition-all duration-200 ease-linear text-dark-text box-border`}
          >
            <div className={tw`px-5 py-1 bg-dark-accent-solid`}>
              <p
                className={tw`font-mono font-bold text-sm text-dark-nav w-full`}
              >
                OLDER POST
              </p>
            </div>
            <div className={tw`px-5 pt-3`}>
              <p
                className={tw`text-dark-accent-solid font-semibold font-heading`}
              >
                {nextPost.title}
              </p>
              <p className={tw`text-dark-text text-xs mb-2`}>{nextPost.date}</p>
              <p className={tw`text-dark-text text-sm mb-1`}>{nextPost.desc}</p>
            </div>
            <div className={tw`box-border px-5 pb-3 flex-wrap flex flex-row`}>
              {nextPost.tag.map((el: string, index: any) => (
                <p
                  key={index}
                  className={tw`bg-dark-accent-solid text-xs text-dark-side uppercase font-semibold px-2.5 py-0.5 mt-1 mb-1 rounded-3xl mr-2`}
                >
                  {el}
                </p>
              ))}
            </div>
          </a>
        )}
        {after === -1 && <div></div>}
      </div>
    </DefaultLayout>
  );
}
