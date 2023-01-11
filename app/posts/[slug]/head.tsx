import { getPostSlug } from "u/posts";

export default function Head({ params }: { params: { slug: string } }) {
  const data = getPostSlug(params.slug);
  return (
    <>
      <title>{data.frontmatter.title}</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
      />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </>
  );
}
