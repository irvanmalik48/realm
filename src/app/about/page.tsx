import Container from "@/components/container";
import { ImageComponent } from "@/components/image";
import { TextScroll } from "@/components/ui/text-scroll";
import {
  Book,
  Clock,
  Coffee,
  Flag,
  GitCommit,
  Globe,
  GraduationCap,
  Heart,
  Keyboard,
  Languages,
} from "lucide-react";
import { Metadata } from "next";
import AwooImage from "@/assets/img/awoo.jpg";
import type { WebPage, WithContext } from "schema-dts";
import { LastFMTrackCard } from "@/components/lastfm-track-card";
import { LastFMUserCard } from "@/components/lastfm-user-card";
import { GitHubContributionGraph } from "@/components/github/github-contribution-graph";
import { DirectionalTransition } from "@/components/directional-transition";
import { safeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Slice and dice!",
  openGraph: {
    title: "About",
    description: "Slice and dice!",
  },
};

export default function About() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About",
    alternateName: "realm. | About",
    mainEntityOfPage: "https://irvanma.eu.org/about",
    description: "Slice and dice!",
    url: "https://irvanma.eu.org/about",
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

  const infoWidgets = [
    {
      title: "CSE CGPA",
      value: "3.9",
      unit: "OUT OF 4.0",
      icon: GraduationCap,
    },
    {
      title: "Typing Speed",
      value: "75",
      unit: "WPM",
      icon: Keyboard,
    },
    {
      title: "English Prof.",
      value: "C1",
      unit: "TOEFL-iBT",
      icon: Languages,
    },
    {
      title: "Timezone",
      value: "+7",
      unit: "GMT/UTC",
      icon: Clock,
    },
    {
      title: "Japanese Prof.",
      value: "TBD",
      unit: "JLPT",
      icon: Globe,
    },
    {
      title: "Nationality",
      value: "IDN",
      unit: "(Indonesian)",
      icon: Flag,
    },
    {
      title: "Caffeine Intake",
      value: "500",
      unit: "mg/d",
      icon: Coffee,
    },
    {
      title: "Favorites",
      value: "Cat",
      unit: "Yes",
      icon: Heart,
    },
  ];

  return (
    <DirectionalTransition>
      <div>
        <Container className="max-w-4xl">
          {/* Hero Banner */}
          <div className="relative rounded-lg overflow-clip">
            <ImageComponent
              img={AwooImage}
              alt="Awoo"
              className="w-full relative max-h-96 z-10 rounded-lg"
              height={720}
            />
            <p className="z-20 md:w-fit w-3/4 text-center font-bold absolute bottom-3 left-1/2 rounded-full -translate-x-1/2 px-7 py-3 font-doto bg-background/80 text-foreground md:text-xl backdrop-blur-lg">
              ABOUT ME AND STUFFS
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {/* 1. Bio Bento Card: Full Width */}
            <div className="col-span-full bg-background rounded-lg border border-border overflow-hidden flex flex-col transition-all duration-200 hover:border-foreground/30 group">
              <div className="w-full flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/10">
                <h2 className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                  <Book className="size-4" />
                  <span className="text-xs font-mono font-medium text-foreground">
                    SHITPOSTING.md
                  </span>
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border">
                  bio
                </span>
              </div>
              <div className="p-4 sm:p-5 flex flex-col justify-between grow space-y-3.5 text-sm leading-relaxed text-foreground/90">
                <p>
                  A no-shame self-proclaimed ace of all trades, I learn things based
                  on my whim and needs. A fast learner, yet a slow practitioner. Brain
                  cell counts are pretty low to say the least but they&apos;re doing
                  their best lmao.
                </p>
                <p>
                  I don&apos;t like bad design and aesthetics. Retro is amazing and modern is
                  minimal. Make things good, not just work.
                </p>
                <p>
                  Not picky about food and stuffs but I really love spiciness. Not
                  really into movies and shit but if you wanna talk about anime,
                  I&apos;m your man.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50 text-[11px] font-mono text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-md bg-muted/40 border border-border/60">#anime</span>
                  <span className="px-2 py-0.5 rounded-md bg-muted/40 border border-border/60">#retro-minimal</span>
                  <span className="px-2 py-0.5 rounded-md bg-muted/40 border border-border/60">#spiciness</span>
                  <span className="px-2 py-0.5 rounded-md bg-muted/40 border border-border/60">#developer</span>
                </div>
              </div>
            </div>

            {/* 2. Quick Stats: 8 Bento Metric Cards (2 rows of 4 on md+) */}
            {infoWidgets.map((item) => (
              <div
                key={item.title}
                className="bg-background rounded-lg border border-border overflow-hidden flex flex-col transition-all duration-200 hover:border-foreground/30 hover:bg-muted/5 group col-span-1"
              >
                <div className="w-full bg-muted/10 px-3.5 py-2 border-b border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground truncate group-hover:text-foreground transition-colors">
                    {item.title}
                  </span>
                  <item.icon className="size-3.5 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
                </div>
                <div className="p-3 w-full grow flex flex-col items-center justify-center min-h-[95px]">
                  <p className="font-doto font-bold text-3xl sm:text-4xl text-foreground tracking-tight group-hover:scale-105 transition-transform duration-200">
                    {item.value}
                  </p>
                  <p className="text-muted-foreground font-mono text-[11px] mt-0.5 text-center">
                    {item.unit}
                  </p>
                </div>
              </div>
            ))}

            {/* 3. GitHub Contributions Bento Card: Full Width */}
            <div className="col-span-full bg-background rounded-lg border border-border overflow-hidden transition-all duration-200 hover:border-foreground/30 group">
              <div className="w-full flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/10">
                <h2 className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                  <GitCommit className="size-4" />
                  <span className="text-xs font-mono font-medium text-foreground">
                    CONTRIBUTIONS.md
                  </span>
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border">
                  github
                </span>
              </div>
              <div className="p-2 sm:p-4">
                <GitHubContributionGraph
                  username="irvanmalik48"
                  className="border-0 shadow-none"
                />
              </div>
            </div>

            {/* 4. LastFM User Profile Bento Card: Full Width */}
            <LastFMUserCard username="irvanmalik48" className="col-span-full" />

            {/* 5. LastFM Recent Tracks Bento Card: Full Width */}
            <LastFMTrackCard username="irvanmalik48" className="col-span-full" />
          </div>
        </Container>
        <TextScroll
          className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
          textClassName="py-1 md:py-3 font-doto"
          default_velocity={0.66}
          text="THIS IS THE END OF THE PAGE, CUH.  "
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      </div>
    </DirectionalTransition>
  );
}
