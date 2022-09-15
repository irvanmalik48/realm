import { Handlers, PageProps } from "$fresh/server.ts";
import DefaultLayout from "@components/DefaultLayout.tsx";
import CopyButton from "@islands/CopyButton.tsx";
import { syntaxHighlighterTheme } from "@utils/colors.ts";
import { everblush } from "@utils/everblush.ts";
import { apply, css, tw } from "@utils/twind.ts";
import { quotes } from "@utils/quotes.ts";
import { GitHubUser } from "@/types.d.tsx";
import ky from "ky";
import { Prism } from "rsh";
import * as Themes from "rsh/dist/esm/styles/prism";

export const licenseNotice = `Lapprealm Development License
Version 1.0 - Generic

Copyright (c) 2021 Irvan Malik Azantha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software as a subject to following conditions:

1) Copies of the Software are free to be used, copied, modified, merged, published,
   distributed, sublicensed, and/or sold.
2) The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.
3) If the Software is discontinued and/or archived, any forks in active development
   may replace this license notice with an established non-copyleft license under
   the condition that the above copyright notice shall be reincluded in all copies
   or substantial portions of the Software.
4) Respecting the author and owner of the software that are distributed in any way.
   In the means that decisions that are taken by the author and owner of the
   Software are imposed on both the Software and all its copies, forks, and/or
   distributions under logical considerations and non-restrictive values.

Any attempted revisions to this license are permitted within the Software scope
and are subject to following conditions:

1) Each revisions are given a distinguishing identification name stated next to the
   version number.
2) Each revisions shall not interfere with the non-copyleft nature of the license,
   be it implicit, explicit, inclusive, and/or exclusive, and shall retain all
   properties inherited from the Generic revision.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

export const handler: Handlers<{
  quote: string;
}> = {
  async GET(_req, ctx) {
    const getUsernameInfo = async () => {
      const res = await ky.get("https://api.github.com/users/irvanmalik48", {
        headers: {
          Authorization: "token " + Deno.env.get("GH_ACCESS_TOKEN")!,
        },
      });
      return await res.json() as GitHubUser;
    };
    const usernameInfo: GitHubUser = await getUsernameInfo();
    const randomIndex = Math.floor(Math.random() * 20);
    const body = {
      user: usernameInfo,
      quote: quotes[randomIndex],
    };

    return await ctx.render(body);
  },
};

export default function About(
  props: PageProps<{
    user: GitHubUser;
    quote: string;
  }>,
) {
  const preStyle = css({
    pre:
      apply`text-dark-text font-mono bg-dark-bg text-sm overflow-x-auto px-5 my-0 py-4 rounded-xl ${
        css(
          {
            code:
              apply`bg-transparent font-mono text-dark-text p-0 m-0 font-normal`,
          },
        )
      }`,
    "pre::-webkit-scrollbar": apply`bg-transparent rounded-xl h-5`,
    "pre::-webkit-scrollbar-thumb":
      apply`bg-dark-accent-solid border-transparent border-[8px] border-solid bg-clip-content rounded-xl`,
  });

  return (
    <DefaultLayout
      title="About Me"
      desc="A brief description of me."
      active="about"
    >
      <header
        className={tw`py-24 w-full flex flex-col md:flex-row justify-center items-center gap-5`}
      >
        <div className={tw`flex flex-col justify-center items-center`}>
          <p className={tw`text-dark-text font-bold text-3xl font-heading`}>
            About Me
          </p>
          <p className={tw`w-full text-dark-accent-solid text-lg`}>
            A brief description of me.
          </p>
        </div>
      </header>
      <section
        className={tw`flex flex-col w-full bg-dark-navglass py-4 px-5 rounded-xl mb-5 ${preStyle} ${
          css(
            {
              "backdrop-filter": "blur(.5rem)",
            },
          )
        }`}
      >
        <a href={props.data.user.html_url} className={tw`group`}>
          <div
            className={tw`flex flex-col justify-center items-center md:flex-row gap-5 p-5`}
          >
            <img
              className={tw`transition-all duration-200 ease-out rounded-full w-[fit-content] h-[200px] md:h-[125px] lg:h-[150px] xl:h-[200px] ring-4 ring-transparent group-hover:ring-dark-accent-semitrans`}
              src={props.data.user.avatar_url}
              alt="GitHub Avatar"
            />
            <div
              className={tw`flex flex-col gap-3 bg-dark-side rounded-xl px-5 py-3 flex-grow w-full md:w-auto h-auto group-hover:bg-dark-accent-quartertrans transition-all duration-200 ease-out`}
            >
              <p
                className={tw`text-dark-text font-bold text-2xl font-mono text-center w-full`}
              >
                {props.data.user.name}{" "}
                (<span className={tw`text-dark-accent-solid`}>
                  {props.data.user.login}
                </span>)
              </p>
              <div className={tw`grid xl:grid-cols-2`}>
                <div>
                  <p className={tw`text-dark-text`}>
                    <span className={tw`font-bold`}>Name:</span>{" "}
                    {props.data.user.name}
                  </p>
                  <p className={tw`text-dark-text`}>
                    <span className={tw`font-bold`}>Followers:</span>{" "}
                    {props.data.user.followers}
                  </p>
                  <p className={tw`text-dark-text`}>
                    <span className={tw`font-bold`}>Following</span>{" "}
                    {props.data.user.following}
                  </p>
                </div>
                <div>
                  <p className={tw`text-dark-text`}>
                    <span className={tw`font-bold`}>University:</span>{" "}
                    {props.data.user.company}
                  </p>
                  <p className={tw`text-dark-text`}>
                    <span className={tw`font-bold`}>Location:</span>{" "}
                    {props.data.user.location}
                  </p>
                  <p className={tw`text-dark-text`}>
                    <span className={tw`font-bold`}>Email:</span>{" "}
                    {props.data.user.email}
                  </p>
                </div>
              </div>
              <p
                className={tw`bg-dark-accent-semitrans h-[fit-content] w-full text-dark-text text-center px-5 py-2 rounded-xl border-l-4 border-r-4 border-dark-accent-solid mb-2`}
              >
                {props.data.quote}
              </p>
            </div>
          </div>
        </a>
        <p
          className={tw`text-2xl rounded-xl font-bold text-dark-text mt-1 mb-3 px-4 py-2 bg-dark-accent-semitrans text-center font-heading`}
        >
          Description
        </p>
        <p className={tw`text-dark-text`}>
          Hello, my name's Irvan Malik Azantha. I'm a 19 y'o man currently
          studying on Universitas Sriwijaya. I live in Palembang, Indonesia. I'm
          a self taught developer that loves to learn new things.
        </p>
        <p className={tw`text-dark-text mt-3`}>
          I've started programming since 2020 (2018 actually but that's mostly
          just buzzing around with stuffs) and I've been pretty much hooked up
          with it until now. You might find me annoying sometimes (if you know
          me or somehow make a contact with me in one of social media platforms
          where I simply exist) but that's what I tend to always do to just have
          fun. No offense given at all. And finally,{" "}
          <a
            className={tw`text-dark-accent-solid hover:text-dark-text transition-all ease-out duration-200 break-all`}
            href="https://t.me/gnuweeb"
          >
            GNU/Weeb
          </a>{" "}
          is my place where I moderate and also contribute to nowadays.
        </p>
        <p
          className={tw`text-2xl rounded-xl font-bold text-dark-text my-3 px-4 py-2 bg-dark-accent-semitrans text-center font-heading`}
        >
          About This Website
        </p>
        <p
          className={tw`bg-dark-accent-semitrans text-dark-text px-5 py-2 rounded-xl border-l-4 border-dark-accent-solid`}
        >
          A brief description about this website I made.
        </p>
        <p className={tw`text-dark-text mt-3`}>
          So yeah, this is my website. It's that simple. <strong>Oh,</strong>
          {" "}
          you guys <em>want</em> to hear <strong>the story</strong>{" "}
          behind it! To make it summed up and described real quick, this website
          is first made out of pure curiosity. It was back at the days when I
          was still a CS freshmen. At one day, in a specific web development
          course, I think to myself, "It would be nice to have a website where I
          can do <em>whatever the f*ck</em>{" "}
          I want". And yes, there you have it, a blog.
        </p>
        <p className={tw`text-dark-text mt-3`}>
          This website is made with Deno's{" "}
          <a
            className={tw`text-dark-accent-solid hover:text-dark-text transition-all ease-out duration-200 break-all`}
            href="https://fresh.deno.dev/"
          >
            fresh
          </a>{" "}
          framework. The tools for stylings are provided by{" "}
          <a
            className={tw`text-dark-accent-solid hover:text-dark-text transition-all ease-out duration-200 break-all`}
            href="https://twind.dev/"
          >
            Twind
          </a>{" "}
          (it's essentially just{" "}
          <a
            className={tw`text-dark-accent-solid hover:text-dark-text transition-all ease-out duration-200 break-all`}
            href="https://tailwindcss.com/"
          >
            Tailwind
          </a>{" "}
          but the entire thing is CSS-in-JS). This website is hosted on{" "}
          <a
            className={tw`text-dark-accent-solid hover:text-dark-text transition-all ease-out duration-200 break-all`}
            href="https://deno.com/deploy"
          >
            Deno Deploy
          </a>
          . And yes, I know my stack is pretty <em>edgy</em> (or should I say,
          {" "}
          <em>bleeding edge</em>?) but this is my website. I can do whatever I
          want with it.
        </p>
        <p
          className={tw`text-2xl rounded-xl font-bold text-dark-text my-3 px-4 py-2 bg-dark-accent-semitrans text-center font-heading`}
        >
          Stuffs I Like
        </p>
        <p
          className={tw`bg-dark-accent-semitrans text-dark-text px-5 py-2 rounded-xl border-l-4 border-dark-accent-solid`}
        >
          Bunch of things I like to do or see.
        </p>
        <ul
          className={tw`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 list-disc list-inside my-3`}
        >
          <li>Watching Anime</li>
          <li>Coding</li>
          <li>Blogging</li>
          <li>Playing Azur Lane</li>
          <li>Eating cheese</li>
          <li>Drinking coffee</li>
          <li>Playing games</li>
          <li>Sleeping</li>
          <li>Chaos</li>
          <li>Hanging out</li>
          <li>Money</li>
          <li>Peace</li>
        </ul>
        <p
          className={tw`text-2xl rounded-xl font-bold text-dark-text my-3 px-4 py-2 bg-dark-accent-semitrans text-center font-heading`}
        >
          Current Affiliation
        </p>
        <p
          className={tw`bg-dark-accent-semitrans text-dark-text px-5 py-2 rounded-xl border-l-4 border-dark-accent-solid`}
        >
          Organizations and/or communities that I participate in.
        </p>
        <ul
          className={tw`grid grid-cols-1 xl:grid-cols-2 list-disc list-inside my-3`}
        >
          <li>CompSci Student at Universitas Sriwijaya</li>
          <li>Contributor and Moderator at GNU/Weeb</li>
          <li>Contributor and Moderator at Wibutech</li>
          <li>Member of Web Development Team at GDSC Unsri</li>
          <li>Co-Founder and Co-Lead at Avaritia Clo. (Ltd.)</li>
          <li>Voluntary Member of HMIF Unsri (Srifoton)</li>
        </ul>
        <p
          className={tw`text-2xl rounded-xl font-bold text-dark-text my-3 px-4 py-2 bg-dark-accent-semitrans text-center font-heading`}
        >
          Tools
        </p>
        <p
          className={tw`bg-dark-accent-semitrans text-dark-text px-5 py-2 rounded-xl border-l-4 border-dark-accent-solid`}
        >
          Tools/Languages that I use.
        </p>
        <ul
          className={tw`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 list-disc list-inside my-3`}
        >
          <li>GNU/Linux</li>
          <li>Java</li>
          <li>Javascript</li>
          <li>Typescript</li>
          <li>HTML5/CSS3</li>
          <li>Tailwind</li>
          <li>React/Preact</li>
          <li>PHP</li>
          <li>Go</li>
          <li>Node.js</li>
          <li>Deno</li>
          <li>Firebase/Supabase</li>
        </ul>
        <p
          className={tw`text-2xl rounded-xl font-bold text-dark-text my-3 px-4 py-2 bg-dark-accent-semitrans text-center font-heading`}
        >
          License Notice
        </p>
        <p
          className={tw`bg-dark-accent-semitrans text-dark-text text-center px-5 py-2 rounded-xl border-x-4 border-dark-accent-solid mb-3`}
        >
          Lapprealm Development License
        </p>
        <code
          className={tw`text-dark-text font-mono bg-dark-bg text-sm overflow-x-auto mb-1 rounded-xl overflow-clip`}
        >
          <div className={tw`px-5 py-2 bg-dark-superdark`}>
            <p
              className={tw`w-full flex flex-row justify-between items-center`}
            >
              <span
                className={tw`w-[fit-content] gap-2 flex flex-row justify-center items-center`}
              >
                <span
                  className={tw`font-mono bg-dark-accent-semitrans w-[fit-content] text-sm text-dark-accent-solid font-semibold px-4 py-0.5 my-1 rounded-3xl`}
                >
                  Version 1.0
                </span>
              </span>
              <span></span>
              <CopyButton
                text={licenseNotice}
              />
            </p>
          </div>
          <Prism
            language="text"
            style={(syntaxHighlighterTheme as string) === "everblush"
              ? everblush
              : Themes[syntaxHighlighterTheme]}
          >
            {licenseNotice}
          </Prism>
        </code>
      </section>
    </DefaultLayout>
  );
}
