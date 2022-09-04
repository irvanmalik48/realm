import { Post } from "@/types.d.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import PostCard from "@components/PostCard.tsx";
import { loadContent, timeToRead } from "@utils/load.ts";
import { css, tw } from "@utils/twind.ts";

const posts = await loadContent("posts/");

export default function Posts() {
  const postProps: Post[] = [];

  for (const [_key, post] of posts.entries()) {
    postProps.push(post);
  }

  postProps.sort((a, b) => {
    return a.date && b.date && a.date < b.date ? 1 : -1;
  });

  return (
    <DefaultLayout
      title="Blog Posts"
      desc="All that I have written currently."
      active="posts"
    >
      <header
        className={tw`py-24 w-full flex flex-col md:flex-row justify-center items-center gap-5`}
      >
        <div className={tw`flex flex-col justify-center items-center`}>
          <p className={tw`text-dark-text font-bold text-3xl font-heading`}>
            Blog Posts
          </p>
          <p className={tw`w-full text-dark-accent-solid text-lg`}>
            All that I have written currently.
          </p>
        </div>
      </header>
      <section
        className={tw`flex flex-col w-full bg-dark-navglass py-4 px-5 rounded-xl mb-5 ${
          css(
            {
              "backdrop-filter": "blur(.5rem)",
            },
          )
        }`}
      >
        <p
          className={tw`text-2xl rounded-xl font-bold text-dark-text mt-1 px-4 py-2 bg-dark-accent-semitrans text-center font-heading`}
        >
          All Posts
        </p>
        <div
          className={tw`grid grid-cols-1 xl:grid-cols-2 mt-5 gap-5 items-between`}
        >
          {postProps.map((data: Post, key: number) => {
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
      </section>
    </DefaultLayout>
  );
}
