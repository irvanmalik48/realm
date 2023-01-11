import { getProjectSlug, getSortedProjectSlugs } from "u/projects";
import { MDXComponent } from "c/MDXComponent";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import codeTitle from "u/rehypeCodeTitle";
import { ArticleJsonLd } from "next-seo";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const content = getProjectSlug(slug);
  const source = await serialize(content.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        codeTitle,
        rehypePrism,
        rehypeSlug,
        rehypeAutolinkHeadings,
      ],
    },
  });

  return (
    <>
      <img
        src="/misc/lottie.svg"
        className="w-48 absolute left-0 top-0 hidden lg:block"
      />
      <main className="relative prose prose-img:w-full prose-invert prose-code:font-mono prose-pre:rounded-xl prose-headings:font-heading prose-headings:border-b-2 prose-headings:border-neutral-800 prose-h2:py-3 prose-h3:py-3 prose-h4:py-3 prose-h5:py-3 prose-img:rounded-xl prose-img:border-2 prose-img:border-neutral-800 prose-h1:text-center py-48 mx-auto max-w-4xl px-5">
        <h1 className="rounded-xl text-3xl p-5 border-2 border-neutral-800 mb-0">
          {content.frontmatter.title}
        </h1>
        <div className="flex gap-3 lg:gap-0 flex-col-reverse lg:flex-row justify-center lg:justify-between items-start lg:items-center py-1 mt-3 relative">
          <p className="my-0 font-display font-semibold w-full text-center lg:w-fit lg:text-start">
            {content.frontmatter.gh === "private" ? (
              "Private"
            ) : (
              <a href={content.frontmatter.gh}>Visit GitHub</a>
            )}
          </p>
          <div className="flex flex-row flex-wrap justify-center mt-2 lg:mt-0 overflow-x-scroll w-full lg:w-fit items-center gap-3 scrollbar-none">
            {content.frontmatter.tag.map((tag: string) => (
              <p
                key={tag}
                className="my-0 w-fit uppercase bg-teal-300 bg-opacity-40 px-2.5 rounded-full py-0.5 text-white text-xs font-heading font-semibold"
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
        <img src={content.frontmatter.screenshot} className="w-full" />
        <MDXComponent source={source} />
      </main>
      <ArticleJsonLd 
        useAppDir={true}
        type="BlogPosting"
        url={`https://www.irvanma.me/posts/${slug}`}
        title={content.frontmatter.title}
        datePublished={content.frontmatter.date}
        dateModified={content.frontmatter.date}
        authorName={[
          {
            name: "Irvan Malik",
            url: "https://www.irvanma.me",
          }
        ]}
        images={[
          content.frontmatter.screenshot
        ]}
        description={content.frontmatter.desc}
        isAccessibleForFree={true}
      />
    </>
  );
}

export async function generateStaticParams() {
  const projects = getSortedProjectSlugs();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
