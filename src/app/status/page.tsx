import { Metadata } from "next";
import Container from "@/components/container";
import { ImageComponent } from "@/components/image";
import GoodLord from "@/assets/img/goodlord.jpg";
import { TextScroll } from "@/components/ui/text-scroll";
import { ServerStatus } from "@/components/server-status";
import type { WebPage, WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "Server Status",
  description: "See the server status!",
  openGraph: {
    title: "Server Status",
    description: "See the server status!",
  },
};

export default function Status() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Server Status",
    alternateName: "realm. | Server Status",
    mainEntityOfPage: "https://irvanma.eu.org/status",
    description: "See the server status!",
    url: "https://irvanma.eu.org/status",
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
            img={GoodLord}
            alt="Good lord~"
            className="w-full max-h-96 rounded-lg z-10"
            innerClassName="w-full md:-translate-y-24"
            height={720}
          />
          <p className="z-20 md:w-fit w-3/4 text-center font-bold absolute bottom-3 left-1/2 rounded-full -translate-x-1/2 px-7 py-3 font-doto bg-background/80 text-foreground md:text-xl backdrop-blur-lg">
            MY SERVER STATUS INFO
          </p>
        </div>
        <ServerStatus />
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="I NEED MORE RAM, PROBABLY.  "
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
