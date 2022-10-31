import Link from "next/link";
import { MutableRefObject, useCallback, useRef, useState } from "react";

export default function PostsSearchBar(props: any) {
  const searchRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [bgActive, setBgActive] = useState(false);
  const [active, setActive] = useState(false);

  const searchEndpoint = (q: string) => `/api/posts?q=${q}`;
  const onChange = useCallback((e: any) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      fetch(searchEndpoint(e.target.value))
        .then((res) => res.json())
        .then((data) => {
          setSearchResult(data);
          setActive(true);
        });
    } else {
      setActive(false);
    }
  }, []);

  const onClick = useCallback((e: any) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setActive(false);
      setBgActive(false);
      setSearchQuery("");
      setSearchResult([]);
      window.removeEventListener("click", onClick);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    setBgActive(true);
    window.addEventListener("click", onClick);
  }, [onClick]);

  return (
    <>
      <div
        className="fixed z-30 transition inset-0 w-full h-full bg-gray-900 bg-opacity-80 backdrop-blur-md"
        onClick={onClick}
        style={{
          opacity: bgActive ? "1" : "0",
          pointerEvents: bgActive ? "all" : "none",
        }}
      ></div>
      <div className="relative w-full z-30">
        <input
          ref={searchRef}
          className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg border-2 transition focus:ring-4 focus:ring-red-400 focus:ring-opacity-30 border-red-400 focus:outline-none focus:border-red-400"
          type="text"
          placeholder="Search posts"
          value={searchQuery}
          onChange={onChange}
          onFocus={onFocus}
        />
        <div
          className="absolute top-full left-0 w-full mt-5 transition"
          style={{
            opacity:
              active && searchQuery !== "" && searchResult.length > 0
                ? "1"
                : "0",
            pointerEvents:
              active && searchQuery !== "" && searchResult.length > 0
                ? "all"
                : "none",
          }}
        >
          <div className="bg-gray-800 rounded-lg border-2 border-red-400 divide-y-2 divide-red-400">
            {searchResult.map((post: any, index: any) => (
              <Link
                key={index}
                href={post.slug}
                className="block transition px-5 py-3 text-gray-200 hover:bg-red-400 hover:bg-opacity-20"
              >
                <p className="text-lg font-bold font-helvetica truncate">
                  {post.title}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400">{post.date}</p>
                  <div className="flex gap-2">
                    {post.tag.map((tag: any, index: any) => (
                      <p
                        key={index}
                        className="text-sm text-red-400 text-opacity-70"
                      >
                        #{tag}
                      </p>
                    ))}
                  </div>
                </div>
                <p className="text-sm truncate text-gray-300">{post.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
