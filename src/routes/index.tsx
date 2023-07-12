import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { Image } from "~/components/image/image";
import { Image as ImageNoBlurHash } from "@unpic/qwik";
import HeaderHero from "~/components/header-hero/header-hero";
import {
  LuNewspaper,
  LuBriefcase,
  LuInfo,
  LuHeartHandshake,
  LuThumbsUp,
  LuArrowDown,
} from "@qwikest/icons/lucide";
import { Waves } from "~/components/waves/waves";
import { Marquees } from "~/components/intro-section-marquees/intro-section-marquees";

export default component$(() => {
  const links = [
    {
      href: "/posts",
      icon: <LuNewspaper class="w-8 h-8 mt-2" />,
      label: "Blog",
      desc: "Read my blog posts",
      recommended: false,
    },
    {
      href: "/projects",
      icon: <LuBriefcase class="w-8 h-8 mt-2" />,
      label: "Projects",
      desc: "See my projects",
      recommended: false,
    },
    {
      href: "/about",
      icon: <LuInfo class="w-8 h-8 mt-2" />,
      label: "About",
      desc: "Learn more about me",
      recommended: false,
    },
    {
      href: "/donate",
      icon: <LuHeartHandshake class="w-8 h-8 mt-2" />,
      label: "Donate",
      desc: "Buy me a coffee",
      recommended: true,
    },
  ];

  return (
    <>
      <section class="w-full max-w-4xl px-5 py-24 mx-auto min-h-screen relative">
        <HeaderHero />
        <div class="w-36 h-36 -mt-16 rounded-full bg-neutral-900 ring-4 ring-neutral-700 overflow-hidden z-20 relative mx-auto">
          <ImageNoBlurHash
            src="https://avatars.githubusercontent.com/u/71539547?v=4"
            layout="constrained"
            width="150"
            height="150"
            alt="GitHub avatar"
            class="w-full h-full"
          />
        </div>
        <h1 class="md:text-4xl text-2xl font-semibold text-center font-heading text-neutral-100 mt-7">
          Irvan Malik Azantha
        </h1>
        <p class="text-center md:text-xl text-neutral-300 md:mt-1">
          a weeb that just happens to know how to code
        </p>
        <p class="w-fit mx-auto text-center text-sm text-neutral-300 mt-10 px-5 py-1 rounded-full mb-5 bg-neutral-900 bg-opacity-50">
          here's the menu:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {links.map((link, index) => (
            <Link
              href={link.href}
              id={`${link.label.toLowerCase()}-card-link`}
              key={index}
              aria-labelledby={`${link.label}-icon-label`}
              class="w-full relative flex flex-col gap-3 bg-opacity-70 rounded-xl px-5 py-3 bg-neutral-900 transition-[background-color_transform] hover:bg-neutral-800 hover:scale-105 group active:scale-95"
            >
              {link.recommended && (
                <div
                  title="Your donation would really help me!"
                  class="absolute text-xs text-neutral-900 transition-colors group-hover:text-neutral-800 font-semibold rounded-full bg-cyan-500 right-3 top-3 p-2"
                >
                  <LuThumbsUp class="w-4 h-4" />
                </div>
              )}
              {link.icon}
              <div class="flex flex-col" title={link.desc}>
                <p
                  id={`${link.label}-icon-label`}
                  class="text-lg font-semibold text-left font-heading text-neutral-100"
                >
                  {link.label}
                </p>
                <p class="text-left text-neutral-300">{link.desc}</p>
              </div>
            </Link>
          ))}
          <Link
            href={"#intro"}
            title="Scroll down to the introduction section"
            class="w-fit absolute bottom-10 left-1/2 -translate-x-1/2 hover:scale-125 duration-500 transition active:scale-90 bg-neutral-800 rounded-full flex items-center justify-center p-5"
          >
            <div class="w-4 h-4 rounded-full absolute -bottom-1.5 bg-cyan-500" />
            <div class="w-4 h-4 rounded-full absolute -bottom-1.5 bg-cyan-500 animate-ping" />
            <LuArrowDown class="w-8 h-8" />
          </Link>
        </div>
      </section>
      <Marquees>
        <section
          class="w-full relative text-neutral-100 py-28 min-h-screen bg-neutral-900 bg-opacity-20"
          id="intro"
        >
          <div class="mx-auto max-w-4xl w-full relative z-10 py-12 px-5">
            <h1 class="text-3xl md:text-5xl lg:text-6xl font-medium font-heading">
              "Try to be professional!"
              <br />
              <span class="text-cyan-500 font-semibold">Sure</span>.
            </h1>
            <p class="md:text-xl mt-5 text-neutral-300">
              Hello, my name is{" "}
              <span class="text-neutral-100">Irvan Malik Azantha</span>. I'm an
              experienced programmer with 2 years of web development expertise
              and is in the process of expanding into cloud computing. Skilled
              in web development, UI/UX design, and integrating scalable cloud
              services for reliable applications.
            </p>
          </div>
          <Waves />
          <Link
            href={"#stance"}
            title="Stance towards the retarded events"
            class="w-fit absolute bottom-24 left-1/2 -translate-x-1/2 hover:scale-125 duration-500 transition active:scale-90 bg-neutral-800 rounded-full flex items-center justify-center p-5"
          >
            <div class="w-4 h-4 rounded-full absolute -bottom-1.5 bg-red-400" />
            <div class="w-4 h-4 rounded-full absolute -bottom-1.5 bg-red-400 animate-ping" />
            <LuArrowDown class="w-8 h-8" />
          </Link>
        </section>
      </Marquees>
      <section
        class="w-full relative text-neutral-100 py-28 my-20 min-h-screen"
        id="stance"
      >
        <div class="hidden flex-col xl:flex absolute top-12 left-10 items-center w-[400px] gap-5">
          <div class="absolute left-0 inset-y-0 w-56 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
          <Image
            src="https://cdn.realmof.tech/iraq-mosul_h0zwxg.jpg?w=0.6"
            alt="Mosul Devastated"
            width="586"
            height="330"
            class="grayscale rounded-xl w-full object-cover brightness-50"
          />
          <Image
            src="https://cdn.realmof.tech/chinese-amphibious-landing_ujesfh.jpg?w=0.55"
            alt="Just China being China"
            width="563"
            height="376"
            class="grayscale rounded-xl w-full object-cover brightness-50"
          />
        </div>
        <div class="hidden flex-col xl:flex absolute bottom-12 right-10 items-center w-[400px] gap-5">
          <div class="absolute right-0 inset-y-0 w-56 bg-gradient-to-l from-neutral-950 to-transparent z-10" />
          <Image
            src="https://cdn.realmof.tech/ukraine-war_vqtmtr.jpg?w=0.75"
            alt="Ukraine War"
            width="570"
            height="380"
            class="grayscale rounded-xl w-full object-cover brightness-50"
          />
          <Image
            src="https://cdn.realmof.tech/france-riots_mwfiph.jpg?w=0.6"
            alt="France Riots"
            width="559"
            height="314"
            class="grayscale rounded-xl w-full object-cover brightness-50"
          />
        </div>
        <div class="mx-auto max-w-4xl w-full relative z-10 py-8 px-5 rounded-2xl bg-neutral-950 bg-opacity-30 backdrop-blur-md">
          <h1 class="text-3xl md:text-5xl lg:text-6xl font-medium font-heading">
            Stance towards geopolitical
            <br />
            <span class="text-red-400 font-semibold">issues</span>.
          </h1>
          <p class="md:text-xl mt-5 text-neutral-300">
            Listen closely, I'm pretty much{" "}
            <span class="text-neutral-100">neutral</span> towards any retarded
            event that happens in the world. I don't care about your political
            views, I don't care about your religion, I don't care about your
            race, I pretty much <span class="text-neutral-100">don't care</span>
            . I made this website as a canvas. An artistic expression.
          </p>
          <p class="md:text-xl mt-5 text-neutral-300">
            Try to shove your ideological and political{" "}
            <span class="text-red-400">nonsense</span> to me and I won't
            hesitate to <span class="text-red-400">fire back</span> at you.
            Life's already a misery.{" "}
            <span class="text-red-400 font-semibold">
              Don't make it any worse
            </span>
            .
          </p>
          <p class="md:text-xl mt-5 text-neutral-300">
            Alas, this is just a notice for everyone seeing this website. To let
            you know that there's a line that you shouldn't cross. Aside from
            anything mentioned above, I'm pretty much{" "}
            <span class="text-neutral-100">open</span> to anything. Just don't
            be a d*ck.
          </p>
          <blockquote class="text-xl md:text-3xl mt-10 text-neutral-100 bg-neutral-900 pt-5 pb-2 w-full rounded-xl">
            <p class="px-8 py-2 w-fit mx-auto text-heading rounded-full bg-neutral-950">
              Ignorance is bliss.
            </p>
            <p class="w-full px-5 py-2 text-sm text-neutral-300 text-center">
              <cite>Thomas Gray</cite>
            </p>
          </blockquote>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Landing",
  meta: [
    {
      name: "description",
      content: "Realm's Landing Page",
    },
    {
      name: "og:title",
      content: "Landing",
    },
    {
      name: "og:description",
      content: "Realm's Landing Page",
    },
  ],
};
