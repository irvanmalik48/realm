// deno-lint-ignore-file no-explicit-any
/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import DefaultLayout from "../components/DefaultLayout.tsx";
import { Post } from "../types.d.tsx";
import { walk } from "https://deno.land/std@0.147.0/fs/walk.ts";
import { loadPost } from "../utils/load.ts";
import PostCard from "../components/PostCard.tsx";

const posts = new Map<string, Post>();

async function loadContent(postsDirectory: string) {
  for await (const entry of walk(postsDirectory)) {
    if (entry.isFile && entry.path.endsWith(".md")) {
      const [key, post]: [string, Post] = await loadPost(postsDirectory, entry.path);
      posts.set(key, post);
    }
  }
}

function ChaosLogo(props: { class: string }) {
  return (
    <svg
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.class}
    >
      <circle cx="250" cy="250" r="194" stroke="#2E3440" stroke-width="12" />
      <rect x="243" y="100" width="15" height="300" fill="#88C0D0" />
      <path d="M250 70L275.981 115H224.019L250 70Z" fill="#88C0D0" />
      <path d="M250 430L224.019 385H275.981L250 430Z" fill="#88C0D0" />
      <rect
        x="100"
        y="257"
        width="15"
        height="300"
        transform="rotate(-90 100 257)"
        fill="#88C0D0"
      />
      <path d="M70 250L115 224.019V275.981L70 250Z" fill="#88C0D0" />
      <path d="M430 250L385 275.981V224.019L430 250Z" fill="#88C0D0" />
      <rect
        x="139.477"
        y="148.95"
        width="15"
        height="300"
        transform="rotate(-45 139.477 148.95)"
        fill="#88C0D0"
      />
      <path
        d="M123.213 122.787L173.404 136.235L136.662 172.978L123.213 122.787Z"
        fill="#88C0D0"
      />
      <path
        d="M377.772 377.345L327.581 363.897L364.323 327.154L377.772 377.345Z"
        fill="#88C0D0"
      />
      <rect
        x="148.95"
        y="361.523"
        width="15"
        height="300"
        transform="rotate(-135 148.95 361.523)"
        fill="#88C0D0"
      />
      <path
        d="M122.787 377.787L136.235 327.596L172.978 364.338L122.787 377.787Z"
        fill="#88C0D0"
      />
      <path
        d="M377.345 123.228L363.897 173.419L327.154 136.677L377.345 123.228Z"
        fill="#88C0D0"
      />
      <rect
        x="151.393"
        y="250"
        width="140"
        height="140"
        transform="rotate(-45 151.393 250)"
        stroke="#2E3440"
        stroke-width="15"
      />
    </svg>
  );
}

export default function Home() {
  const postProps: any[] = [];

  loadContent("posts/");

  for (const [_key, post] of posts.entries()) {
    postProps.push(post);
  }

  postProps.sort((a: any, b: any) => {
    return a["date"] < b["date"] ? 1 : -1;
  });

  return (
    <DefaultLayout
      title="IrvanMA's Lair"
      desc="Do what you want and do it well."
    >
      <header
        className={tw`px-2 xl:px-48 py-24 w-full flex flex-row justify-center items-center gap-5`}
      >
        <ChaosLogo
          class={tw`bg-dark-side rounded-full w-[100px] h-[fit-content]`}
        />
        <div className={tw`flex flex-col justify-start items-center`}>
          <p className={tw`text-dark-text font-bold text-3xl`}>
            Irvan Malik Azantha
          </p>
          <p className={tw`w-full text-dark-accent-solid text-lg`}>
            Do what you want and do it well.
          </p>
        </div>
      </header>
      <section className={tw`mb-10 w-full bg-dark-nav py-4 px-5 rounded-xl`}>
        <p className={tw`text-2xl font-semibold text-dark-text mb-3`}>
          Description
        </p>
        <p
          className={tw`bg-dark-accent-semitrans text-dark-text px-5 py-2 rounded-xl border-l-4 border-dark-accent-solid`}
        >
          Keep it simple, stupid.
        </p>
        <p className={tw`text-dark-text mt-3`}>
          Hello, my name's Irvan Malik Azantha. I'm a 19 y'o boy currently
          studying on Universitas Sriwijaya. I live in Palembang, Indonesia. I'm
          a highly enthusiastic person with subtle interest in open source
          projects and keen on learning new things. Also likes to watch anime,
          play games, and have hugs and cuddles (lmao). Give glory for the
          chaos!
        </p>
      </section>
      <section
        className={tw`flex flex-col w-full bg-dark-nav py-4 px-5 rounded-xl mb-5`}
      >
        <p className={tw`text-2xl font-semibold text-dark-text mb-3`}>
          Recent Posts
        </p>
        <p
          className={tw`bg-dark-accent-semitrans text-dark-text px-5 py-2 rounded-xl border-l-4 border-dark-accent-solid`}
        >
          Recent 4 posts that I have written currently.
        </p>
        <div
          className={tw`grid grid-cols-1 xl:grid-cols-2 mt-5 gap-5 items-between`}
        >
          {postProps.slice(0, 4).map((data: any, key: any) => {
            return (
              <PostCard
                key={key}
                path={"/posts" + data.path}
                title={data.title}
                date={data.date}
                desc={data.desc}
                tag={data.tag}
              />
            );
          })}
        </div>
        <p className={tw`p-0 m-0 mt-2 text-center w-full`}>
          <a
            className={tw`bg-transparent px-4 py-2 inline-block text-sm text-uppercase text-dark-text rounded-3xl transition-all duration-200 ease-linear hover:bg-dark-accent-semitrans hover:text-dark-accent-solid ring ring-dark-accent-quartertrans hover:ring-dark-accent-solid font-bold w-[fit-content] mt-5`}
            href="/blog"
          >
            More Posts
          </a>
        </p>
      </section>
    </DefaultLayout>
  );
}
