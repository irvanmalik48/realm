import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import Markdown from "markdown-to-jsx";
import { Projects } from "@/types.d.tsx";
import PreBlock from "@components/PreBlock.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import { apply, css, tw } from "@utils/twind.ts";
import { loadProject, loadShowcases } from "@utils/load.ts";
import Counter from "@components/Counter.tsx";
import { Button } from "@components/Button.tsx";

const projectDir = "projects/";

const projects = await loadShowcases(projectDir);

export const handler: Handlers<Projects | null> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;

    const [, check] = await loadProject(projectDir, `${projectDir}${slug}.md`);

    if (check == null) {
      return ctx.render(null);
    }

    return ctx.render(check);
  },
};

export default function ProjectsPage(
  { data, ...props }: PageProps<Projects | null>,
) {
  const projectProps: Projects[] = [];

  for (const [_key, projectObj] of projects.entries()) {
    projectProps.push(projectObj);
  }

  const styles = css({
    blockquote:
      apply`bg-dark-accent-semitrans text-dark-text px-5 py-2 my-2 rounded-xl border-l-4 border-dark-accent-solid`,
    h1:
      apply`text-2xl rounded-xl font-bold text-dark-text mt-1 mb-3 px-4 py-2 bg-dark-accent-semitrans font-heading`,
    "* + h1": apply`my-3`,
    h2:
      apply`text-xl rounded-xl font-semibold text-dark-text mt-1 mb-3 px-4 py-2 bg-dark-accent-quartertrans font-heading`,
    "* + h2": apply`my-3`,
    h3:
      apply`text-xl font-semibold text-dark-text mt-1 mb-3 pb-1 border-b-2 border-dark-accent-solid font-heading`,
    "* + h3": apply`my-3`,
    pre:
      apply`text-dark-text font-mono bg-dark-bg text-sm overflow-x-auto px-5 my-0 py-4 rounded-xl ${
        css(
          {
            code:
              apply`bg-transparent font-mono text-dark-text p-0 m-0 font-normal`,
          },
        )
      }`,
    "pre::-webkit-scrollbar": apply`bg-transparent rounded-xl h-5`,
    "pre::-webkit-scrollbar-thumb":
      apply`bg-dark-accent-solid border-transparent border-[8px] border-solid bg-clip-content rounded-xl`,
    ol: apply`list-decimal list-inside my-3 ${
      css({
        p: apply`inline`,
        "::marker": apply`text-dark-accent-solid font-bold`,
        li: apply`my-0`,
        "li:first-child": apply`mt-0`,
        ul: apply`ml-6`,
        ol: apply`ml-6`,
      })
    }`,
    a: apply`text-dark-accent-solid hover:text-dark-text transition-all ease-out duration-200 break-all`,
    ul: apply`list-disc list-inside my-0 ${
      css({
        ul: apply`ml-6`,
        ol: apply`ml-6`,
        "li::marker":
          apply`text-dark-accent-semitrans transition-all duration-200 ease-out`,
        "li:hover::marker": apply`text-dark-accent-solid`,
      })
    }`,
    img:
      apply`w-full h-auto transition-all duration-200 ease-out ring ring-transparent hover:ring-dark-accent-solid rounded-xl`,
    code:
      apply`font-mono bg-dark-accent-quartertrans text-sm text-dark-accent-solid font-semibold px-2.5 py-0.5 my-1 rounded-3xl`,
    "span.linenumber":
      apply`hidden md:inline-block min-w-[2.5rem] border-r-4 border-dark-accent-semitrans mr-4`,
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
      title={data.title as string}
      desc={data.desc}
      tag={data.stack}
      active={data.path}
    >
      <header
        className={tw`py-24 w-full flex flex-row justify-center items-center gap-5`}
      >
        <div className={tw`flex flex-col justify-center items-center`}>
          <img
            src={asset(data.screenshot as string)}
            className={tw`xl:w-1/2 mb-5 rounded-xl border-[.125rem] border-dark-accent-semitrans`}
            alt="Project Image"
          />
          <p
            className={tw`text-dark-text text-center font-heading font-bold text-5xl mb-2`}
          >
            {data.title}
          </p>
          <div
            className={tw`w-full flex flex-row justify-center items-center mb-3`}
          >
            {data.stack?.map((el: string, index: number) => (
              <p
                key={index}
                className={tw`font-mono bg-dark-accent-solid text-xs text-dark-side uppercase font-semibold px-2.5 py-0.5 mt-1 mb-1 rounded-3xl mr-2`}
              >
                {el}
              </p>
            ))}
          </div>
          <div
            className={tw`w-full flex flex-row justify-center gap-5 items-center`}
          >
            {data?.link !== "none" && (
              <Button type="anchor" href={data.link}>
                Visit site
              </Button>
            )}
            {data?.gh !== "private" && (
              <Button type="anchor" href={data.gh}>
                GitHub repo
              </Button>
            )}
          </div>
        </div>
      </header>
      <Markdown
        class={tw`${
          tw(styles)
        } mb-5 w-full bg-dark-navglass py-4 px-5 rounded-xl ${
          css(
            {
              "-webkit-backdrop-filter": "blur(.5rem)",
              "backdrop-filter": "blur(.5rem)",
            },
          )
        }`}
        options={{
          overrides: {
            pre: PreBlock,
            Counter: Counter,
          },
          wrapper: "article",
          forceWrapper: true,
        }}
      >
        {data.md !== undefined ? data.md : ""}
      </Markdown>
    </DefaultLayout>
  );
}
