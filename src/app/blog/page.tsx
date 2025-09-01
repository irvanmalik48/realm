import Container from "@/components/container";
import { ImageComponent } from "@/components/image";
import { TextScroll } from "@/components/ui/text-scroll";
import { Book, Newspaper } from "lucide-react";
import { Metadata } from "next";
import CuteImage from "@/assets/img/cute.jpg";
import type { WebPage, WithContext } from "schema-dts";
import { getPosts } from "@/lib/fs/posts";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Write stuff and things.",
  openGraph: {
    title: "Blog",
    description: "Write stuff and things.",
  },
};

export default function Blog() {
  const posts = getPosts();

  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Blog",
    alternateName: "realm. | Blog",
    mainEntityOfPage: "https://irvanma.eu.org/blog",
    description: "Write stuff and things.",
    url: "https://irvanma.eu.org/blog",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Landing",
          item: "https://irvanma.eu.org/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://irvanma.eu.org/about",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Server Status",
          item: "https://irvanma.eu.org/status",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Blog",
          item: "https://irvanma.eu.org/blog",
        },
      ],
    },
  };

  return (
    <>
      <Container>
        <div className="relative rounded-lg overflow-clip">
          <ImageComponent
            img={CuteImage}
            alt="Awoo"
            className="w-full relative max-h-96 z-10 rounded-lg"
            innerClassName="md:-translate-y-8"
            height={720}
          />
          <p className="z-20 md:w-fit w-3/4 text-center font-bold absolute bottom-3 left-1/2 rounded-full -translate-x-1/2 px-7 py-3 font-doto bg-background/80 text-foreground md:text-xl backdrop-blur-lg">
            ALL POSTS
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Book className="size-4" />
            <span className="text-sm font-mono">DETAILS.md</span>
          </h2>
          <p className="px-5 py-3">
            In case you are wondering, yes, I write things. Mainly for some
            stuffs that I find interesting, or just to get my thoughts out of my
            head. You might also find rambles, rants, and some random stuffs,
            maybe code or some shit like that I don&apos;t know.
          </p>
          <p className="px-5 pb-3 font-semibold">
            This section of my website is still under development. It might
            change later.
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Newspaper className="size-4" />
            <span className="text-sm font-mono">ALL_POSTS.md</span>
          </h2>
          <div className="w-full p-5 flex flex-col gap-5">
            {posts.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>
        </div>
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="AGES AND AGES LATER AND I'M STILL WRITING RANDOM SHIT.  "
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
