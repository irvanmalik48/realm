import { PostCardProps } from "@/lib/types/posts";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";
import { ViewTransition } from "react";

const MotionLink = motion.create(Link);

type MotionPostCardProps = PostCardProps & HTMLMotionProps<"a">;

export function PostCard(props: MotionPostCardProps) {
  const {
    title,
    createdAt,
    updatedAt,
    description,
    tags,
    readingTime,
    className,
    ...motionProps
  } = props;

  return (
    <MotionLink
      href={`/blog/${props.slug}`}
      transitionTypes={["nav-forward"]}
      className={`flex flex-col w-full bg-secondary/20 rounded-md border border-border ${className}`}
      {...motionProps}
    >
      <div className="w-full flex flex-col px-5 pt-3 gap-1">
        <ViewTransition name={`post-title-${props.slug}`} share="text-morph" default="none">
          <h3 className="w-full font-semibold">{title}</h3>
        </ViewTransition>
        <p className="text-sm text-muted-foreground">
          {createdAt === updatedAt && (
            <span>
              Published on {new Date(createdAt).toLocaleDateString()} &bull;{" "}
              Reading time: {readingTime}
            </span>
          )}
          {createdAt !== updatedAt && (
            <span>
              Published on {new Date(createdAt).toLocaleDateString()} &bull;{" "}
              Last updated on {new Date(updatedAt).toLocaleDateString()} &bull;{" "}
              Reading time: {readingTime}
            </span>
          )}
        </p>
      </div>
      <p className="w-full px-5 py-3 text-sm line-clamp-2 overflow-hidden">{description}</p>
      <div className="w-full px-5 pb-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-primary text-primary-foreground px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </MotionLink>
  );
}
