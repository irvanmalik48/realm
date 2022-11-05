import { MDXRemote } from "next-mdx-remote";
import { ArticleJsonLd } from "next-seo";
import Image from "next/image";
import { ProjectLayoutProps } from "@utils/types";
import BaseLayout from "@cly/BaseLayout";
import { components } from "@cly/MDXComponentOverrides";

export default function ProjectLayout(props: ProjectLayoutProps) {
  return (
    <BaseLayout title={props.meta.title} description={props.meta.desc}>
      <ArticleJsonLd
        type="BlogPosting"
        title={props.meta.title}
        description={props.meta.desc}
        datePublished={"2021-01-01"} // TODO: Add proper dates
        dateModified={"2021-01-01"}
        images={[]}
        authorName="Irvan Malik Azantha"
        publisherName="Realm Publishing"
        url={"https://www.irvanma.me" + props.meta.slug}
      />
      <section className="container-responsive py-24">
        <Image
          className="lg:w-3/4 mx-auto rounded-lg mb-5 w-full"
          width={720}
          height={720}
          src={props.meta.screenshot}
          alt={props.meta.title}
        />
        <p className="text-center text-3xl font-bold bg-gray-800 w-fit mx-auto px-5 py-3 font-helvetica rounded-xl">
          {props.meta.title}
        </p>
        <div className="flex justify-center items-center gap-4 my-4">
          <div className="flex gap-3 items-center justify-center">
            {props.meta.tag.map((tag: string, index: any) => (
              <p key={index} className="text-sm text-gray-400">
                #{tag}{" "}
              </p>
            ))}
          </div>
        </div>
        <article
          className="prose prose-invert max-w-none prose-headings:font-helvetica prose-headings:text-gray-200 prose-p:text-gray-200 prose-a:text-red-400 prose-code:text-gray-200"
          {...props}
        >
          <MDXRemote {...props.source} components={components} />
        </article>
      </section>
    </BaseLayout>
  );
}
