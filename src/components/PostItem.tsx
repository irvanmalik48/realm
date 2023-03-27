import { ArrowRight } from "lucide-solid";

export interface SidebarItemProps {
  title: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
}

export default function PostItem(props: SidebarItemProps) {
  return (
    <a
      href={`/posts/${props.slug}`}
      class="group w-full block relative text-neutral-200 p-3 bg-neutral-800 border rounded border-neutral-700 bg-opacity-50 not-prose no-underline transition"
    >
      <h2 class="font-bold truncate font-heading">{props.title}</h2>
      <p class="text-xs text-opacity-70">
        {new Date(props.date).toLocaleDateString()}
      </p>
      <p class="text-sm pt-2 truncate">{props.description}</p>
      <div class="flex gap-2 items-center flex-wrap pt-3">
        {props.tags.map((tag) => (
          <p
            class="bg-neutral-800 border rounded border-neutral-700 px-2 py-1 text-xs"
          >
            {tag}
          </p>
        ))}
      </div>
      <div class="group-hover:opacity-100 flex items-center flex-col opacity-0 z-[2] transition absolute top-1/2 -translate-y-1/2 right-8">
        <div class="p-2 rounded-full w-fit bg-neutral-800 text-neutral-200 hover:bg-red-400 hover:bg-opacity-50 transition bg-opacity-50 backdrop-blur-sm border border-neutral-700">
          <ArrowRight size={20} />
        </div>
        <p class="text-xs">Read more</p>
      </div>
      <div class="group-hover:opacity-100 opacity-0 transition w-full z-[1] h-full absolute top-0 right-0 bg-gradient-to-l from-neutral-800 to-transparent" />
    </a>
  );
}
