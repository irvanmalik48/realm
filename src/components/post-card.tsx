import { PostCardProps } from "@/lib/types/posts";
import { Link } from "next-view-transitions";

export function PostCard(props: PostCardProps) {
  const {
    title,
    createdAt,
    updatedAt,
    description,
    tags,
    readingTime,
    className,
  } = props;

  return (
    <Link
      href={`/blog/${props.slug}`}
      className={`w-full bg-secondary/20 rounded-md border border-border ${className}`}
    >
      <div className="w-full flex flex-col px-5 pt-3 gap-1">
        <h3 className="w-full font-semibold">{title}</h3>
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
      <p className="w-full px-5 py-3 text-sm line-clamp-2">{description}</p>
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
    </Link>
  );
}
