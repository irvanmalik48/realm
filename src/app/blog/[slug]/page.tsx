import type { Metadata } from "next";
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import { readingTime } from "reading-time-estimator";

import remarkGfm from "remark-gfm";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkFlexibleCodeTitles from "remark-flexible-code-titles";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { Options } from "rehype-pretty-code";

import type { Frontmatter } from "@/lib/types/posts";
import { getMarkdownFromSlug, getMarkdownFiles } from "@/lib/fs/posts";
import { getFrontmatter } from "next-mdx-remote-client/utils";
import Container from "@/components/container";
import { TextScroll } from "@/components/ui/text-scroll";
import { Link } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const file = await getMarkdownFromSlug(slug);

  if (!file) return {};

  const { frontmatter } = getFrontmatter<Frontmatter>(file.source);

  return {
    title: frontmatter.title ?? "Article",
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;

  const result = await getMarkdownFromSlug(slug);

  if (!result) {
    return <p>Post not found</p>;
  }

  const { source, format } = result;

  const prettyCodeOptions: Options = {
    keepBackground: false,
    theme: "material-theme-darker",
  };

  const options: MDXRemoteOptions = {
    disableImports: true,
    parseFrontmatter: true,
    scope: {
      readingTime: readingTime(source, 100).text,
    },
    mdxOptions: {
      format,
      remarkPlugins: [
        remarkGfm,
        remarkFlexibleToc,
        remarkFlexibleCodeTitles,
        remarkParse,
        remarkRehype,
      ],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [rehypePrettyCode, prettyCodeOptions],
        rehypeStringify,
      ],
    },
    vfileDataIntoScope: "toc",
  };

  return (
    <>
      <Container className="gap-0">
        <Button asChild variant="ghost" className="self-start mb-10">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>
        </Button>
        <h1 className="text-4xl font-bold mb-4 text-center">
          {getFrontmatter<Frontmatter>(source).frontmatter.title}
        </h1>
        <p className="text-muted-foreground mb-4 text-center">
          {getFrontmatter<Frontmatter>(source).frontmatter.description}
        </p>
        <p className="text-sm text-muted-foreground mb-4 text-center">
          Published on{" "}
          {new Date(
            getFrontmatter<Frontmatter>(source).frontmatter.createdAt
          ).toLocaleDateString()}{" "}
          | Last updated on{" "}
          {new Date(
            getFrontmatter<Frontmatter>(source).frontmatter.updatedAt
          ).toLocaleDateString()}
        </p>
        <article
          className={cn(
            "prose max-w-full dark:prose-invert prose-pre:font-mono prose-code:font-mono pt-5"
          )}
        >
          <MDXRemote source={source} options={options} />
        </article>
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="YOU'VE REACHED THE END, CUH.  "
      />
    </>
  );
}

export async function generateStaticParams() {
  const files = getMarkdownFiles();

  return files.map((filename) => ({
    slug: filename.replace(/\.(?=[^.]*$)/, "-"),
  }));
}
