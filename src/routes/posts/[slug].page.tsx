import { type PageProps, useSSQ, Head } from "rakkasjs";
import { getPostBySlug } from "src/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrismPlus from "rehype-prism-plus";
import "../../styles/vsc-dark-plus.css";

interface Params {
  slug: string
}

export default function PostPage(props: PageProps<Params>) {
  const { params: { slug } } = props;

  const query = useSSQ(() => {
    if (typeof slug !== "string") {
      throw new Error("Invalid request");
    }
    return getPostBySlug(slug);
  });

  return (
    <>
      <Head
        charset="utf-8"
        title={query.data?.frontMatter.title}
        description={query.data?.frontMatter.description}

        // Open Graph
        og:title={query.data?.frontMatter.title}
        og:description={query.data?.frontMatter.description}
        og:type="website"
        og:url={`https://irvanma.eu.org/posts/${slug}`}

        // Twitter
        twitter:card="summary"
        twitter:site="@irvanmalik48"
        twitter:creator="@irvanmalik48"
        twitter:title={query.data?.frontMatter.title}
        twitter:description={query.data?.frontMatter.description}
      />
      <article className="max-w-3xl mx-auto w-full py-24 text-neutral-200">
        <h1 className="text-4xl font-heading font-bold w-full pt-8 pb-4">
          {query.data?.frontMatter.title}
        </h1>
        <div className="flex flex-col justify-start items-start pb-12">
          <p className="text-sm pb-2 text-neutral-200 text-opacity-80">
            Published at {query.data?.frontMatter.date}
          </p>
          <div className="flex items-center flex-wrap gap-2">
            {
              query.data?.frontMatter.tags.map((tag) => {
                return (
                  <span className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-200">
                    {tag}
                  </span>
                );
              })
            }
          </div>
        </div>
        <ReactMarkdown
          className="prose prose-invert prose-headings:text-neutral-200 rounded border prose-img:rounded prose-img:border prose-img:border-neutral-700 prose-img:w-full prose-img:max-h-72 prose-img:object-contain prose-img:bg-neutral-900 border-neutral-700 bg-neutral-800 max-w-full prose-headings:pb-2 prose-headings:border-b prose-headings:border-neutral-700 px-4 py-3 prose-pre:rounded prose-pre:scrollbar-thin prose-pre:scrollbar-track-neutral-700 prose-pre:scrollbar-thumb-neutral-500"
          remarkPlugins={[
            remarkGfm,
          ]}
          rehypePlugins={[
            rehypePrismPlus,
          ]}
        >
          {query.data?.content}
        </ReactMarkdown>
      </article>
    </>
  );
}
