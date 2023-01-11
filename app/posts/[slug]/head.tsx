import { NextSeo } from "next-seo";
import { getProps } from "next-seo.config";
import { getPostSlug } from "u/posts";

export default function Head({ params }: { params: { slug: string } }) {
  const data = getPostSlug(params.slug);
  return <NextSeo useAppDir={true} {...getProps({
    title: data.frontmatter.title,
    desc: data.frontmatter.desc,
    path: `/posts/${params.slug}`
  })} />;
}
