import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { TextScroll } from "@/components/ui/text-scroll";
import { Book, Eye, GitPullRequest, HandMetal, Info, Vote } from "lucide-react";
import { Metadata } from "next";

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
      <TextScroll
        className="text-3xl md:text-5xl text-foreground dark:font-semibold font-bold py-12 md:space-y-2"
        textClassName="py-1 md:py-3"
        default_velocity={0.66}
        text="yeah bro this is an about page, what more do you expect.  "
      />
      <Container>
        <p className="text-foreground/75 text-xl md:text-2xl font-semibold dark:font-medium text-center px-5 py-3">
          about me and whatnot.
        </p>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Book className="size-4" />
            <span className="text-sm font-mono">FULL_DESCRIPTION.md</span>
          </h2>
          <p className="px-5 py-3">
            I am a dynamic front-end developer with over 3 years of specialized
            experience crafting responsive, user-centric web experiences. At 22,
            I&apos;ve established myself through advanced proficiency in
            JavaScript frameworks like React and Vue.js, coupled with
            expert-level knowledge of HTML5, CSS3, and modern UI/UX principles.
            I excel at translating complex design concepts into seamless
            interfaces that balance aesthetics with performance.
          </p>
          <p className="px-5 pb-3">
            ... is what I generated from Claude 3.7 Sonnet lmao. As with the
            previous description, I really don&apos;t know what to put here. So
            let me just explain myself in a more human way. Let&apos;s skip the
            stuff already mentioned in the previous description.
          </p>
          <p className="px-5 pb-3">
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
            <Info className="size-4" />
            <span className="text-sm font-mono">FULL_ABOUT_SITE.md</span>
          </h2>
          <p className="px-5 py-3">
            We&apos;re getting a bit into the history of this site now since the
            ones down the landing page doesn&apos;t do justice about it.
          </p>
          <p className="px-5 pb-3">
            The site was originally first made in Jekyll, as every devs first
            know that you can host in GitHub Pages. Over the span of years I
            rewrote this website into... well, everything I wanna use and think
            cool at that time. Historically used frameworks includes the likes
            of Hugo, Gatsby, React, Next.js (both Pages router and App router),
            Deno Fresh, and Astro. Why did I use so many frameworks? Because I
            can. I like to learn new things and I like to try new things. It
            just tickles my brain and gives me something to get out of my
            boredom.
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <GitPullRequest className="size-4" />
            <span className="text-sm font-mono">CONTRIBUTING.md</span>
          </h2>
          <p className="px-5 py-3">
            I am open to contributions. If you want to contribute, please
            consider opening an issue or a pull request. I will review it and
            merge it if I think it&apos;s good. Anyways, here's the Code of
            Conduct for this site development, I call it Code of Virtue:
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
      </Container>
      <TextScroll
        className="text-3xl md:text-5xl text-foreground dark:font-semibold font-bold py-12 md:space-y-2"
        textClassName="py-1 md:py-3"
        default_velocity={0.66}
        text="yay, the boring part is done!  "
      />
      <Container>
        <p className="text-foreground/75 text-xl md:text-2xl font-semibold dark:font-medium text-center px-5 py-3">
          interpret it as you wish.
        </p>
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
