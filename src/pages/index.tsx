import {
  CrumpledPaperIcon,
  InfoCircledIcon,
  Link2Icon,
  MixIcon,
} from "@radix-ui/react-icons";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

import Link from "@/components/custom/link-wrapper";
import MineServerStatus from "@/components/custom/mc-server-status";
import DefaultLayout from "@/components/layout/default";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { POSTS_PATH, postFilePaths } from "@/content/const";
import { Button } from "@/components/ui/button";
import { Post, PostMatter } from "@/types/posts";

export default function Home({ posts }: { posts: PostMatter[] }) {
  const lastTwoPosts = posts
    .sort((a, b) => {
      return (
        new Date(b.data.updatedAt).getTime() -
        new Date(a.data.updatedAt).getTime()
      );
    })
    .slice(0, 2)
    .map((a) => a.data);

  return (
    <DefaultLayout title="Landing Page">
      <div className="w-full min-h-screen flex flex-col pb-24">
        <section className="w-full relative border-b border-border overflow-hidden">
          <section className="w-full z-[1] max-w-3xl relative p-5 mx-auto"></section>
        </section>
        <section className="w-full max-w-3xl flex flex-col gap-5 relative p-5 mx-auto">
          <div className="py-3 w-fulls rounded-lg border border-border bg-card">
            <p className="mb-3 px-5 italic">
              And those who were seen dancing were thought to be insane by those
              who could not hear the music.
            </p>
            <Separator />
            <p className="text-right font-light px-5 pt-3 text-sm dark:text-muted-foreground">
              Friedrich Nietzsche
            </p>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-3 items-center">
              <InfoCircledIcon className="w-5 h-5" />
              <h2 className="text-lg font-semibold dark:font-medium">
                Brief Description
              </h2>
            </div>
            <p>
              A 21 y&apos;o living in Indonesia. An undergrad student majoring
              in Computer Science at Sriwijaya University. High interest in web
              development and current AI trends. Likes to learn new things and
              experiment. Loves watching anime and playing games. Also does
              music and stuffs.
            </p>
            <Separator />
            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-3 items-center">
                <MixIcon className="w-5 h-5" />
                <h2 className="text-lg font-semibold dark:font-medium">
                  Minecraft Server
                </h2>
              </div>
              <p>
                Yes, I run a Minecraft server. It is hosted in Azure with 2C/8G
                setup in SG region. The server is running on Fabric with
                Fabulously Optimized installed (I recommend you to use that
                too). The server version is 1.21 but it should be compatible
                with 1.20.x clients (in theory, it would also support older
                clients due to ViaVersion and ViaBackwards, altho untested).
                Here&apos;s the server status:
              </p>
              <MineServerStatus />
            </div>
            <Separator />
            <div className="flex gap-3 items-center">
              <CrumpledPaperIcon className="w-5 h-5" />
              <h2 className="text-lg font-semibold dark:font-medium">
                Most Recent Posts
              </h2>
            </div>
            <p>
              Here are 2 most recent posts from the blog. You can read them by
              clicking the subsequent cards below:
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
              {lastTwoPosts.map((post) => (
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
                      <CardDescription className="line-clamp-1">
                        {post.description}
                      </CardDescription>
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
              <Button asChild>
                <Link className="flex gap-3 lg:col-span-2" href="/posts">
                  <Link2Icon className="w-5 h-5" />
                  <span>View All Posts</span>
                </Link>
              </Button>
            </div>
            <Separator />
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
