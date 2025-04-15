import Container from "@/components/container";
import { ImageComponent } from "@/components/image";
import { Button } from "@/components/ui/button";
import { TextScroll } from "@/components/ui/text-scroll";
import {
  Book,
  Eye,
  GitPullRequest,
  HandMetal,
  Info,
  ThumbsUp,
  Vote,
} from "lucide-react";
import { Metadata } from "next";
import AwooImage from "@/assets/img/awoo.jpg";

export const metadata: Metadata = {
  title: "About",
  description: "Slice and dice!",
  openGraph: {
    title: "About",
    description: "Slice and dice!",
  },
};

export default function About() {
  return (
    <>
      <Container>
        <ImageComponent
          img={AwooImage}
          alt="Awoo"
          className="w-full max-h-96 rounded-lg z-10"
          height={720}
        />
        <p className="w-fit relative -mt-12 z-20 mx-auto text-xl md:text-2xl dark:font-semibold font-medium text-center px-7 py-3 bg-primary text-primary-foreground rounded-full border-6 border-background">
          about me and whatnot.
        </p>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Book className="size-4" />
            <span className="text-sm font-mono">SHITPOSTING.md</span>
          </h2>
          <p className="px-5 py-3">
            A no-shame self-proclaimed ace of all trades, I learn things based
            on my whim and needs. A fast learner, yet a slow practitioner. Brain
            cell counts are pretty low to say the least but they&apos;re doing
            their best lmao. I don&apos;t like bad design and aesthetics. Retro
            is amazing and modern is minimal. Make things good, not just work.
            Not picky about food and stuffs but I really love spiciness. Not
            really into movies and shit but if you wanna talk about anime,
            I&apos;m your man.
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <ThumbsUp className="size-4" />
            <span className="text-sm font-mono">USEFUL_CARDS.md</span>
          </h2>
          <div className="w-full p-5 grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="md:aspect-square size-full overflow-clip rounded-md border border-border flex flex-col">
              <div className="w-full bg-muted/20 px-4 py-2 border-b border-border">
                <h3 className="text-sm text-center line-clamp-1">
                  Typing Speed
                </h3>
              </div>
              <div className="py-3 w-full h-full grow flex flex-col gap-1 items-center justify-center">
                <p className="font-mono font-bold text-5xl">75</p>
                <p className="text-foreground/60 font-mono text-center text-sm">
                  WPM
                </p>
              </div>
            </div>
            <div className="md:aspect-square size-full overflow-clip rounded-md border border-border flex flex-col">
              <div className="w-full bg-muted/20 px-4 py-2 border-b border-border">
                <h3 className="text-sm text-center line-clamp-1">
                  English Prof.
                </h3>
              </div>
              <div className="py-3 w-full h-full grow flex flex-col gap-1 items-center justify-center">
                <p className="font-mono font-bold text-5xl">C1</p>
                <p className="text-foreground/60 font-mono text-center text-sm">
                  TOEFL-iBT
                </p>
              </div>
            </div>
            <div className="md:aspect-square size-full overflow-clip rounded-md border border-border flex flex-col">
              <div className="w-full bg-muted/20 px-4 py-2 border-b border-border">
                <h3 className="text-sm text-center line-clamp-1">
                  Japanese Prof.
                </h3>
              </div>
              <div className="py-3 w-full h-full grow flex flex-col gap-1 items-center justify-center">
                <p className="font-mono font-bold text-5xl">TBD</p>
                <p className="text-foreground/60 font-mono text-center text-sm">
                  JLPT
                </p>
              </div>
            </div>
            <div className="md:aspect-square size-full overflow-clip rounded-md border border-border flex flex-col">
              <div className="w-full bg-muted/20 px-4 py-2 border-b border-border">
                <h3 className="text-sm text-center line-clamp-1">CSE CGPA</h3>
              </div>
              <div className="py-3 w-full h-full grow flex flex-col gap-1 items-center justify-center">
                <p className="font-mono font-bold text-5xl">3.9</p>
                <p className="text-foreground/60 font-mono text-center text-sm">
                  OUT OF 4.0
                </p>
              </div>
            </div>
            <div className="md:aspect-square size-full overflow-clip rounded-md border border-border flex flex-col">
              <div className="w-full bg-muted/20 px-4 py-2 border-b border-border">
                <h3 className="text-sm text-center line-clamp-1">Timezone</h3>
              </div>
              <div className="py-3 w-full h-full grow flex flex-col gap-1 items-center justify-center">
                <p className="font-mono font-bold text-5xl">+7</p>
                <p className="text-foreground/60 font-mono text-center text-sm">
                  GMT/UTC
                </p>
              </div>
            </div>
            <div className="md:aspect-square size-full overflow-clip rounded-md border border-border flex flex-col">
              <div className="w-full bg-muted/20 px-4 py-2 border-b border-border">
                <h3 className="text-sm text-center line-clamp-1">
                  Nationality
                </h3>
              </div>
              <div className="py-3 w-full h-full grow flex flex-col gap-1 items-center justify-center">
                <p className="font-mono font-bold text-5xl">IDN</p>
                <p className="text-foreground/60 font-mono text-center text-sm">
                  (Indonesian)
                </p>
              </div>
            </div>
            <div className="md:aspect-square size-full overflow-clip rounded-md border border-border flex flex-col">
              <div className="w-full bg-muted/20 px-4 py-2 border-b border-border">
                <h3 className="text-sm text-center line-clamp-1">
                  Caffeine Intake
                </h3>
              </div>
              <div className="py-3 w-full h-full grow flex flex-col gap-1 items-center justify-center">
                <p className="font-mono font-bold text-5xl">500</p>
                <p className="text-foreground/60 font-mono text-center text-sm">
                  mg/d
                </p>
              </div>
            </div>
            <div className="md:aspect-square size-full overflow-clip rounded-md border border-border flex flex-col">
              <div className="w-full bg-muted/20 px-4 py-2 border-b border-border">
                <h3 className="text-sm text-center line-clamp-1">Favorites</h3>
              </div>
              <div className="py-3 w-full h-full grow flex flex-col gap-1 items-center justify-center">
                <p className="font-mono font-bold text-5xl">Cat</p>
                <p className="text-foreground/60 font-mono text-center text-sm">
                  Yes
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <GitPullRequest className="size-4" />
            <span className="text-sm font-mono">CONTRIBUTING.md</span>
          </h2>
          <p className="px-5 py-3">
            I am open to contributions for this site. If you want to contribute,
            please consider opening an issue or a pull request. I will review it
            and merge it if I think it&apos;s good. Anyways, here&apos;s the
            Code of Conduct for this site development, I call it Code of Virtue:
          </p>
          <div className="px-5 pb-5">
            <Button
              className="w-full flex gap-3 items-center"
              variant="outline"
              asChild
            >
              <a
                href="https://raw.githubusercontent.com/irvanmalik48/realm/refs/heads/main/CODE_OF_CONDUCT.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Eye className="size-4" />
                <span>View Code of Virtue</span>
              </a>
            </Button>
          </div>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Vote className="size-4" />
            <span className="text-sm font-mono">ABOUT_POLITICS.md</span>
          </h2>
          <p className="px-5 py-3">
            Here comes the annoying part. I am a moderate national populist but
            technically speaking, I don&apos;t like talking about politics. It
            has been a kind of joke recently looking at the state of the world
            in 2025. Please refrain in trying to pursue the topic with me. Not a
            fan of it. Any attempts to talk with me about it will be either met
            with silence, a topic maneuvre, or a literal controversial opinion.
          </p>
          <p className="px-5 pb-3">So please, don&apos;t.</p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <HandMetal className="size-4" />
            <span className="text-sm font-mono">ABOUT_MUSIC.md</span>
          </h2>
          <p className="px-5 py-3">
            And here comes the fun part! I am an avid metalhead. Not the
            gatekeeping one tho. I listen to all kinds of music, but metal is my
            jam. I love the likes of many established and currently upcoming
            bands, whether it&apos;s the classics like Metallica, Iron Maiden,
            and Black Sabbath, or the moderns and indies like Spiritbox, Jinjer,
            and Sleep Token.
          </p>
          <p className="px-5 pb-3">
            Hip-Hop is also one of my favorite genres. I have this innate
            ability to formulate alot of lyrics and ideas in my head thanks to
            my exposure to Hip-Hop and oftentimes, the sheer potential of it.
          </p>
          <p className="px-5 pb-3">
            I like good Pop music. That&apos;s pretty much it on the Pop side.
          </p>
        </div>
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3"
        default_velocity={0.66}
        text="this is the end of this page, cuh.  "
      />
    </>
  );
}
