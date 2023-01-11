import { PostCard } from "../stateless/PostCard";
import { PostCardProps } from "../../types/types";
import { getSortedPostSlugs } from "u/posts";

export function Posts(props: { sliced?: boolean }) {
  const data = getSortedPostSlugs();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
      {props.sliced === true
        ? data
            .slice(0, 4)
            .map((post: PostCardProps) => (
              <PostCard
                key={post.slug}
                title={post.title}
                tag={post.tag}
                slug={post.slug}
                date={post.date}
                desc={post.desc}
              />
            ))
        : data.map((post: PostCardProps) => (
            <PostCard
              key={post.slug}
              title={post.title}
              tag={post.tag}
              slug={post.slug}
              date={post.date}
              desc={post.desc}
            />
          ))}
    </section>
  );
}
