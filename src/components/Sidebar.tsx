/* eslint-disable @typescript-eslint/indent */
import { List, ListMusic, Newspaper } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { type PostFrontMatter } from "src/lib/posts";
import { type LyricFrontMatter } from "src/lib/lyrics";
import { useQuery } from "rakkasjs";
import { useState } from "react";
import SidebarLyricsItem from "./SidebarLyricsItem";

interface PostProps {
  frontMatter: PostFrontMatter;
  content: string;
  slug: string;
}

interface LyricProps {
  frontMatter: LyricFrontMatter;
  content: string;
  slug: string;
}

export default function Sidebar() {
  const query = useQuery("void", async () => {
    const posts = await fetch("/api/posts").then(
      async (res) => await res.json(),
    );
    const lyrics = await fetch("/api/lyrics").then(
      async (res) => await res.json(),
    );

    return {
      posts,
      lyrics,
    };
  });

  const allPosts = query.data.posts.sort((a: any, b: any) => {
    return (
      new Date(b.frontMatter.date).getTime() -
      new Date(a.frontMatter.date).getTime()
    );
  });

  const allLyrics = query.data.lyrics.sort((a: any, b: any) => {
    return (
      new Date(b.frontMatter.date).getTime() -
      new Date(a.frontMatter.date).getTime()
    );
  });

  const [items, setItems] = useState<PostProps[] | LyricProps[]>(allPosts);
  const [active, setActive] = useState<string>("Posts");

  return (
    <nav className="w-[25rem] border-r border-neutral-700 overflow-x-hidden overflow-y-scroll bg-neutral-800 h-screen scrollbar-thin scrollbar-track-neutral-700 scrollbar-thumb-neutral-500">
      <div className="p-3 sticky top-0 bg-neutral-800 z-40 bg-opacity-50 backdrop-blur-md flex justify-between items-center border-b border-neutral-700 w-full">
        <div className="flex items-center gap-3">
          <List size={18} className="text-neutral-200" />
          <h1 className="font-bold text-neutral-200 text-sm font-heading">
            All {active}
          </h1>
        </div>
        <button
          className="outline-none text-neutral-400 hover:text-neutral-200 transition rounded"
          onClick={() => {
            setItems(active === "Posts" ? allLyrics : allPosts);
            setActive(active === "Posts" ? "Lyrics" : "Posts");
          }}
        >
          {active === "Posts"
            ? (
              <ListMusic size={18} />
            )
            : (
              <Newspaper size={18} />
            )}
        </button>
      </div>
      {items.map((x: any, i) => {
        if (active === "Posts") {
          return (
            <SidebarItem
              key={i}
              title={x.frontMatter.title}
              date={x.frontMatter.date}
              description={x.frontMatter.description}
              slug={x.slug}
              tags={x.frontMatter.tags}
            />
          );
        } else {
          return (
            <SidebarLyricsItem
              key={i}
              title={x.frontMatter.title}
              date={x.frontMatter.date}
              artist={x.frontMatter.artist}
              slug={x.slug}
            />
          );
        }
      })}
    </nav>
  );
}
