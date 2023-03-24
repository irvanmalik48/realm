import {
  Ticket,
  Newspaper,
  ListMusic,
  GitBranch,
  Send,
  Instagram,
  AlignJustify,
} from "lucide-react";
import { Head, useQuery } from "rakkasjs";
import LyricsItem from "src/components/LyricsItem";
import PostItem from "src/components/PostItem";

export default function HomePage() {
  const query = useQuery("void", async () => {
    const getPosts = await fetch("/api/posts").then(
      async (res) => await res.json(),
    );
    const getLyrics = await fetch("/api/lyrics").then(
      async (res) => await res.json(),
    );

    return {
      posts: getPosts,
      lyrics: getLyrics,
    };
  });

  const allPosts = query.data.posts
    .sort((a: any, b: any) => {
      return (
        new Date(b.frontMatter.date).getTime() -
        new Date(a.frontMatter.date).getTime()
      );
    })
    .slice(0, 4);

  const allLyrics = query.data.lyrics
    .sort((a: any, b: any) => {
      return (
        new Date(b.frontMatter.date).getTime() -
        new Date(a.frontMatter.date).getTime()
      );
    })
    .slice(0, 4);

  return (
    <>
      <Head
        charset="utf-8"
        title="Realm"
        description="Irvan Malik Azantha's Personal Website"
        // Open Graph
        og:title="Realm"
        og:description="Irvan Malik Azantha's Personal Website"
        og:type="website"
        og:url="https://irvanma.eu.org/"
        // Twitter
        twitter:card="summary"
        twitter:site="@irvanmalik48"
        twitter:creator="@irvanmalik48"
        twitter:title="Realm"
        twitter:description="Irvan Malik Azantha's Personal Website"
      />
      <div className="w-full relative">
        <div className="absolute top-0 w-full border-b border-neutral-700">
          <img
            src="/profile/unsplash-bg.webp"
            alt="Unsplash Background by Alex Perez"
            className="h-72 w-full object-cover brightness-50"
          />
        </div>
        <section className="w-full pt-20 pb-5 relative">
          <div className="border border-neutral-700 relative rounded p-4 bg-neutral-800 bg-opacity-20 backdrop-blur-md max-w-3xl mx-auto mt-36 flex flex-col items-center w-full">
            <img
              src="/profile/main.webp"
              alt="Profile Picture"
              className="w-48 h-48 absolute rounded-full -mt-28 border border-neutral-700 ring-4 ring-opacity-20 ring-offset-red-400 ring-offset-2 ring-red-400"
            />
            <div className="w-full mt-28 text-center">
              <p className="text-neutral-200 text-opacity-80">
                Hello, my name is
              </p>
              <h1 className="font-heading text-4xl font-bold text-neutral-200">
                Irvan Malik Azantha
              </h1>
              <p className="text-lg text-neutral-200 text-opacity-80 pb-4">
                Part-time Developer, Full-time Weeb
              </p>
              <div className="grid grid-cols-3 gap-4">
                <a
                  href="https://github.com/irvanmalik48/realm"
                  className="main-page-card-btn"
                >
                  <GitBranch size={20} />
                  Blog Repository
                </a>
                <a
                  href="https://t.me/lappretard"
                  className="main-page-card-btn"
                >
                  <Send size={20} />
                  Telegram Account
                </a>
                <a
                  href="https://github.com/irvanmalik48/realm"
                  className="main-page-card-btn"
                >
                  <Instagram size={20} />
                  Instagram Account
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-5 z-10 relative">
          <div className="max-w-3xl mx-auto px-4 prose prose-invert prose-p:text-neutral-400 prose-headings:text-neutral-200 prose-headings:font-bold prose-headings:font-heading">
            <h2 className="flex items-center justify-start gap-5">
              <div className="flex items-center gap-3">
                <Ticket size={28} />
              </div>
              Introduction
            </h2>
            <p>
              Hello, I'm Irvan Malik Azantha. A result-oriented programmer with
              2 years of experience in creating and maintaining web development
              projects. Highly ambitious and logical. Very interested in open
              source technology and related project developments. Skilled at web
              development and UI/UX designing.
            </p>
            <h2 className="flex items-center justify-start gap-5">
              <div className="flex items-center gap-3">
                <Newspaper size={28} />
              </div>
              Recent Posts
            </h2>
            <p>Here's 4 recent posts I wrote:</p>
            <div className="not-prose grid grid-cols-2 gap-4">
              {allPosts.map((post: any, i: number) => (
                <PostItem key={i} slug={post.slug} {...post.frontMatter} />
              ))}
            </div>
            <h2 className="flex items-center justify-start gap-5">
              <div className="flex items-center gap-3">
                <ListMusic size={28} />
              </div>
              Recent Lyrics
            </h2>
            <p>Here's 4 recent lyrics I stashed:</p>
            <div className="not-prose grid grid-cols-2 gap-4">
              {allLyrics.map((lyric: any, i: number) => (
                <LyricsItem key={i} slug={lyric.slug} {...lyric.frontMatter} />
              ))}
            </div>
            <h2 className="flex items-center justify-start gap-5">
              <div className="flex items-center gap-3">
                <AlignJustify size={28} />
              </div>
              Acknowledgements
            </h2>
            <ul>
              <li>
                This blog is built using{" "}
                <a
                  href="https://rakkasjs.org"
                  className="text-red-400 hover:text-neutral-200 transition"
                >
                  Rakkas.js
                </a>
                , a bleeding-edge full-stack React framework powered by Vite.
              </li>
              <li>
                The styling is provided by{" "}
                <a
                  href="https://tailwindcss.com"
                  className="text-red-400 hover:text-neutral-200 transition"
                >
                  Tailwind CSS
                </a>
                , a utility-first CSS framework.
              </li>
              <li>
                The icons are provided by{" "}
                <a
                  href="https://lucide.dev"
                  className="text-red-400 hover:text-neutral-200 transition"
                >
                  Lucide
                </a>
                , an open-source project and a fork of Feather Icons.
              </li>
              <li>
                The top background image is provided by{" "}
                <a
                  href="https://unsplash.com/@a2eorigins"
                  className="text-red-400 hover:text-neutral-200 transition"
                >
                  Alex Perez
                </a>{" "}
                on Unsplash.
              </li>
              <li>The blog as a project is licensed under MIT License.</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
