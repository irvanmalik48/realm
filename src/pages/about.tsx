import DefaultLayout from "@/components/layout/default";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  CookieIcon,
  FaceIcon,
  GlobeIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

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
            defaultValue={["description", "realm-info", "lapp-info", "stances"]}
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
                <p className="text-xs">
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
                  of my accounts, really.
                </p>
                <p className="mt-3">
                  Should be a waste of time, really. I&apos;m just a random ass
                  NPC trying to breath.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </DefaultLayout>
  );
}
