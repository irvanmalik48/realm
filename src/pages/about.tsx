import {
  CookieIcon,
  HeartIcon,
  InfoCircledIcon,
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";

import NumberedCard from "@/components/custom/numbered-card";
import DefaultLayout from "@/components/layout/default";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const FAQ_DATA = [
  {
    title: "Why do you code?",
    description: "Seriously, why delve in such pain?",
    content: "Money. I need money. I'm broke.",
  },
  {
    title: "Are you single?",
    description: "Just curious.",
    content: "Yes, I am. Not for long, I hope.",
  },
  {
    title: "What's your favorite song to listen?",
    description: "Might've been something interesting, y'know?",
    content: "Bury the Light by Casey Edwards.",
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
            defaultValue={[
              "description",
              "realm-info",
              "faq",
              "ask-me",
              "donations",
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
                  studying in Sriwijaya University. I&apos;m 21 y&apos;o, born
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
              <AccordionContent className="text-foreground/70 space-y-2">
                <p>
                  Any donations that can help me buy some stuffs and, of course,
                  coffee, are highly appreciated. You can donate to me via:
                </p>
                <p className="text-foreground">Wallets:</p>
                <ul className="list-disc list-inside">
                  <li>
                    PayPal:{" "}
                    <a
                      href="https://paypal.me/irvann48"
                      className="font-mono underline"
                    >
                      paypal.me/irvann48
                    </a>
                  </li>
                  <li>
                    Saweria:{" "}
                    <a
                      href="https://saweria.co/irvanmalik48"
                      className="font-mono underline"
                    >
                      @irvanmalik48
                    </a>
                  </li>
                  <li>
                    Dana: <span className="font-mono">0896-2809-0166</span>{" "}
                    (Irvan Malik Azantha)
                  </li>
                </ul>
                <p className="text-foreground">Cryptocurrency:</p>
                <ul className="list-disc list-inside">
                  <li>
                    BTC:{" "}
                    <span className="font-mono">
                      bc1qx8eluj4tmvnkfela366dm3fluvw6hgx6knc2se
                    </span>
                  </li>
                  <li>
                    ETH:{" "}
                    <span className="font-mono">
                      0xFC67B43EDB988F51Af357FbdF9a66C8f99DBE9C4
                    </span>
                  </li>
                  <li>
                    USDT (ERC-20):{" "}
                    <span className="font-mono">
                      0xFC67B43EDB988F51Af357FbdF9a66C8f99DBE9C4
                    </span>
                  </li>
                  <li>
                    USDT (TRC-20):{" "}
                    <span className="font-mono">
                      TLLbcbS9zJJmWm9JTXEy5QtPoqJt6rrS71
                    </span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </DefaultLayout>
  );
}
