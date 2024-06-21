import { useAutoAnimate } from "@formkit/auto-animate/react";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

import Link from "@/components/custom/link-wrapper";
import DefaultLayout from "@/components/layout/default";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SHORTS_PATH, shortFilePaths } from "@/content/const";
import { useFuzzy } from "@/hooks/fuzzy";
import { useThrottle } from "@/hooks/throttle";
import { cn } from "@/lib/utils";
import { Short, ShortMatter } from "@/types/shorts";

export default function Posts({ shorts }: { shorts: ShortMatter[] }) {
  const sortedShorts = shorts
    .sort((a, b) => {
      return (
        new Date(b.data.updatedAt).getTime() -
        new Date(a.data.updatedAt).getTime()
      );
    })
    .map((a) => a.data);
  const [parent] = useAutoAnimate();
  const { result, keyword, search } = useFuzzy<Short>(sortedShorts, {
    keys: ["title"],
  });

  const throttledValue = useThrottle<Short[]>(result);

  return (
    <DefaultLayout title="Shorts" description="Some thoughts, unfiltered.">
      <div className="w-full min-h-screen flex flex-col py-24">
        <section className={cn("w-full max-w-3xl relative p-5", "mx-auto")}>
          <h1 className="text-2xl py-3 w-full text-center font-bold dark:font-semibold">
            Shorts
          </h1>
          <div className="w-full flex flex-col gap-5 mt-5">
            <div className="w-full">
              <Input
                id="shortSearch"
                className="w-full placeholder:italic"
                placeholder="Search here..."
                type="text"
                value={keyword}
                onChange={(e) => {
                  search(e.target.value);
                }}
              />
            </div>
            <div ref={parent} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sortedShorts
                .filter((a) => {
                  return JSON.stringify(throttledValue).includes(a.slug);
                })
                .map((post) => (
                  <Link
                    key={post.slug}
                    href={`/shorts/${post.slug}`}
                    style={{
                      width: "100%",
                    }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex justify-between flex-row-reverse flex-wrap gap-5">
                        <div className="flex flex-row gap-3">
                          <Badge>{post.updatedAt}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              {sortedShorts.length === 0 && (
                <div key="no-short-found" className="w-full text-center">
                  <p className="text-muted-foreground">No shorts found.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}

export function getStaticProps() {
  const shorts = shortFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(SHORTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data: {
        slug: filePath.replace(/\.mdx?$/, ""),
        ...data,
      } as Short,
      filePath,
    };
  });

  return { props: { shorts } };
}
