import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar(props: any) {
  const router = useRouter();
  const [matchUrl, setMatchUrl] = useState(router.asPath);

  useEffect(() => {
    setMatchUrl(router.asPath);
  }, [router.asPath]);

  return (
    <nav className="fixed bottom-4 left-4 lg:bottom-1/2 lg:translate-y-1/2 xl:left-8 z-50">
      <div className="stack hover:before:bg-red-400 hover:before:bg-opacity-40 before:transition rounded-md relative p-2 bg-gray-800 border-2 border-red-400 before:absolute before:inset-0 before:bg-gray-700">
        <div className="flex items-center justify-center lg:flex-col gap-2">
          <Link
            className={
              "leading-none hover:bg-red-400 flex items-center hover:bg-opacity-80 transition ease-out bg-gray-700 p-3 rounded group " +
              (matchUrl === "/" ? "bg-red-400 bg-opacity-80" : "")
            }
            href={"/"}
          >
            <span className="material-symbols-sharp">home</span>
            <span className="hidden md:block absolute origin-left scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-x-20 transition font-bold px-4 py-2 bg-red-400 bg-opacity-20 text-sm rounded-lg">
              Home
            </span>
          </Link>
          <Link
            className={
              "leading-none hover:bg-red-400 flex items-center hover:bg-opacity-80 transition ease-out bg-gray-700 p-3 rounded group " +
              (matchUrl === "/posts" ? "bg-red-400 bg-opacity-80" : "")
            }
            href={"/posts"}
          >
            <span className="material-symbols-sharp">pages</span>
            <span className="hidden md:block absolute origin-left scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-x-20 transition font-bold px-4 py-2 bg-red-400 bg-opacity-20 text-sm rounded-lg">
              Blog
            </span>
          </Link>
          <Link
            className={
              "leading-none hover:bg-red-400 flex items-center hover:bg-opacity-80 transition ease-out bg-gray-700 p-3 rounded group " +
              (matchUrl === "/projects" ? "bg-red-400 bg-opacity-80" : "")
            }
            href={"/projects"}
          >
            <span className="material-symbols-sharp">work</span>
            <span className="hidden md:block absolute origin-left scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-x-20 transition font-bold px-4 py-2 bg-red-400 bg-opacity-20 text-sm rounded-lg">
              Projects
            </span>
          </Link>
          <Link
            className={
              "leading-none hover:bg-red-400 flex items-center hover:bg-opacity-80 transition ease-out bg-gray-700 p-3 rounded group " +
              (matchUrl === "/about" ? "bg-red-400 bg-opacity-80" : "")
            }
            href={"/about"}
          >
            <span className="material-symbols-sharp">info</span>
            <span className="hidden md:block absolute origin-left scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-x-20 transition font-bold px-4 py-2 bg-red-400 bg-opacity-20 text-sm rounded-lg">
              About
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
