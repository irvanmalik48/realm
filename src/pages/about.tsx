import NumberedCard from "@/components/custom/numbered-card";
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
  HeartIcon,
  InfoCircledIcon,
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";

const FAQ_DATA = [
  {
    title: "Why do you code?",
    description: "Seriously, why delve in such pain?",
    content: "Money. I need money. I'm broke.",
  },
  {
    title: "Why aren't you afraid of being doxxed?",
    description:
      "You're literally showing your face on the internet if I may remember.",
    content:
      "I mean, come then if you really want to doxx me. Posting my map location on the internet without meeting me is a good recipe to get me view you without a single semblance of respect. If you know where I am and want to actually challenge on whether or not I'm afraid of you, come.",
  },
  {
    title: "Why are your website so complex?",
    description:
      "Next.js, React Query, Tailwind, and some more. Why not just use something simpler like HTML and CSS?",
    content:
      "Cause I can and it's fun. Add that to the fact that what is complex for you might be deadass simple for me. All in all, I am a programmer. I need to show what I can and am capable of including but not limited to showing what I can create with the framework I currently use.",
  },
  {
    title: "Why are you so obsessed on audio thingies?",
    description: "Like what is the term... Audiophile?",
    content: "It is a hobby. I like music. That's it, really.",
  },
  {
    title: "Do you have plans for the future?",
    description: "Like what are you gonna do after you graduate?",
    content: "Work, have fun, eat pancakes.",
  },
];

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
            defaultValue={["description", "realm-info", "faq", "ask-me"]}
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
                {FAQ_DATA.map((faq, index) => (
                  <NumberedCard
                    key={index}
                    number={index + 1}
                    title={faq.title}
                    description={faq.description}
                    content={faq.content}
                  />
                ))}
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
            <AccordionItem value="donations">
              <AccordionTrigger>
                <div className="flex gap-3 items-center">
                  <HeartIcon className="w-5 h-5" />
                  <h2 className="text-lg font-semibold dark:font-medium">
                    Buy me a <span className="text-primary">coffee?</span>
                  </h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                Any donations that can help me buy some stuffs and, of course,
                coffee, are highly appreciated. You can donate to me via{" "}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </DefaultLayout>
  );
}
