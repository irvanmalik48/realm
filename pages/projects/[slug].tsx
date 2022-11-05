import { GetStaticPaths, GetStaticProps } from "next";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import { getProject, projectFilePaths } from "@utils/utils";
import ProjectLayout from "@cly/ProjectLayout";
import { ProjectLayoutProps } from "@utils/types";

export default function Post({ source, meta }: ProjectLayoutProps) {
  return <ProjectLayout source={source} meta={meta} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params!;
  const postFile = getProject(slug as string);
  const { content, data } = matter(await postFile);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypePrism],
    },
    scope: data,
  });

  return {
    props: {
      meta: data,
      source: mdxSource,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projectFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
