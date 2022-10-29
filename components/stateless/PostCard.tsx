import Link from "next/link";

export default function PostCard(props: any) {
  return (
    <Link
      className="block relative stack px-5 py-3 bg-gray-800 text-gray-200 rounded-lg border-2 border-red-400 before:absolute before:inset-0 before:bg-gray-700 before:transition hover:before:bg-red-400 hover:before:bg-opacity-40"
      href={props.meta.slug}
    >
      <p className="text-lg font-bold font-helvetica truncate">
        {props.meta.title}
      </p>
      <p className="text-sm truncate">{props.meta.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">{props.meta.date}</p>
        <div className="flex gap-2">
          {props.meta.tag.map((tag: any, index: any) => (
            <p key={index} className="text-sm text-red-400 text-opacity-70">
              #{tag}
            </p>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-300">{props.meta.desc}</p>
    </Link>
  );
}
