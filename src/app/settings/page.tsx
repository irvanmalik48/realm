import { TextScroll } from "@/components/ui/text-scroll";
import { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";
import { SettingsClientPage } from "@/components/settings-client-page";

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
          name: "Blog",
          item: "https://irvanma.eu.org/blog",
        },
      ],
    },
  };

  return (
    <>
      <SettingsClientPage />
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
