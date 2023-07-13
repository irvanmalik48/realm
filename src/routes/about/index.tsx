import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import {
  SiJekyll,
  SiGithub,
  SiHtml5,
  SiCss3,
  SiMarkdown,
  SiNextdotjs,
  SiReact,
  SiBootstrap,
  SiVercel,
  SiSass,
  SiDeno,
  SiPreact,
  SiTailwindcss,
  SiAstro,
  SiSolid,
  SiMdx,
  SiTypescript,
  SiPrisma,
  SiSupabase,
} from "@qwikest/icons/simpleicons";
import { twMerge } from "tailwind-merge";

export default component$(() => {
  const iterationClassMerged = twMerge(
    "w-full p-5 rounded-xl flex flex-col items-center justify-center",
    "gap-5 bg-neutral-900 bg-opacity-200 not-prose"
  );

  const proseStuff = twMerge(
    "w-full prose max-w-full prose-invert prose-lg prose-headings:mb-6",
    "prose-headings:font-heading prose-headings:text-neutral-100",
    "prose-p:text-neutral-300 prose-headings:font-semibold mt-10",
    "prose-headings:w-full prose-headings:border-b prose-headings:pb-3",
    "prose-headings:border-neutral-700 prose-h2:text-3xl"
  );

  const iterationHeadingClasses = twMerge(
    "text-xl font-semibold mx-auto px-5 py-1",
    "rounded-full bg-neutral-950 font-heading"
  );

  return (
    <>
      <section class="w-full max-w-4xl px-5 py-24 mx-auto min-h-screen relative">
        <h1 class="text-3xl md:text-5xl lg:text-6xl w-full mt-24 font-medium font-heading">
          About me, and some
          <br />
          <span class="font-semibold text-cyan-500">other stuffs</span>.
        </h1>
        <p class="mt-5 text-neutral-300 text-lg">
          Knowing me a bit doesn't hurt, right?
        </p>
        <div class={proseStuff}>
          <h2 id="toc">Table of Contents</h2>
          <ul>
            <li>
              <Link href="#inception">Inception</Link>
            </li>
            <li>
              <Link href="#exposure-to-technology">Exposure to technology</Link>
            </li>
            <li>
              <Link href="#interests-in-programming">
                Interests in programming
              </Link>
            </li>
            <li>
              <Link href="#bangkit-academy">Bangkit Academy</Link>
            </li>
            <li>
              <Link href="#current-situation">Current Situation</Link>
            </li>
            <li>
              <Link href="#about-this-website">About this website</Link>
            </li>
            <li>
              <Link href="#skills">Skills</Link>
            </li>
            <li>
              <Link href="#certifications">Certifications</Link>
            </li>
            <li>
              <Link href="#hobbies">Hobbies and Interests</Link>
            </li>
            <li>
              <Link href="#avoid-at-all-costs">Avoid at all costs</Link>
            </li>
            <li>
              <Link href="#contact">Contact</Link>
            </li>
          </ul>
          <h2 id="inception">Inception</h2>
          <p>
            I was born in 2003, March 1st, in Palembang, Indonesia, to a small
            but happy family. My father's a soldier, and my mother's a civil
            servant serving in the army. I have a younger brother and a younger
            sister. I'm the oldest child in the family.
          </p>
          <p>
            I was raised under a strict discipline, and I'm grateful for that. I
            went to a standard public elementary, junior, and senior high
            school. I was never the best at school, but I sure did the best I
            could.
          </p>
          <p>
            I was also raised under a strict religious and morale values. I'm a
            Muslim, if that's your concern. But anyways, I'm not that religious
            of a person. Do note that our family despises any form of extremism,
            and are highly moderate in our religious values.
          </p>
          <h2 id="exposure-to-technology">Exposure to technology</h2>
          <p>
            I was introduced to computers at a very young age. My father bought
            a computer when I was 5 years old, and I was fascinated by the fact
            that I can do pretty cool stuffs with it. I was introduced to the
            internet when I was 8 years old, and it was certainly a
            life-changing experience.
          </p>
          <h2 id="interests-in-programming">Interests in programming</h2>
          <p>
            I got a glimpse of programming when I was 16 years old. My first
            ever programming language was Java, and I was introduced to it by,
            you know, f*cking around and find out how to mod Minecraft. Under
            the guidance of my friend, I learned the basics of Java and how to
            mod Minecraft. Pretty niche way of starting up, I guess. But
            whatever works.
          </p>
          <p>
            I got hiatus from programming for a year or so, due to some personal
            reasons. But I got back into it when I was 17 years old. I applied
            for an undergraduate study of Informatics Engineering in Universitas
            Sriwijaya, and I got accepted.
          </p>
          <blockquote>
            <p>
              Here's a bit of fun fact: the university's curriculum uses Java
              which is the first programming language I learned. I guess it's
              fate that I got accepted there.
            </p>
          </blockquote>
          <h2 id="bangkit-academy">Bangkit Academy</h2>
          <p>
            I got accepted into Bangkit Academy in February 2023. Bangkit
            Academy is a program that's designed to prepare students with
            in-demand skills and tech certifications. The Bangkit curriculum
            offers 3 interdisciplinary learning paths - machine learning, mobile
            development, and cloud computing. I got accepted into the cloud
            computing path.
          </p>
          <p>
            Going on with the program, I learned a lot of things. They also
            provide me with a lot of soft skill trainings, which is very useful.
            I also got to learn and improve my English skills, which is also
            very useful.
          </p>
          <h2 id="current-situation">Current Situation</h2>
          <p>
            Fast forward to now, I'm currently in my seventh semester of my
            undergraduate study. I'm on my way to prep up for the upcoming
            undergraduate thesis I'm about to do. I'm also looking for a job as
            a part-time programmer, so if you're interested, please{" "}
            <a href="mailto:irvanma@realmof.tech">email me</a> or contact me in
            any way possible. I'm pretty much very active and are open to any
            opportunities.
          </p>
          <h2 id="about-this-website">About this website</h2>
          <p>
            This website, well, my website, has been gone through a lot of
            redesigns and reworks. I've been using a lot of different
            technologies to build this website, and I'm pretty sure I'm not
            gonna stop anytime soon.
          </p>
          <div class={iterationClassMerged}>
            <h3 class={iterationHeadingClasses}>First iteration</h3>
            <div class="gap-5 flex items-center justify-center flex-wrap">
              <SiJekyll class="w-16 h-16" />
              <SiGithub class="w-16 h-16" />
              <SiHtml5 class="w-16 h-16" />
              <SiCss3 class="w-16 h-16" />
              <SiMarkdown class="w-16 h-16" />
            </div>
          </div>
          <p>
            The first iteration of my website was built using Jekyll, a static
            site generator built with Ruby. You can check out their official
            website <a href="https://jekyllrb.com/">here</a>. It's pretty
            simple, fast, and easy to use. But I'm not really a fan of Ruby, so
            I decided to move on.
          </p>
          <div class={iterationClassMerged}>
            <h3 class={iterationHeadingClasses}>Second iteration</h3>
            <div class="gap-5 flex items-center justify-center flex-wrap">
              <SiNextdotjs class="w-16 h-16" />
              <SiReact class="w-16 h-16" />
              <SiTypescript class="w-16 h-16" />
              <SiBootstrap class="w-16 h-16" />
              <SiSass class="w-16 h-16" />
              <SiTailwindcss class="w-16 h-16" />
              <SiVercel class="w-16 h-16" />
              <SiMarkdown class="w-16 h-16" />
            </div>
          </div>
          <p>
            The second iteration of my website was built using Next.js, a React
            framework for building static and server-side rendered websites. You
            can check out their official website{" "}
            <a href="https://nextjs.org/">here</a>. I'm very eager to learn
            React back then, but instead of starting ground up from CRA or Vite
            or something, I decided to use Next.js instead. I used it for a
            while until I got bored of it. It was a great experience though.
          </p>
          <p>
            This is also where I first learned about Tailwind CSS. I was pretty
            skeptical about it at first, but I decided to give it a try. And I'm
            glad I did. Ditched Bootstrap from my codebase and rewrote
            everything using Tailwind CSS. Let's just say that it's the revision
            of the second iteration.
          </p>
          <p>
            And this is also where I first learned about Typescript. It is a
            superset of JavaScript that provides static typing to the language.
            I don't even have to explain it, you can check out their official
            website <a href="https://www.typescriptlang.org/">here</a>. I'm not
            gonna lie, it was pretty hard to learn at first. But once you get
            the hang of it, it's pretty easy to use.
          </p>
          <div class={iterationClassMerged}>
            <h3 class={iterationHeadingClasses}>Third iteration</h3>
            <div class="gap-5 flex items-center justify-center flex-wrap">
              <SiDeno class="w-16 h-16" />
              <SiPreact class="w-16 h-16" />
              <SiTypescript class="w-16 h-16" />
              <SiTailwindcss class="w-16 h-16" />
              <SiMarkdown class="w-16 h-16" />
            </div>
          </div>
          <p>
            Next stop, I decided to use Deno's homebaked framework, fresh, to
            build my website. You can check out their official website{" "}
            <a href="https://fresh.deno.dev/">here</a>. I was very interested in
            Deno back then, and I decided to give it a try. The framework also
            introduced me to the concept of{" "}
            <a href="https://www.patterns.dev/posts/islands-architecture">
              Islands Architecture
            </a>
            . It basically means that instead of having a monolithic, heavy SPA
            running, the Islands Architecture encourages small, focused chunks
            of interactivity within server-rendered web pages. It made my
            website very fast since I'm not loading a lot of JavaScript, and I'm
            only loading the JavaScript that I need. But I got bored of it, too,
            and I decided to move on.
          </p>
          <div class={iterationClassMerged}>
            <h3 class={iterationHeadingClasses}>Fourth iteration</h3>
            <div class="gap-5 flex items-center justify-center flex-wrap">
              <SiAstro class="w-16 h-16" />
              <SiSolid class="w-16 h-16" />
              <SiPrisma class="w-16 h-16" />
              <SiSupabase class="w-16 h-16" />
              <SiTypescript class="w-16 h-16" />
              <SiTailwindcss class="w-16 h-16" />
              <SiMdx class="w-16 h-16" />
            </div>
          </div>
          <p>
            At fourth iteration, I decided to use Astro in tandem with Solid
            components. You can check out Astro's official website{" "}
            <a href="https://astro.build/">here</a> and Solid's official website{" "}
            <a href="https://www.solidjs.com/">here</a>. I was very interested
            in Astro's concept of shipping only the JavaScript that you need,
            and I was also very interested in Solid's concept of reactive
            components. I decided to give it a try, and I'm very happy with the
            result. They're not kidding when they said that Astro is the fastest
            way to build a website. I'm also very happy with Solid's reactive
            components. It's very easy to use if you're already familiar with
            React, and it's very fast and lightweight with the most fine-grained
            reactivity system I've ever seen. But then, you guessed it, I got
            bored of it, too.
          </p>
          <p>
            This is also where I first learned about MDX. As my needs of dynamic
            content inside my blog posts grew, I decided to use MDX to write my
            blog posts. It's very easy to use, and it's very powerful. I'm very
            happy with it.
          </p>
          <div class={iterationClassMerged}>
            <h3 class={iterationHeadingClasses}>Fifth iteration</h3>
            <div class="gap-5 flex items-center justify-center flex-wrap">
              <svg
                viewBox="0 0 144 152"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 w-auto"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d={[
                    "M140.486 53.6496L135.013 43.5496L132.158",
                    "38.3806L131.028 36.3606L130.908 36.4806L115.918",
                    "10.5166C112.17 3.98164 105.15 -0.0583616 97.5339",
                    "0.000637503L84.3899 0.357638L45.1849 0.476639C37.7499",
                    "0.536639 30.9679 4.45664 27.2199 10.8136L3.52285",
                    "57.7925C-0.910409 64.5681 -1.22471 73.7217 2.95088",
                    "80.7406L27.8169 121.973C31.6249 128.33 38.5249",
                    "132.133 45.9609 132.073L58.2759 131.953L125.616",
                    "151.738L125.434 151.556C126.38 152.102 127.644",
                    "151.113 127.042 150.074L113.122 122.686L137.392",
                    "77.8296L138.166 76.9386L138.192 76.9074C138.48 76.5609",
                    "138.768 76.2151 138.999 75.8686C143.759 69.3936 144.412",
                    "60.7186 140.486 53.6486V53.6496ZM97.9539 124.706L98.0119",
                    "124.697V124.586L97.9539 124.702V124.706ZM96.9798",
                    "116.852L97.9097 124.365L97.7881 124.245L97.8319",
                    "124.646L39.7119 66.9576L53.9889 53.1146L48.6973",
                    "21.3262L45.9055 5.30917L46.0179 5.16964L52.8668",
                    "12.6935L102.115 66.3636L101.918 66.5788L101.938",
                    "66.6006L101.404 67.1401L92.5969 76.7606L96.9798 116.852Z",
                  ].join(" ")}
                  fill="currentColor"
                />
              </svg>
              <SiTypescript class="w-16 h-16" />
              <SiTailwindcss class="w-16 h-16" />
              <SiMdx class="w-16 h-16" />
            </div>
          </div>
          <p>
            And now, we're here, the fifth iteration. I decided to use Qwik to
            build my website. You can check out their official website{" "}
            <a href="https://qwik.builder.io/">here</a>. I was very interested
            in Qwik. It is a new kind of web framework that can deliver instant
            loading web applications at any size or complexity. Your sites and
            apps can boot with about 1kb of JS (regardless of application
            complexity), and achieve consistent performance at scale. They don't
            joke around when they said the big O notation of Qwik is O(1).
          </p>
          <p>
            Qwik City is a framework built on top of Qwik. It's a framework that
            provides much utilities for building a webapp with Qwik. Tho, it
            forces me to use Vercel's edge functions, which is not a bad thing.
            Notice how stupid fast this website is? That's because of Vercel's
            edge functions.
          </p>
          <h2 id="skills">Skills</h2>
          <p>
            After all that I've learned and experienced, I can say that I'm good
            at:
          </p>
          <ul>
            <li>Web Development</li>
            <li>Cloud Computing</li>
            <li>UI/UX Design</li>
            <li>Next.js</li>
            <li>React</li>
            <li>TypeScript</li>
          </ul>
          <h2 id="certifications">Certifications</h2>
          <p>
            I have so many certifications, but I'll just list the most important
            ones:
          </p>
          <ul>
            <li>
              <a
                href="https://www.coursera.org/account/accomplishments/specialization/certificate/TWXPNJJ84CHP"
                target="_blank"
              >
                Meta Front End Developer
              </a>
            </li>
            <li>
              <a
                href="https://www.apollographql.com/tutorials/certifications/dcf4e570-b7b8-4247-800d-e2d6e8eeb575"
                target="_blank"
              >
                Apollo Graph Developer Associate
              </a>
            </li>
            <li>
              <a
                href="https://www.freecodecamp.org/certification/irvanmalik48/responsive-web-design"
                target="_blank"
              >
                freeCodeCamp Responsive Web Design
              </a>
            </li>
            <li>
              <a href="https://www.hackerrank.com/certificates/a50cc5255704">
                Hackerrank JavaScript (Intermediate)
              </a>
            </li>
            <li>
              <a href="https://www.hackerrank.com/certificates/3c53945ca26a">
                Hackerrank SQL (Advanced)
              </a>
            </li>
          </ul>
          <h2 id="hobbies">Hobbies and Interests</h2>
          <p>
            I don't have many hobbies and interests. But here's some of them:
          </p>
          <ul>
            <li>Programming random stuffs</li>
            <li>Designing something</li>
            <li>Playing games</li>
            <li>Watching anime</li>
            <li>Reading manga</li>
            <li>Hunting for cafes</li>
          </ul>
          <h2 id="avoid-at-all-costs">Avoid at all costs</h2>
          <p>I don't like these things:</p>
          <ul>
            <li>People not using dark mode</li>
            <li>
              People who demands responsibility but doesn't take responsibility
            </li>
            <li>People who doesn't know how to use Google</li>
            <li>People who tried to argue with me about geopolitical issues</li>
            <li>
              Computer Science/Informatics Engineering undergrads that can't
              code
            </li>
            <li>You</li>
          </ul>
          <p>
            Yeah, you. I hate all of you equally. No discrimination. Just pure
            hatred👍.
          </p>
          <h2 id="contact">Contact</h2>
          <p>
            You have so many ways to contact me. But I'll just list the most
            important ones:
          </p>
          <ul>
            <li>
              <a href="mailto:irvanma@realmof.tech">Email</a>
            </li>
            <li>
              <a href="https://twitter.com/irvanmalik48">
                Twitter (yeah, please don't)
              </a>
            </li>
            <li>
              <a href="https://social.gnuweeb.org/@lappland" rel="me">
                Mastodon
              </a>
            </li>
            <li>
              <a href="https://threads.net/@irvann48_">Threads</a>
            </li>
            <li>
              <a href="https://instagram.com/irvann48_">Instagram</a>
            </li>
            <li>
              <a href="https://t.me/lapplund">Telegram</a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "About",
  meta: [
    {
      name: "description",
      content: "About me",
    },
    {
      name: "og:title",
      content: "About",
    },
    {
      name: "og:description",
      content: "About me",
    },
  ],
};
