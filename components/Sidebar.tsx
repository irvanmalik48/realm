import { Post } from "@/types.d.tsx";
import PostCard from "@components/PostCard.tsx";
import { apply, css, tw } from "@utils/twind.ts";
import { loadContent, timeToRead } from "@utils/load.ts";

const posts = await loadContent("posts/");

export default function Sidebar() {
  const postProps: Post[] = [];

  for (const [_key, post] of posts.entries()) {
    postProps.push(post);
  }

  postProps.sort((a, b) => {
    return a.date && b.date && a.date < b.date ? 1 : -1;
  });

  return (
    <aside
      className={tw`shadow-xl sticky hidden top-0 z-0 h-screen md:w-[22rem] lg:w-[25rem] xl:w-[28rem] items-center justify-start overflow-y-auto bg-light-side dark:bg-dark-side lg:flex lg:flex-col gap-5 pb-4 pt-0 text-light-text dark:text-dark-text ${
        css(
          {
            "&::-webkit-scrollbar": apply`hidden`,
          },
        )
      } md:${
        css({
          "&::-webkit-scrollbar":
            apply`block bg-light-accent-quartertrans dark:bg-dark-accent-quartertrans w-5`,
          "&::-webkit-scrollbar-thumb":
            apply`bg-light-accent-solid dark:bg-dark-accent-solid border-transparent border-[7px] border-solid bg-clip-content rounded-xl`,
        })
      }`}
    >
      <div
        className={tw`flex flex-row w-full gap-4 sticky top-0 pt-4 bg-gradient-to-b from-light-side dark:from-dark-side via-light-side dark:via-dark-side to-transparent px-4`}
      >
        <div
          className={tw`w-full px-5 py-3 font-bold font-mono bg-light-accent-quartertrans dark:bg-dark-accent-quartertrans rounded-xl text-sm uppercase ${
            css(
              {
                "-webkit-backdrop-filter": "blur(.5rem)",
                "backdrop-filter": "blur(.5rem)",
              },
            )
          }`}
        >
          <p>All Posts</p>
        </div>
      </div>
      <div className={tw`mx-4 flex flex-col justify-center items-center gap-5`}>
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
    </aside>
  );
}
