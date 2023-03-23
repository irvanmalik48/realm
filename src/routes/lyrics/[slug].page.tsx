import { type PageProps, useSSQ, Head } from "rakkasjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrismPlus from "rehype-prism-plus";
import "../../styles/vsc-dark-plus.css";
import { getLyricBySlug } from "src/lib/lyrics";

interface Params {
  slug: string
}

export default function PostPage(props: PageProps<Params>) {
  const { params: { slug } } = props;

  const query = useSSQ(() => {
    if (typeof slug !== "string") {
      throw new Error("Invalid request");
    }
    return getLyricBySlug(slug);
  });

  return (
    <>
      <Head
        charset="utf-8"
        title={`${query.data?.frontMatter.title} - ${query.data?.frontMatter.artist}`}
        description={`${`${query.data?.frontMatter.title} - ${query.data?.frontMatter.artist}`} - ${query.data?.frontMatter.artist} Lyrics`}

        // Open Graph
        og:title={`${query.data?.frontMatter.title} - ${query.data?.frontMatter.artist}`}
        og:description={`${`${query.data?.frontMatter.title} - ${query.data?.frontMatter.artist}`} - ${query.data?.frontMatter.artist} Lyrics`}
        og:type="website"
        og:url={`https://irvanma.eu.org/lyrics/${slug}`}

        // Twitter
        twitter:card="summary"
        twitter:site="@irvanmalik48"
        twitter:creator="@irvanmalik48"
        twitter:title={`${query.data?.frontMatter.title} - ${query.data?.frontMatter.artist}`}
        twitter:description={`${query.data?.frontMatter.title} - ${query.data?.frontMatter.artist} Lyrics`}
      />
      <article className="max-w-3xl mx-auto w-full py-24 text-neutral-200">
        <h1 className="text-4xl font-heading font-bold w-full pt-8 pb-4">
          {query.data?.frontMatter.title}
        </h1>
        <h2 className="text-2xl font-heading w-full pb-4">
          {query.data?.frontMatter.artist}
        </h2>
        <div className="flex flex-col justify-start items-start pb-12">
          <p className="text-sm pb-2 text-neutral-200 text-opacity-80">
            Published at {query.data?.frontMatter.date}
          </p>
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
