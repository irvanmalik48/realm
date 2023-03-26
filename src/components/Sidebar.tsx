import { List, ListMusic, Newspaper } from "lucide-react";
import SidebarItem from "./SidebarItem";
import type { PostFrontMatter } from "../lib/posts";
import type { LyricFrontMatter } from "../lib/lyrics";
import { useEffect, useState } from "react";
import SidebarLyricsItem from "./SidebarLyricsItem";
import useSwr from "swr";

export interface PostProps {
  frontMatter: PostFrontMatter;
  content: string;
  slug: string;
}

export interface LyricProps {
  frontMatter: LyricFrontMatter;
  content: string;
  slug: string;
}

async function fetcher(url: string) {
  const res = await fetch(url);
  return await res.json();
}

export default function Sidebar(props: any) {
  const [active, setActive] = useState<string>("Posts");

  const postData = useSwr("/api/posts", fetcher);
  const lyricsData = useSwr("/api/lyrics", fetcher);

  useEffect(() => {
    if (postData.data && active === "Posts") {
      setItems(postData.data);
    } else if (lyricsData.data && active === "Lyrics") {
      setItems(lyricsData.data);
    }
  }, [postData.data, lyricsData.data, active]);

  const [items, setItems] = useState<PostProps[] | LyricProps[]>(
    postData.data ?? []
  );

  return (
    <nav
      id={props.id}
      className="scroll-smooth w-[25rem] border-r border-neutral-700 overflow-x-hidden overflow-y-scroll bg-neutral-800 h-screen scrollbar-thin scrollbar-track-neutral-700 scrollbar-thumb-neutral-500"
    >
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
            setItems(
              active === "Posts" ? lyricsData.data ?? [] : postData.data ?? []
            );
            setActive(active === "Posts" ? "Lyrics" : "Posts");
          }}
        >
          {active === "Posts" ? (
            <ListMusic size={18} />
          ) : (
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
