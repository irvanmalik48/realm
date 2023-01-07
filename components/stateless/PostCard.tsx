import Link from "next/link";
import React from "react";
import { PostCardProps } from "t/types";

export function PostCard(props: PostCardProps) {
  const title = props.title ?? "Untitled";
  const tags = props.tag ?? ["No tags"];
  const body = props.desc ?? "No description.";
  const date = props.date ?? "01/01/1970";
  const slug = props.slug ?? "#";

  return (
    <Link
      href={`/posts/${slug}`}
      className="flex flex-col gap-2 p-5 rounded-xl border-2 border-neutral-800 hover:bg-neutral-800 transition"
    >
      <h3 className="text-lg font-heading font-semibold text-white truncate">
        {title}
      </h3>
      <div className="flex flex-row justify-start items-center gap-3 flex-wrap">
        {tags.map((tag, index) => (
          <p
            key={index}
            className="uppercase bg-teal-300 bg-opacity-40 px-2.5 rounded-full py-0.5 text-white text-xs font-heading font-semibold"
          >
            {tag}
          </p>
        ))}
      </div>
      <p className="text-white text-opacity-50 truncate">{body}</p>
      <div className="flex flex-row justify-between items-center mt-auto">
        <p className="text-white text-opacity-50">{date}</p>
        <Link
          href={`/posts/${slug}`}
          className="text-white text-opacity-50 hover:text-opacity-100 transition ease-out"
        >
          Read more
        </Link>
      </div>
    </Link>
  );
}
