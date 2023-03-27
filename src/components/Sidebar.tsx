import { List, ListMusic, Newspaper } from "lucide-solid";
import SidebarItem from "./SidebarItem";
import type { PostFrontMatter } from "../lib/posts";
import type { LyricFrontMatter } from "../lib/lyrics";
import { createEffect, createResource, createSignal } from "solid-js";
import SidebarLyricsItem from "./SidebarLyricsItem";

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
  const res = await fetch(`${process.env.BASE_URL || "http://localhost:3000"}${url}`);
  return await res.json();
}

export default function Sidebar(props: any) {
  const [active, setActive] = createSignal<string>("Posts");
  const [items, setItems] = createSignal<PostProps[] | LyricProps[]>([]);

  const [postData, { refetch }] = createResource("/api/posts", fetcher);
  const [lyricsData] = createResource("/api/lyrics", fetcher);

  createEffect(() => {
    refetch();
    if (postData && active() === "Posts") {
      setItems(postData);
    } else if (lyricsData && active() === "Lyrics") {
      setItems(lyricsData);
    }
  });

  return (
    <nav
      id={props.id}
      class="hidden lg:block scroll-smooth w-[20rem] xl:w-[25rem] border-r border-neutral-700 overflow-x-hidden overflow-y-scroll bg-neutral-800 h-screen scrollbar-thin scrollbar-track-neutral-700 scrollbar-thumb-neutral-500"
    >
      <div class="p-3 sticky top-0 bg-neutral-800 z-40 bg-opacity-50 backdrop-blur-md flex justify-between items-center border-b border-neutral-700 w-full">
        <div class="flex items-center gap-3">
          <List size={18} class="text-neutral-200" />
          <h1 class="font-bold text-neutral-200 text-sm font-heading">
            All {active}
          </h1>
        </div>
        <button
          class="outline-none text-neutral-400 hover:text-neutral-200 transition rounded"
          aria-label="Toggle Posts/Lyrics"
          id="toggle-posts-lyrics"
          onClick={() => {
            setItems(
              active() === "Posts" ? lyricsData ?? [] : postData ?? []
            );
            setActive(active() === "Posts" ? "Lyrics" : "Posts");
          }}
        >
          {active() === "Posts" ? (
            <ListMusic size={18} />
          ) : (
            <Newspaper size={18} />
          )}
        </button>
      </div>
      {items().map((x: any) => {
        if (active() === "Posts") {
          return (
            <SidebarItem
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
