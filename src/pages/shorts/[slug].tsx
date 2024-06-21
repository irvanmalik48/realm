import { ReaderIcon } from "@radix-ui/react-icons";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

import ShadcnProse from "@/components/custom/shadcn-prose";
import DefaultLayout from "@/components/layout/default";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { SHORTS_PATH, shortFilePaths } from "@/content/const";
import { cn } from "@/lib/utils";

type Short = {
  title: string;
  createdAt: string;
  updatedAt: string;
};

interface ShortMatter {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  frontMatter: Short;
}

export default function Post({ short }: { short: ShortMatter }) {
  return (
    <DefaultLayout
      templateTitle={false}
      title={short.frontMatter.title}
      description={"No description."}
    >
      <div className="w-full min-h-screen flex flex-col py-24">
        <section
          className={cn(
            "w-full max-w-3xl relative p-5",
            "mx-auto flex flex-col gap-6",
          )}
        >
          <p className="text-xs md:text-sm w-full text-muted-foreground md:text-center">
            {short.frontMatter.createdAt === short.frontMatter.updatedAt ? (
              <span>
                Published on{" "}
                <time dateTime={short.frontMatter.createdAt}>
                  {new Date(short.frontMatter.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>
              </span>
            ) : (
              <span>
                Published on{" "}
                <time dateTime={short.frontMatter.createdAt}>
                  {new Date(short.frontMatter.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>{" "}
                and updated on{" "}
                <time dateTime={short.frontMatter.updatedAt}>
                  {new Date(short.frontMatter.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>
              </span>
            )}
          </p>
          <ShadcnProse>
            <h1 className="-mt-3 mb-3 md:text-center">
              {short.frontMatter.title}
            </h1>
            <div className="not-prose w-full mb-12">
              <Separator />
            </div>
            <MDXRemote {...short.source} />
          </ShadcnProse>
          <div className="flex flex-col gap-3">
            <Alert>
              <ReaderIcon className="w-4 h-4" />
              <AlertTitle>Notice</AlertTitle>
              <AlertDescription>
                Shorts are generally... short.
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}

export const getStaticProps = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const shortFilePath = path.join(SHORTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(shortFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypePrism as any,
        rehypeAutoLinkHeadings,
        rehypeMdxCodeProps as any,
      ],
    },
    scope: data,
  });

  return {
    props: {
      short: {
        source: mdxSource,
        frontMatter: data,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const paths = shortFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
