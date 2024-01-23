import DefaultLayout from "@/components/layout/default";
import fs from "fs";
import matter from "gray-matter";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { POSTS_PATH, postFilePaths } from "@/content/const";
import path from "path";
import ShadcnProse from "@/components/custom/shadcn-prose";
import { Separator } from "@/components/ui/separator";
import { Component1Icon, ReaderIcon } from "@radix-ui/react-icons";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import rehypeMdxCodeProps from "rehype-mdx-code-props";

type Post = {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

interface PostMatter {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  frontMatter: Post;
}

export default function Post({ post }: { post: PostMatter }) {
  return (
    <DefaultLayout
      templateTitle={false}
      title={post.frontMatter.title}
      description={post.frontMatter.description}
    >
      <div className="w-full min-h-screen flex flex-col py-24">
        <section
          className={cn(
            "w-full max-w-3xl relative p-5",
            "mx-auto flex flex-col gap-6"
          )}
        >
          <p className="text-xs md:text-sm w-full text-muted-foreground md:text-center">
            {post.frontMatter.createdAt === post.frontMatter.updatedAt ? (
              <span>
                Published on{" "}
                <time dateTime={post.frontMatter.createdAt}>
                  {new Date(post.frontMatter.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </time>
              </span>
            ) : (
              <span>
                Published on{" "}
                <time dateTime={post.frontMatter.createdAt}>
                  {new Date(post.frontMatter.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </time>{" "}
                and updated on{" "}
                <time dateTime={post.frontMatter.updatedAt}>
                  {new Date(post.frontMatter.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </time>
              </span>
            )}
          </p>
          <ShadcnProse>
            <h1 className="-mt-3 mb-0 md:text-center">
              {post.frontMatter.title}
            </h1>
            <p className="lead mt-3 md:text-center">
              {post.frontMatter.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4 md:justify-center">
              {post.frontMatter.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="not-prose w-full mb-12">
              <Separator />
            </div>
            <MDXRemote {...post.source} />
          </ShadcnProse>
          <div className="flex flex-col gap-3">
            <Alert>
              <ReaderIcon className="w-4 h-4" />
              <AlertTitle>Post Copyright Notice</AlertTitle>
              <AlertDescription>
                This post is licensed under{" "}
                <a
                  className="underline"
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                >
                  CC BY-NC-SA 4.0
                </a>
                .
              </AlertDescription>
            </Alert>
            <Alert>
              <Component1Icon className="w-4 h-4" />
              <AlertTitle>Assets Copyright Notice</AlertTitle>
              <AlertDescription>
                <p>
                  All other assets used in this post may or may not be licensed
                  under the same license as this post. Please check the original
                  source for more information.
                </p>
                <p>
                  If you are the owner of the asset and want it to be removed,{" "}
                  <a className="underline" href="mailto:irvanmalik48@gmail.com">
                    please contact me
                  </a>
                  .
                </p>
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
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

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
      post: {
        source: mdxSource,
        frontMatter: data,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
