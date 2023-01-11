import Image from "next/image";
import Link from "next/link";

import { ProjectCardProps } from "t/types";

export function ProjectCard(props: ProjectCardProps) {
  const title = props.title ?? "Untitled";
  const tags = props.tag ?? ["No tags"];
  const body = props.desc ?? "No description.";
  const slug = props.slug ?? "#";
  const gh = props.gh === "private" ? "Private" : "Public";
  const link = props.link === "none" ? "" : "Visit Project";
  const linkHref = props.link !== "none" ? props.link : "#";
  const img = props.screenshot ?? "/showcase/no-image.webp";

  return (
    <Link
      href={`/projects/${slug}`}
      className="flex flex-col overflow-hidden rounded-xl border-2 border-neutral-800 group hover:bg-neutral-800 transition"
    >
      <Image
        src={img}
        width={1280}
        height={700}
        className="h-[200px] object-cover grayscale group-hover:grayscale-0 transition"
        alt={title}
      />
      <div className="flex flex-col gap-2 p-5">
        <h3 className="text-lg font-heading font-semibold text-white truncate">
          {title}
        </h3>
        <div className="flex flex-row justify-start items-center gap-3">
          {tags.slice(0, 2).map((tag, index) => (
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
          <p className="text-white text-opacity-50">{gh}</p>
          <a
            href={linkHref}
            className="text-white text-opacity-50 hover:text-opacity-100 transition ease-out"
          >
            {link}
          </a>
        </div>
      </div>
    </Link>
  );
}
