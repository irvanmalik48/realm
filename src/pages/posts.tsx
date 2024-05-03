import { useAutoAnimate } from "@formkit/auto-animate/react";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

import Link from "@/components/custom/link-wrapper";
import DefaultLayout from "@/components/layout/default";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { POSTS_PATH, postFilePaths } from "@/content/const";
import { useFuzzy } from "@/hooks/fuzzy";
import { useThrottle } from "@/hooks/throttle";
import { cn } from "@/lib/utils";

export type Post = {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export interface PostMatter {
  content: string;
  data: Post;
  filePath: string;
}

export default function Posts({ posts }: { posts: PostMatter[] }) {
  const sortedPosts = posts
    .sort((a, b) => {
      return (
        new Date(b.data.updatedAt).getTime() -
        new Date(a.data.updatedAt).getTime()
      );
    })
    .map((a) => a.data);
  const [parent] = useAutoAnimate();
  const { result, keyword, search } = useFuzzy<Post>(sortedPosts, {
    keys: ["title", "description"],
  });

  const throttledValue = useThrottle<Post[]>(result);

  return (
    <DefaultLayout title="Posts" description="Everything I've written.">
      <div className="w-full min-h-screen flex flex-col py-24">
        <section className={cn("w-full max-w-3xl relative p-5", "mx-auto")}>
          <h1 className="text-2xl py-3 w-full text-center font-bold dark:font-semibold">
            Posts
          </h1>
          <div className="w-full flex flex-col gap-5 mt-5">
            <div className="w-full">
              <Input
                id="postSearch"
                className="w-full placeholder:italic"
                placeholder="Search here..."
                type="text"
                value={keyword}
                onChange={(e) => {
                  search(e.target.value);
                }}
              />
            </div>
            <div ref={parent} className="flex flex-col gap-5">
              {sortedPosts
                .filter((a) => {
                  return JSON.stringify(throttledValue).includes(a.slug);
                })
                .map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    style={{
                      width: "100%",
                    }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>{post.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex justify-between flex-row-reverse flex-wrap gap-5">
                        <div className="flex flex-row gap-3">
                          {post.tags &&
                            post.tags.map((tag) => (
                              <Badge variant={"secondary"} key={tag}>
                                {tag}
                              </Badge>
                            ))}
                        </div>
                        <div className="flex flex-row gap-3">
                          <Badge>{post.updatedAt}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data: {
        slug: filePath.replace(/\.mdx?$/, ""),
        ...data,
      } as Post,
      filePath,
    };
  });

  return { props: { posts } };
}
