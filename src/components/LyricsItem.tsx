import { ArrowRight } from "lucide-react";

interface LyricsItemProps {
  title: string;
  date: string;
  artist: string;
  slug: string;
}

export default function LyricsItem(props: LyricsItemProps) {
  return (
    <a
      href={`/lyrics/${props.slug}`}
      className="group w-full block relative text-neutral-200 p-3 bg-neutral-800 border rounded border-neutral-700 bg-opacity-50 not-prose no-underline transition"
    >
      <h2 className="font-bold truncate font-heading">{props.title}</h2>
      <p className="text-sm truncate">
        <span className="text-neutral-400">Artist:</span> {props.artist}
      </p>
      <p className="text-xs text-opacity-70">
        {new Date(props.date).toLocaleDateString()}
      </p>
      <div className="group-hover:opacity-100 flex items-center flex-col opacity-0 z-[2] transition absolute top-1/2 -translate-y-1/2 right-8">
        <div className="p-2 rounded-full w-fit bg-neutral-800 text-neutral-200 hover:bg-red-400 hover:bg-opacity-50 transition bg-opacity-50 backdrop-blur-sm border border-neutral-700">
          <ArrowRight size={20} />
        </div>
        <p className="text-xs">Read more</p>
      </div>
      <div className="group-hover:opacity-100 opacity-0 transition w-full z-[1] h-full absolute top-0 right-0 bg-gradient-to-l from-neutral-800 to-transparent" />
    </a>
  );
}
