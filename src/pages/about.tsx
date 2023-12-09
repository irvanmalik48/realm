import DefaultLayout from "@/components/layout/default";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  CookieIcon,
  FaceIcon,
  GlobeIcon,
  InfoCircledIcon,
  OpenInNewWindowIcon,
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import LapplandImage from "@/assets/img/lappland.webp";

export default function About() {
  return (
    <DefaultLayout title="About Me" description="About me.">
      <div className="w-full min-h-screen flex flex-col py-24">
        <section className={cn("w-full max-w-3xl relative p-5", "mx-auto")}>
          <h1 className="text-2xl py-3 w-full text-center font-bold dark:font-semibold">
            About Me
          </h1>
          <Accordion
            type="multiple"
            defaultValue={[
              "description",
              "realm-info",
              "lapp-info",
              "stances",
              "faq",
              "ask-me",
            ]}
          >
            <AccordionItem value="description">
              <AccordionTrigger>
                <div className="flex gap-3 items-center">
                  <InfoCircledIcon className="w-5 h-5" />
                  <h2 className="text-lg font-semibold dark:font-medium">
                    Description
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                <p>
                  Hello, my name is Irvan Malik Azantha. Pretty sure everything
                  has been described on the landing page, ain&apos;t it? But if
                  you want to know more about me, then sure. I&apos;m an
                  undergrad student majoring in Computer Science. Currently
                  studying in Sriwijaya University. I&apos;m 20 y&apos;o, born
                  at 1st of March, 2003. Has a few siblings, and live in a quite
                  okay family.
                </p>
                <p className="mt-3">
                  I usually spend my time playing games, watching anime, or
                  reading manga. I&apos;m also a big fan of audio related
                  stuffs, mainly music. I listen to wide variety of genres
                  including but not limited to pop, rock, metal, jazz, and
                  classical. I also play guitar and piano. Cafe gigs are my
                  favorite thing to do at night.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="lapp-info">
              <AccordionTrigger>
                <div className="flex gap-3 items-center">
                  <FaceIcon className="w-5 h-5" />
                  <h2 className="text-lg font-semibold dark:font-medium">
                    About <span className="text-primary">Lappland</span>
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                <div className="relative overflow-hidden rounded-xl border border-border mb-3 w-full">
                  <Image
                    src={LapplandImage}
                    className="relative w-full h-auto object-cover"
                    alt="Art by 啵啵鱼 from Pixiv"
                    blurDataURL={LapplandImage.blurDataURL}
                    placeholder="blur"
                    priority
                  />
                  <div
                    className={cn(
                      "absolute top-1 text-xs left-1",
                      "px-3 py-1 rounded-full bg-background",
                      "text-foreground"
                    )}
                  >
                    Art by 啵啵鱼 from Pixiv
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://www.pixiv.net/en/artworks/114031722"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "absolute block top-1 right-1 p-2 rounded-full",
                          "opacity-50 hover:opacity-100 transition-opacity",
                          "bg-background text-foreground"
                        )}
                      >
                        <OpenInNewWindowIcon className="w-4 h-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="end" sideOffset={8}>
                      <p>
                        Jump to the art source on Pixiv.
                        <br />
                        <em>(Opens in a new tab)</em>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-xs w-full text-center">
                  (Yes, my waifu is Lappland. Deal with it.)
                </p>
                <p className="mt-3">
                  Lappland is a 5 star Lord Guard who specializes in DPS and
                  Debuff. As a Lord Guard, Lappland has both a melee and ranged
                  attack which the latter deals 0.8x damage with a range of 2x3
                  tiles and a 1-tile (2-tile at Elite 1) extension up front and
                  can target flying units; in the event she is blocking an
                  enemy, Lappland will use her melee attack against them. This
                  allows Lappland to be conveniently placed behind a Defender or
                  stronger Guard and contribute to DPS.
                </p>
                <p className="mt-3">
                  The bloodthirsty Infected Siracusan Lupo named Lappland
                  Saluzzo is the daughter of Alberto Saluzzo, the current don of
                  the powerful Saluzzo famiglia, who despises her to be an
                  untamed beast due to her maniacal, unhinged behavior. During
                  the annihilation of the Texas famiglia seven years ago (the
                  year 1092), Lappland led her squad to conduct the purge, but
                  she later defied her father&apos;s order when she suddenly
                  became obsessed with Cellinia Texas, the sole survivor of the
                  family, and wished to challenge her in a duel. As a matter of
                  fact, Alberto banished her from the family forever and labeled
                  her as a &quot;lone wolf&quot; - a Lupine outcast. Even then,
                  her banishment does not stop her craving to have another duel
                  with Cellina, whom she sees as a &quot;coward&quot; in her
                  eyes, and bring &quot;the old Texas&quot; back in the process.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="realm-info">
              <AccordionTrigger>
                <div className="flex gap-3 items-center">
                  <CookieIcon className="w-5 h-5" />
                  <h2 className="text-lg font-semibold dark:font-medium">
                    About <span className="text-primary">realm.</span>
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                <p>
                  This website is made using the utmost effort I can give via
                  the 3 braincells that I somehow can leverage. It&apos;s made
                  using Next.js, shadcn/ui, Typescript, Tailwind, and some more.
                  I don&apos;t want to list all of them here since it&apos;s too
                  long. You can check the source code in my GitHub account if
                  you want to. All the dependencies are listed in the
                  package.json file.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="stances">
              <AccordionTrigger>
                <div className="flex gap-3 items-center">
                  <GlobeIcon className="w-5 h-5" />
                  <h2 className="text-lg font-semibold dark:font-medium">
                    On <span className="text-primary">Global Issues</span>
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                <p>
                  Don&apos;t. Just don&apos;t. I&apos;m not going to talk about
                  it here. After all, most likelihood I can tell you is that
                  I&apos;m pretty neutral on all of them. Quite apolitical and
                  apathetic in that regard, even. Should you really want to do a
                  deep dive on my stance, then you&apos;ll have to ask me in any
                  of my accounts.
                </p>
                <p className="mt-3">
                  Should be a waste of time, really. I&apos;m just a random ass
                  NPC trying to breath.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq">
              <AccordionTrigger>
                <div className="flex gap-3 items-center">
                  <QuestionMarkCircledIcon className="w-5 h-5" />
                  <h2 className="text-lg font-semibold dark:font-medium">
                    Frequently Asked{" "}
                    <span className="text-primary">Questions</span>
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 space-y-5">
                <div className="flex items-center overflow-hidden gap-5 relative">
                  <div
                    className={cn(
                      "inset-x-5 h-[1px] absolute top-1/2",
                      "-translate-y-1/2 bg-border"
                    )}
                  />
                  <div
                    className={cn(
                      "relative flex items-center justify-center",
                      "w-10 h-10 rounded-full border border-border",
                      "font-bold bg-card text-card-foreground text-sm"
                    )}
                  >
                    1
                  </div>
                  <Card className="relative flex-1">
                    <CardHeader>
                      <CardTitle>Why do you code?</CardTitle>
                      <CardDescription>
                        I mean for what purpose do you code or something like
                        that.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="italic">
                      Money. I need money. I&apos;m broke.
                    </CardContent>
                  </Card>
                </div>
                <div className="flex items-center overflow-hidden gap-5 relative">
                  <div
                    className={cn(
                      "inset-x-5 h-[1px] absolute top-1/2",
                      "-translate-y-1/2 bg-border"
                    )}
                  />
                  <div
                    className={cn(
                      "relative flex items-center justify-center",
                      "w-10 h-10 rounded-full border border-border",
                      "font-bold bg-card text-card-foreground text-sm"
                    )}
                  >
                    2
                  </div>
                  <Card className="relative flex-1">
                    <CardHeader>
                      <CardTitle>Why do you become a weeb?</CardTitle>
                      <CardDescription>
                        There are much better things you can do, come on.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="italic">
                      Cause anime brings me joy. It diverts my attention into
                      something far better than being an asshole I always were
                      back then. I&apos;ve done atrocities and shit in the past
                      and I really don&apos;t want to do it anymore. Take it as
                      a coping mechanism if you want.
                    </CardContent>
                  </Card>
                </div>
                <div className="flex items-center overflow-hidden gap-5 relative">
                  <div
                    className={cn(
                      "inset-x-5 h-[1px] absolute top-1/2",
                      "-translate-y-1/2 bg-border"
                    )}
                  />
                  <div
                    className={cn(
                      "relative flex items-center justify-center",
                      "w-10 h-10 rounded-full border border-border",
                      "font-bold bg-card text-card-foreground text-sm"
                    )}
                  >
                    3
                  </div>
                  <Card className="relative flex-1">
                    <CardHeader>
                      <CardTitle>What kind of person are you?</CardTitle>
                      <CardDescription>
                        So I saw your acts and a bit confused on what kind of
                        person are you exactly.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="italic">
                      Don&apos;t really think about it. I always believe that
                      being chaotic is the safest way to conceal my true
                      identity, at least in the internet. I&apos;m quite a kind
                      person in real life, even if I don&apos;t really guarantee
                      that to be true. Let&apos;s just say that I&apos;m not a
                      bad person, but not a good person either. I embrace
                      pragmatism whereever I can and act accordingly based on
                      the situation I get subjected in.
                    </CardContent>
                  </Card>
                </div>
                <div className="flex items-center overflow-hidden gap-5 relative">
                  <div
                    className={cn(
                      "inset-x-5 h-[1px] absolute top-1/2",
                      "-translate-y-1/2 bg-border"
                    )}
                  />
                  <div
                    className={cn(
                      "relative flex items-center justify-center",
                      "w-10 h-10 rounded-full border border-border",
                      "font-bold bg-card text-card-foreground text-sm"
                    )}
                  >
                    4
                  </div>
                  <Card className="relative flex-1">
                    <CardHeader>
                      <CardTitle>
                        Why do you like gatekeeping something?
                      </CardTitle>
                      <CardDescription>
                        I mean bro, just let someone live their life the way
                        they like.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="italic">
                      Cause it kills my boredom. And some topics do need a mild
                      amount of gatekeeping to begin with. Burn me at stake and
                      call me a witch, I&apos;ll still do whatever I think best
                      to keep the interest in hand, even if it makes me a total
                      asshole.
                    </CardContent>
                  </Card>
                </div>
                <div className="flex items-center overflow-hidden gap-5 relative">
                  <div
                    className={cn(
                      "inset-x-5 h-[1px] absolute top-1/2",
                      "-translate-y-1/2 bg-border"
                    )}
                  />
                  <div
                    className={cn(
                      "relative flex items-center justify-center",
                      "w-10 h-10 rounded-full border border-border",
                      "font-bold bg-card text-card-foreground text-sm"
                    )}
                  >
                    5
                  </div>
                  <Card className="relative flex-1">
                    <CardHeader>
                      <CardTitle>
                        Why are you always having a lot of problems?
                      </CardTitle>
                      <CardDescription>
                        Well, haven&apos;t you thought about it? You&apos;re
                        always having a lot of problems.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="italic">
                      Cause life. I don&apos;t know, you go taste it for a
                      while. It will always somehow find a way to kick you in
                      the balls while maintaining composure of being unfair as
                      ever.
                    </CardContent>
                  </Card>
                </div>
                <div className="flex items-center overflow-hidden gap-5 relative">
                  <div
                    className={cn(
                      "inset-x-5 h-[1px] absolute top-1/2",
                      "-translate-y-1/2 bg-border"
                    )}
                  />
                  <div
                    className={cn(
                      "relative flex items-center justify-center",
                      "w-10 h-10 rounded-full border border-border",
                      "font-bold bg-card text-card-foreground text-sm"
                    )}
                  >
                    6
                  </div>
                  <Card className="relative flex-1">
                    <CardHeader>
                      <CardTitle>Why are your website so complex?</CardTitle>
                      <CardDescription>
                        Next.js, React Query, Tailwind, and some more. Why not
                        just use something simpler like HTML and CSS?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="italic">
                      Cause I can and it&apos;s fun. Add that to the fact that
                      what is complex for you might be deadass simple for me.
                      All in all, I am a programmer. I need to show what I can
                      and am capable of including but not limited to showing
                      what I can create with the framework I currently use.
                    </CardContent>
                  </Card>
                </div>
                <div className="flex items-center overflow-hidden gap-5 relative">
                  <div
                    className={cn(
                      "inset-x-5 h-[1px] absolute top-1/2",
                      "-translate-y-1/2 bg-border"
                    )}
                  />
                  <div
                    className={cn(
                      "relative flex items-center justify-center",
                      "w-10 h-10 rounded-full border border-border",
                      "font-bold bg-card text-card-foreground text-sm"
                    )}
                  >
                    7
                  </div>
                  <Card className="relative flex-1">
                    <CardHeader>
                      <CardTitle>
                        Why are you so obsessed on audio thingies?
                      </CardTitle>
                      <CardDescription>
                        Like what is the term... Audiophile?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="italic">
                      It is a hobby. I like music. That&apos;s it, really.
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ask-me">
              <AccordionTrigger>
                <div className="flex gap-3 items-center">
                  <QuestionMarkIcon className="w-5 h-5" />
                  <h2 className="text-lg font-semibold dark:font-medium">
                    More <span className="text-primary">Questions?</span>
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                <p>
                  Email me at{" "}
                  <a
                    href="mailto:irvanmalik48@gmail.com"
                    className="text-primary hover:underline"
                  >
                    this address
                  </a>{" "}
                  or DM me on Telegram at{" "}
                  <a
                    href="https://t.me/lappv"
                    className="text-primary hover:underline"
                  >
                    @lappv
                  </a>{" "}
                  if you have any questions. I&apos;ll try to answer them as
                  best as I can.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </DefaultLayout>
  );
}
