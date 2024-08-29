import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { PostMatter } from "@/types/api/posts";

export const postsAtom = atom<PostMatter[]>([]);
export const processedPostsAtom = atom<PostMatter[]>([]);
export const searchAtom = atom<string>("");
export const sortByAtom = atom<string>("");

export const useListPostsProps = (
  initialSearch: string,
  initialSortBy: string
) => {
  const [search, setSearch] = useAtom(searchAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);

  useEffect(() => {
    setSearch(initialSearch);
    setSortBy(initialSortBy);
  }, []);

  return {
    search,
    setSearch,
    sortBy,
    setSortBy,
  };
};

export const usePosts = () => {
  const [posts, setPosts] = useAtom(postsAtom);

  useEffect(() => {
    fetch("/api/posts/get")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return posts;
};

export const useProcessedPosts = (
  initialPosts: PostMatter[],
  sortBy: string,
  search: string
) => {
  const [posts, setPosts] = useAtom(processedPostsAtom);

  useEffect(() => {
    let processedPosts = initialPosts;

    if (search) {
      processedPosts = processedPosts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sortBy) {
      case "asc":
        processedPosts = processedPosts.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "desc":
        processedPosts = processedPosts.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      case "date-asc":
        processedPosts = processedPosts.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "date-desc":
        processedPosts = processedPosts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
    }

    setPosts(processedPosts);
  }, [initialPosts, sortBy, search]);

  return posts;
};
