import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import * as prod from "react/jsx-runtime";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkFlexibleCodeTitles from "remark-flexible-code-titles";
import remarkFlexibleToc, { type TocItem } from "remark-flexible-toc";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeReact from "rehype-react";

import type { Frontmatter } from "@/lib/types/posts";
import { getMarkdownFromSlug, getMarkdownFiles, getFrontmatter } from "@/lib/fs/posts";
import Container from "@/components/container";
import { TextScroll } from "@/components/ui/text-scroll";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/components/table-of-contents";
import { TableOfContents } from "@/components/table-of-contents";
import { CopyButton } from "@/components/copy-button";
import { MarkdownImage } from "@/components/markdown-image";
import {
  UniversalChart,
  PlotChart,
  FabricWeightChart,
} from "@/components/universal-chart";
import { DirectionalTransition } from "@/components/directional-transition";
import { BlogReactions } from "@/components/blog-reactions";
import { BlogComments } from "@/components/blog-comments";
import { Callout, SpecGrid, SpecItem } from "@/components/callout";

export const instant = false;

interface HastElement {
  type: string;
  tagName?: string;
  value?: string;
  children?: HastElement[];
  properties?: Record<string, unknown>;
}

function rehypeExtractRawCode() {
  return (tree: HastElement) => {
    function traverse(node: HastElement) {
      if (node.type === "element" && node.tagName === "pre") {
        const codeNode = node.children?.find((c) => c.tagName === "code");
        if (codeNode) {
          const extractText = (n: HastElement): string => {
            if (n.type === "text") return n.value || "";
            if (n.children) return n.children.map(extractText).join("");
            return "";
          };
          const rawText = extractText(codeNode);
          node.properties = node.properties || {};
          node.properties["data-raw-code"] = rawText;
        }
      }
      if (node.children) {
        node.children.forEach(traverse);
      }
    }
    traverse(tree);
  };
}

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
    description: frontmatter.description,
  };
}

function normalizeSelfClosingTags(content: string): string {
  return content.replace(
    /<(?!area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr\b)([a-zA-Z0-9_-]+)([^>]*?)\/>/gi,
    "<$1$2></$1>",
  );
}

async function extractHeadings(markdown: string): Promise<Heading[]> {
  "use cache";

  const toc: TocItem[] = [];
  try {
    const normalizedMarkdown = normalizeSelfClosingTags(markdown);
    const processor = unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(remarkGfm)
      .use(remarkFlexibleToc, { tocRef: toc, maxDepth: 3 });
    const ast = processor.parse(normalizedMarkdown);
    await processor.run(ast);
    return toc.map((item) => ({
      id: item.href.replace(/^#/, ""),
      text: item.value,
      level: item.depth,
    }));
  } catch (err) {
    console.error("Failed to extract headings:", err);
    return [];
  }
}

async function renderMarkdown(source: string): Promise<React.ReactNode> {
  "use cache";

  const prettyCodeOptions: PrettyCodeOptions = {
    keepBackground: false,
    theme: "material-theme-darker",
  };

  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkFlexibleCodeTitles)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeExtractRawCode)
    .use(rehypeReact, {
      Fragment: prod.Fragment,
      jsx: prod.jsx,
      jsxs: prod.jsxs,
      components: {
        pre: ({ children, style, ...props }: ComponentPropsWithoutRef<"pre">) => {
          const rawCode =
            ((props as Record<string, unknown>)["data-raw-code"] as string) || "";
          return (
            <div className="relative group">
              <pre style={style} {...props}>
                {children}
              </pre>
              <CopyButton code={rawCode} />
            </div>
          );
        },
        img: MarkdownImage,
        table: ({
          className,
          children,
          ...props
        }: ComponentPropsWithoutRef<"table">) => (
          <div className="not-prose my-6 w-full overflow-x-auto rounded-xl border border-border/70 bg-card/40 backdrop-blur-sm shadow-sm scrollbar-thin">
            <table
              className={cn(
                "w-full min-w-140 text-left text-xs md:text-sm border-collapse",
                className,
              )}
              {...props}
            >
              {children}
            </table>
          </div>
        ),
        thead: ({
          className,
          ...props
        }: ComponentPropsWithoutRef<"thead">) => (
          <thead
            className={cn(
              "bg-muted/60 font-mono text-muted-foreground uppercase text-2xs tracking-wider border-b border-border/70",
              className,
            )}
            {...props}
          />
        ),
        tbody: ({
          className,
          ...props
        }: ComponentPropsWithoutRef<"tbody">) => (
          <tbody
            className={cn("divide-y divide-border/50 font-sans", className)}
            {...props}
          />
        ),
        tr: ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => (
          <tr
            className={cn(
              "transition-colors hover:bg-muted/30 duration-150",
              className,
            )}
            {...props}
          />
        ),
        th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
          <th
            className={cn(
              "p-3.5 font-semibold text-foreground text-left",
              className,
            )}
            {...props}
          />
        ),
        td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
          <td
            className={cn(
              "p-3.5 text-muted-foreground leading-relaxed",
              className,
            )}
            {...props}
          />
        ),
        UniversalChart,
        universalchart: UniversalChart as React.ElementType,
        PlotChart,
        plotchart: PlotChart as React.ElementType,
        FabricWeightChart,
        fabricweightchart: FabricWeightChart as React.ElementType,
        Callout,
        callout: Callout as React.ElementType,
        SpecGrid,
        specgrid: SpecGrid as React.ElementType,
        SpecItem,
        specitem: SpecItem as React.ElementType,
      },
    });

  const normalizedSource = normalizeSelfClosingTags(source);
  const file = await processor.process(normalizedSource);
  return file.result as React.ReactNode;
}

export default async function Post({ params }: Props) {
  const { slug } = await params;

  const result = await getMarkdownFromSlug(slug);

  if (!result) {
    notFound();
  }

  const { source, frontmatter } = result;
  const [content, headings] = await Promise.all([
    renderMarkdown(source),
    extractHeadings(source),
  ]);

  return (
    <DirectionalTransition>
      <div className="relative flex justify-center max-w-7xl mx-auto px-5 gap-10">
        <div className="hidden xl:block w-64 shrink-0">
          <div className="sticky top-24">
            <TableOfContents headings={headings} />
          </div>
        </div>
        <Container
          noPadding={true}
          className="mx-0 max-w-3xl min-w-0 gap-0 relative z-10 bg-background"
        >
          <Button
            variant="ghost"
            className="self-start mb-10"
            render={
              <Link
                href="/blog"
                transitionTypes={["nav-back"]}
                className="flex items-center gap-2"
              />
            }
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Button>
          <h1 className="text-4xl font-bold mb-4 text-center">
            {frontmatter.title}
          </h1>
          <p className="text-muted-foreground mb-4 text-center">
            {frontmatter.description}
          </p>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Published on{" "}
            {new Date(frontmatter.createdAt).toLocaleDateString()}{" "}
            | Last updated on{" "}
            {new Date(frontmatter.updatedAt).toLocaleDateString()}
          </p>
          <article
            className={cn(
              "prose max-w-full dark:prose-invert prose-pre:font-mono prose-code:font-mono prose-headings:scroll-mt-24 pt-5",
            )}
          >
            {content}
          </article>
          <BlogReactions slug={slug} />
          <BlogComments slug={slug} />
        </Container>
      </div>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="YOU'VE REACHED THE END, CUH.  "
      />
    </DirectionalTransition>
  );
}

export async function generateStaticParams() {
  const files = await getMarkdownFiles();

  return files.map((filename) => ({
    slug: filename.replace(/\.mdx?$/, ""),
  }));
}
