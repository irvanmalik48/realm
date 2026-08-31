import Container from "@/components/container";
import { Metadata } from "next";
import { Hero } from "@/components/hero";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { WebPage, WithContext } from "schema-dts";
import { DirectionalTransition } from "@/components/directional-transition";

import HeroImage from "@/assets/img/hero.jpg";
import HeroProfile from "@/assets/img/profpic-animated.webp";
import { Book, Info, Server } from "lucide-react";
import { SelfHostedServices } from "@/components/selfhosted";
import { AboutSite } from "@/components/about-site";
import { TextScroll } from "@/components/ui/text-scroll";
import { APIStatusPulse } from "@/components/api-status-pulse";

export const metadata: Metadata = {
  title: "Landing | realm.",
  description: "Where it all begins.",
  openGraph: {
    title: "Landing | realm.",
    description: "Where it all begins.",
  },
};

export default function Home() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Irvan Malik Azantha",
    alternateName: "realm.",
    mainEntityOfPage: "https://irvanma.eu.org/",
    description: "Where it all begins.",
    url: "https://irvanma.eu.org/",
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
          name: "Blog",
          item: "https://irvanma.eu.org/blog",
        },
      ],
    },
  };

  return (
    <DirectionalTransition>
      <Container>
        <Hero img={HeroImage} profile={HeroProfile} />
        <APIStatusPulse />
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Book className="size-4" />
            <span className="text-sm font-mono">DESCRIPTION.md</span>
          </h2>
          <p className="px-5 py-3">
            I ain&apos;t tryna be fancy here. I don&apos;t know what to put so I
            will just say welcome to my personal site. I&apos;m Irvan Malik
            Azantha. Domicile is Palembang, Indonesia. Age 23. For job
            inquiries, please contact me through my work mail.
          </p>
        </div>

        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Server className="size-4" />
            <span className="text-sm font-mono">SELFHOSTED.md</span>
          </h2>
          <p className="px-5 py-3 border-b border-border">
            There are some services that I self-host. It would grow overtime but
            here are the current services that I self-host:
          </p>
          <SelfHostedServices />
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Info className="size-4" />
            <span className="text-sm font-mono">ABOUT_SITE.md</span>
          </h2>
          <AboutSite />
        </div>
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="I WILL NOT CRASH YOUR BROWSER.  "
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </DirectionalTransition>
  );
}
