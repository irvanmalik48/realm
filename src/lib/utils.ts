import { getCollection } from "astro:content";

export async function getSortedCollectionPosts(
  collection: "posts" | "diaries" | "lyrics"
) {
  return await (getCollection(collection) as Promise<any[]>).then((entries) =>
    entries
      .filter((entry) => !entry.data.draft)
      .sort(
        (a, b) =>
          new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
      )
  );
}

export async function generateSitemapXml(
  posts: any[],
  site: { url: string | URL | undefined }
) {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <url>
        <loc>${site.url}</loc>
        <lastmod>${new Date()}</lastmod>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>${site.url}/posts</loc>
        <lastmod>${new Date()}</lastmod>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>${site.url}/lyrics</loc>
        <lastmod>${new Date()}</lastmod>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>${site.url}/diaries</loc>
        <lastmod>${new Date()}</lastmod>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>${site.url}/about</loc>
        <lastmod>${new Date()}</lastmod>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>${site.url}/privacy-policy</loc>
        <lastmod>${new Date()}</lastmod>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>${site.url}/paste</loc>
        <lastmod>${new Date()}</lastmod>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>${site.url}/oath</loc>
        <lastmod>${new Date()}</lastmod>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>${site.url}/creed</loc>
        <lastmod>${new Date()}</lastmod>
        <priority>1.00</priority>
    </url>
    ${posts
      .map((post) => {
        const loc = new URL(`/${post.collection}/${post.slug}`, site.url).href;
        return `
            <url>
                <loc>${loc}</loc>
                <lastmod>${new Date(post.data.date).toISOString()}</lastmod>
                <priority>0.80</priority>
            </url>
        `.trim();
      })
      .join("")}
    </urlset>
`.trim();
}
