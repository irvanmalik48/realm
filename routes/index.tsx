import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "@/types.d.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import PostCard from "@components/PostCard.tsx";
import { loadContent, timeToRead } from "@utils/load.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";
import { quotes } from "@utils/quotes.ts";
import { tw } from "@utils/twind.ts";

const posts = await loadContent("posts/");

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
      <circle
        cx="250"
        cy="250"
        r="194"
        stroke={colorScheme[currentColorScheme].dark.nav}
        stroke-width="12"
      />
      <rect
        x="243"
        y="100"
        width="15"
        height="300"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M250 70L275.981 115H224.019L250 70Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M250 430L224.019 385H275.981L250 430Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <rect
        x="100"
        y="257"
        width="15"
        height="300"
        transform="rotate(-90 100 257)"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M70 250L115 224.019V275.981L70 250Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M430 250L385 275.981V224.019L430 250Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <rect
        x="139.477"
        y="148.95"
        width="15"
        height="300"
        transform="rotate(-45 139.477 148.95)"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M123.213 122.787L173.404 136.235L136.662 172.978L123.213 122.787Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M377.772 377.345L327.581 363.897L364.323 327.154L377.772 377.345Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <rect
        x="148.95"
        y="361.523"
        width="15"
        height="300"
        transform="rotate(-135 148.95 361.523)"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M122.787 377.787L136.235 327.596L172.978 364.338L122.787 377.787Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <path
        d="M377.345 123.228L363.897 173.419L327.154 136.677L377.345 123.228Z"
        fill={colorScheme[currentColorScheme].dark.accent.solid}
      />
      <rect
        x="151.393"
        y="250"
        width="140"
        height="140"
        transform="rotate(-45 151.393 250)"
        stroke={colorScheme[currentColorScheme].dark.nav}
        stroke-width="15"
      />
    </svg>
  );
}

export const handler: Handlers<{
  quote: string;
}> = {
  GET(_req, ctx) {
    const randomIndex = Math.floor(Math.random() * 20);
    const body = {
      quote: quotes[randomIndex],
    };

    return ctx.render(body);
  },
};

export default function Home(
  props: PageProps<{
    quote: string;
  }>,
) {
  const postProps: Post[] = [];

  for (const [_key, post] of posts.entries()) {
    postProps.push(post);
  }

  postProps.sort((a, b) => {
    return a.date && b.date && a.date < b.date ? 1 : -1;
  });

  return (
    <DefaultLayout
      title="IrvanMA's Lair"
      desc="Do what you want and do it well."
    >
      <header
        className={tw`py-24 w-full flex flex-col md:flex-row justify-center items-center gap-5`}
      >
        <ChaosLogo
          class={tw`bg-dark-side rounded-full w-[200px] md:w-[100px] h-[fit-content]`}
        />
        <div className={tw`flex flex-col justify-start items-center`}>
          <p className={tw`text-dark-text font-bold text-3xl font-heading`}>
            Irvan Malik Azantha
          </p>
          <p className={tw`w-full text-dark-accent-solid text-lg`}>
            Do what you want and do it well.
          </p>
        </div>
      </header>
      <section className={tw`mb-10 w-full bg-dark-nav py-4 px-5 rounded-xl`}>
        <p
          className={tw`text-2xl font-semibold text-dark-text mb-3 font-heading`}
        >
          Description
        </p>
        <p
          className={tw`bg-dark-accent-semitrans text-dark-text px-5 py-2 rounded-xl border-l-4 border-dark-accent-solid`}
        >
          {props.data.quote}
        </p>
        <p className={tw`text-dark-text mt-3`}>
          Hello, my name's Irvan Malik Azantha. I'm a 19 y'o man currently
          studying on Universitas Sriwijaya. I live in Palembang, Indonesia. I'm
          a self taught developer that loves to learn new things.
        </p>
      </section>
      <section
        className={tw`flex flex-col w-full bg-dark-nav py-4 px-5 rounded-xl mb-5`}
      >
        <p
          className={tw`text-2xl font-semibold text-dark-text mb-3 font-heading`}
        >
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
          {postProps.slice(0, 4).map((data: Post, key: number) => {
            return (
              <PostCard
                key={key}
                path={"/posts" + data.path}
                title={data.title}
                date={data.date}
                desc={data.desc}
                tag={data.tag}
                timeToRead={timeToRead(data)}
              />
            );
          })}
        </div>
        <p className={tw`p-0 m-0 mt-2 text-center w-full`}>
          <a
            className={tw`bg-dark-accent-quartertrans px-4 py-2 inline-block text-sm text-uppercase text-dark-text rounded-3xl transition-all duration-200 ease-linear hover:bg-dark-accent-semitrans hover:text-dark-accent-solid ring ring-dark-accent-quartertrans hover:ring-dark-accent-solid font-bold w-[fit-content] mt-5`}
            href="/posts"
          >
            More Posts
          </a>
        </p>
      </section>
    </DefaultLayout>
  );
}
