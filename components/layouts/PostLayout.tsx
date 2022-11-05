import { MDXRemote } from "next-mdx-remote";
import { ArticleJsonLd } from "next-seo";
import BaseLayout from "@cly/BaseLayout";
import { PostLayoutProps } from "@utils/types";
import { components } from "@cly/MDXComponentOverrides";

export default function PostLayout(props: PostLayoutProps) {
  return (
    <BaseLayout
      title={props.meta.title}
      date={props.meta.date}
      tag={props.meta.tag}
      description={props.meta.desc}
    >
      <ArticleJsonLd
        type="BlogPosting"
        title={props.meta.title}
        description={props.meta.desc}
        datePublished={props.meta.date}
        dateModified={props.meta.date}
        images={[]}
        authorName="Irvan Malik Azantha"
        publisherName="Realm Publishing"
        url={"https://www.irvanma.me" + props.meta.slug}
      />
      <section className="container-responsive py-24">
        <p className="text-center text-3xl font-bold bg-gray-800 w-fit mx-auto px-5 py-3 font-helvetica rounded-xl">
          {props.meta.title}
        </p>
        <div className="flex justify-center items-center gap-4 my-4">
          <p className="text-sm">
            <span className="text-gray-400">Published on</span>{" "}
            <span className="text-red-400 font-bold">{props.meta.date}</span>{" "}
          </p>
          <p className="text-sm text-gray-600">&bull;</p>
          <div className="flex gap-3 items-center justify-center">
            {props.meta.tag.map((tag: string, index: any) => (
              <p key={index} className="text-sm text-gray-400">
                #{tag}{" "}
              </p>
            ))}
          </div>
        </div>
        <article
          className="prose prose-invert max-w-none prose-code:break-words prose-headings:font-helvetica prose-headings:text-gray-200 prose-p:text-gray-200 prose-a:text-red-400 prose-code:text-gray-200"
          {...props}
        >
          <MDXRemote {...props.source} components={components} />
          <p className="mt-12 w-full text-center text-sm">
            This post is licensed under{" "}
            <a href="https://artlibre.org/licence/lal/en/">
              Free Art License 1.3
            </a>
            .
          </p>
        </article>
      </section>
    </BaseLayout>
  );
}
