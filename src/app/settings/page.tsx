import Container from "@/components/container";
import { ImageComponent } from "@/components/image";
import { TextScroll } from "@/components/ui/text-scroll";
import { Settings } from "lucide-react";
import { Metadata } from "next";
import CuteImage from "@/assets/img/cute.jpg";
import type { WebPage, WithContext } from "schema-dts";
import { PerformanceModeToggle } from "@/components/performance-mode-toggle";
import { MarqueeToggle } from "@/components/marquee-toggle";
import { DarkModeAnimationToggle } from "@/components/fade-dark-mode-toggle";

export const metadata: Metadata = {
  title: "Settings",
  description: "Configure the site to your liking.",
  openGraph: {
    title: "Settings",
    description: "Configure the site to your liking.",
  },
};

export default function SettingsPage() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Settings",
    alternateName: "realm. | Settings",
    mainEntityOfPage: "https://irvanma.eu.org/settings",
    description: "Configure the site to your liking.",
    url: "https://irvanma.eu.org/settings",
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
            SETTINGS
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Settings className="size-4" />
            <span className="text-sm font-mono">CONFIGURE_SITE.md</span>
          </h2>
          <div className="w-full divide-y divide-border/50">
            <PerformanceModeToggle />
            <DarkModeAnimationToggle />
            <MarqueeToggle />
          </div>
        </div>
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="L BOZO IF YOUR DEVICE IS LAGGING LMAO.  "
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
