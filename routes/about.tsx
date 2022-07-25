/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import DefaultLayout from "../components/DefaultLayout.tsx";

const quotes = [
  "Balanced. As all things should be.",
  "Inner peace is what you should always consider seeking.",
  "Do what you want and do it well.",
  "Keep it simple, stupid.",
  "Hail to the chaos banner!",
  "Change is about acceptance, not ignorance towards past.",
  "We all commit crimes. It's the intention that differs.",
  "This is why we can't have nice things.",
  "PSD is not my favorite file format.",
  "I'm not a web developer. I'm a retard.",
];

const randomIndex = Math.floor(Math.random() * 10);
const body = quotes[randomIndex];

export default function Posts() {
  return (
    <DefaultLayout title="About Me" desc="A brief description of me.">
      <header
        className={tw`py-24 w-full flex flex-col md:flex-row justify-center items-center gap-5`}
      >
        <div className={tw`flex flex-col justify-center items-center`}>
          <p className={tw`text-dark-text font-bold text-3xl`}>About Me</p>
          <p className={tw`w-full text-dark-accent-solid text-lg`}>
            A brief description of me.
          </p>
        </div>
      </header>
      <section
        className={tw`flex flex-col w-full bg-dark-nav py-4 px-5 rounded-xl mb-5`}
      >
        <p
          className={tw`text-2xl rounded-xl font-bold text-dark-text mt-1 mb-3 px-4 py-2 bg-dark-accent-semitrans text-center`}
        >
          Description
        </p>
        <p
          className={tw`bg-dark-accent-semitrans text-dark-text px-5 py-2 rounded-xl border-l-4 border-dark-accent-solid`}
        >
          {body}
        </p>
        <p className={tw`text-dark-text mt-3`}>
          Hello, my name's Irvan Malik Azantha. I'm a 19 y'o boy currently
          studying on Universitas Sriwijaya. I live in Palembang, Indonesia. I'm
          a highly enthusiastic person with subtle interest in open source
          projects and keen on learning new things. Also likes to watch anime,
          play games, and have hugs and cuddles (lmao). Give glory for the
          chaos!
        </p>
        <p
          className={tw`text-2xl rounded-xl font-bold text-dark-text my-3 px-4 py-2 bg-dark-accent-semitrans text-center`}
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
          className={tw`text-2xl rounded-xl font-bold text-dark-text my-3 px-4 py-2 bg-dark-accent-semitrans text-center`}
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
          className={tw`text-2xl rounded-xl font-bold text-dark-text my-3 px-4 py-2 bg-dark-accent-semitrans text-center`}
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
      </section>
    </DefaultLayout>
  );
}
