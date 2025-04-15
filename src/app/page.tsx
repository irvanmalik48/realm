import Container from "@/components/container";
import { Metadata } from "next";
import { Hero } from "@/components/hero";

import HeroImage from "@/assets/img/hero.jpg";
import HeroProfile from "@/assets/img/profpic.jpg";
import { Book, Info, Pickaxe, Server } from "lucide-react";
import { MinecraftServer } from "@/components/minecraft";
import { SelfHostedServices } from "@/components/selfhosted";
import { TextScroll } from "@/components/ui/text-scroll";

export const metadata: Metadata = {
  title: "Landing | realm.",
  description: "Where it all begins.",
  openGraph: {
    title: "Landing | realm.",
    description: "Where it all begins.",
  },
};

export default function Home() {
  return (
    <>
      <Container>
        <Hero img={HeroImage} profile={HeroProfile} />
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Book className="size-4" />
            <span className="text-sm font-mono">DESCRIPTION.md</span>
          </h2>
          <p className="px-5 py-3">
            I ain&apos;t tryna be fancy here. I don&apos;t know what to put so I
            will just say welcome to my personal site. I&apos;m Irvan Malik
            Azantha. Domicile is Palembang, Indonesia. Age 22. For job
            inquiries, please contact me through my work mail.
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Pickaxe className="size-4" />
            <span className="text-sm font-mono">MINECRAFT_SERVER.md</span>
          </h2>
          <p className="px-5 py-3 border-b border-border">
            Oh yeah, I run a Minecraft Server. The server is whitelist-only to
            avoid problems of running an offline server so please contact me if
            you want to join. Here&apos;s the details:
          </p>
          <MinecraftServer />
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
          <p className="px-5 py-3">
            This site is built using{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Next.js
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              TailwindCSS
            </a>
            ,{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              shadcn/ui
            </a>
            , and{" "}
            <a
              href="https://tanstack.com/query"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Tanstack Query
            </a>
            . It is hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Vercel
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/irvanmalik48/realm"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3"
        default_velocity={0.66}
        text="i will not crash your browser.  "
      />
    </>
  );
}
