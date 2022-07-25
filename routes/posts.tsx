// deno-lint-ignore-file no-explicit-any
/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import DefaultLayout from "../components/DefaultLayout.tsx";
import { loadContent } from "../utils/load.ts";
import PostCard from "../components/PostCard.tsx";

const posts = await loadContent("posts/");

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
  const postProps: any[] = [];

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
        className={tw`py-24 w-full flex flex-col md:flex-row justify-center items-center gap-5`}
      >
        <div className={tw`flex flex-col justify-center items-center`}>
          <p className={tw`text-dark-text font-bold text-3xl`}>Blog Posts</p>
          <p className={tw`w-full text-dark-accent-solid text-lg`}>
            All that I have written currently.
          </p>
        </div>
      </header>
      <section
        className={tw`flex flex-col w-full bg-dark-nav py-4 px-5 rounded-xl mb-5`}
      >
        <p
          className={tw`text-2xl rounded-xl font-bold text-dark-text mt-1 px-4 py-2 bg-dark-accent-semitrans text-center`}
        >
          All Posts
        </p>
        <div
          className={tw`grid grid-cols-1 xl:grid-cols-2 mt-5 gap-5 items-between`}
        >
          {postProps.map((data: any, key: any) => {
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
      </section>
    </DefaultLayout>
  );
}
