import Link from "next/link";
import Image from "next/image";

export default function PostCard(props: any) {
  return (
    <Link
      className="block relative stack bg-gray-800 text-gray-200 rounded-lg border-2 border-red-400 before:absolute before:inset-0 before:bg-gray-700 before:transition hover:before:bg-red-400 hover:before:bg-opacity-40"
      href={props.meta.slug}
    >
      <Image
        className="w-full h-48 object-cover rounded-t-lg"
        width={720}
        height={720}
        src={props.meta.screenshot}
        alt={props.meta.title}
      />
      <div className="px-5 py-3">
        <p className="text-lg font-bold font-helvetica truncate">
          {props.meta.title}
        </p>
        <p className="text-sm truncate">{props.meta.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {props.meta.tag.map((tag: any, index: any) => (
              <p key={index} className="text-sm text-red-400 text-opacity-70">
                #{tag}
              </p>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-300">{props.meta.desc}</p>
      </div>
    </Link>
  );
}
