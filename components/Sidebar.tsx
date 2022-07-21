// deno-lint-ignore-file no-explicit-any
/** @jsx h */
import { h } from "preact";
import { apply, tw } from "@twind";
import { css } from "twind/css";
import { loadContent } from "../utils/load.ts";
import PostCard from "./PostCard.tsx";
import { SearchIcon } from "./Icons.tsx";

const posts = await loadContent("posts/");

export default function Sidebar() {
  const postProps: any[] = [];

  for (const [_key, post] of posts.entries()) {
    postProps.push(post);
  }

  postProps.sort((a: any, b: any) => {
    return a["date"] < b["date"] ? 1 : -1;
  });

  return (
    <aside
      className={tw`sticky hidden top-0 z-0 h-screen md:w-[22rem] lg:w-[25rem] xl:w-[28rem] items-center justify-start overflow-y-auto bg-dark-side md:flex md:flex-col gap-5 pb-4 pt-0 text-dark-text ${css(
        {
          "&::-webkit-scrollbar": apply`bg-dark-accent-quartertrans w-5`,
          "&::-webkit-scrollbar-thumb": apply`bg-dark-accent-solid border-transparent border-[7px] border-solid bg-clip-content rounded-xl`,
        }
      )}`}
    >
      <div
        className={tw`flex flex-row w-full gap-4 sticky top-0 pt-4 bg-gradient-to-b from-dark-side via-dark-side to-transparent px-4`}
      >
        <div
          className={tw`w-full px-5 py-3 font-semibold bg-dark-bg rounded-xl text-sm uppercase shadow-xl`}
        >
          <p>All Posts</p>
        </div>
        <button
          className={tw`flex flex-row items-center w-[fit-content] bg-dark-nav rounded-xl hover:rounded-3xl transition-all duration-200 ease-linear group shadow-xl`}
        >
          <div
            className={tw`w-[fit-content] bg-dark-accent-semitrans p-3 rounded-xl text-dark-accent-solid hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-200 ease-linear`}
          >
            <SearchIcon />
          </div>
          <span
            className={tw`fixed group-hover:scale-100 bg-dark-nav absolute left-[34rem] z-0 font-semibold m-2 w-auto min-w-max origin-left scale-0 rounded-3xl uppercase px-6 py-2 text-sm text-dark-text transition-all duration-100`}
          >
            Search Post
          </span>
        </button>
      </div>
      <div className={tw`mx-4 flex flex-col justify-center items-center gap-5`}>
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
    </aside>
  );
}
