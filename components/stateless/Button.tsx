import Link from "next/link";

export function AnchorButton(props: any) {
  return (
    <a
      {...props}
      className={
        "bg-gray-800 hover:bg-red-400 hover:text-gray-800 before:transition transition justify-center items-center leading-none p-0 m-0 text-gray-200 font-bold py-2 px-4 rounded-lg hover:before:bg-red-400 hover:before:bg-opacity-40 stack before:absolute before:inset-0 before:bg-gray-700 flex gap-2 border-2 border-red-400 font-mono uppercase text-sm " +
        props.className
      }
    >
      {props.children}
    </a>
  );
}

export function NextLinkButton(props: any) {
  return (
    <Link
      {...props}
      className={
        "bg-gray-800 hover:bg-red-400 hover:text-gray-800 before:transition transition justify-center items-center leading-none p-0 m-0 text-gray-200 font-bold py-2 px-4 rounded-lg hover:before:bg-red-400 hover:before:bg-opacity-40 stack before:absolute before:inset-0 before:bg-gray-700 flex gap-2 border-2 border-red-400 font-mono uppercase text-sm " +
        props.className
      }
    >
      {props.children}
    </Link>
  );
}

export function Button(props: any) {
  return (
    <button
      {...props}
      className={
        "bg-gray-800 hover:bg-red-400 hover:text-gray-800 before:transition transition justify-center items-center leading-none p-0 m-0 text-gray-200 font-bold py-2 px-4 rounded-lg hover:before:bg-red-400 hover:before:bg-opacity-40 stack before:absolute before:inset-0 before:bg-gray-700 flex gap-2 border-2 border-red-400 font-mono uppercase text-sm " +
        props.className
      }
    >
      {props.children}
    </button>
  );
}
