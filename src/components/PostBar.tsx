import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { ResizablePanel } from "./ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { ArrowUpDown, Newspaper, Search } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useListPostsProps, usePosts, useProcessedPosts } from "@/hooks/posts";
import { PostMatter } from "@/types/api/posts";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const sortOptions = [
  { label: "Alphabet (AZ)", value: "asc" },
  { label: "Alphabet (ZA)", value: "desc" },
  { label: "Date (Oldest)", value: "date-asc" },
  { label: "Date (Newest)", value: "date-desc" },
];

export function PostEntry({ post }: { post: PostMatter; className?: string }) {
  return (
    <Link className="group" href={`/posts/${post.slug}`}>
      <Card className="rounded-xl group-hover:bg-secondary transition-colors duration-300">
        <CardHeader className="px-5 py-3">
          <CardTitle className="text-lg">{post.title}</CardTitle>
          <CardDescription>{post.description}</CardDescription>
        </CardHeader>
        <CardFooter className="px-5 py-3 flex justify-between">
          <p className="text-sm text-secondary-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default function PostBar() {
  const posts = usePosts();

  const filteredPosts = posts.filter((post) => post.draft !== "true");

  const { sortBy, search, setSortBy, setSearch } = useListPostsProps(
    "",
    "date-desc"
  );

  const processedPosts = useProcessedPosts(filteredPosts, sortBy, search);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortBy = (value: string) => {
    setSortBy(value);
  };

  return (
    <ResizablePanel
      className={cn(
        "flex flex-col max-h-screen",
        "bg-secondary/10 text-secondary-foreground",
        "relative z-10"
      )}
      defaultSize={25}
      minSize={20}
    >
      <ScrollArea>
        <div className="flex flex-col divide-y divide-border">
          <div className={cn("p-3")}>
            <h3 className="flex gap-3 items-center text-lg font-semibold">
              <Newspaper size={20} />
              <span>My Articles</span>
            </h3>
          </div>
          <div
            className={cn(
              "p-3 gap-3 flex flex-row !border-b border-border",
              "sticky top-0 bg-background/50 backdrop-blur-lg"
            )}
          >
            <div className="flex flex-col flex-1 gap-1.5">
              <Label
                htmlFor="search-input-post"
                className="flex items-center gap-2"
              >
                <Search size={14} />
                <span>Search</span>
              </Label>
              <Input
                className={cn(
                  "rounded-xl w-full",
                  "hover:bg-secondary/50 hover:text-secondary-foreground",
                  "transition-colors duration-200",
                  "focus-visible:bg-secondary focus-visible:text-secondary-foreground",
                  "placeholder:line-clamp-1"
                )}
                placeholder="Enter a keyword"
                type="text"
                id="search-input-post"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="sort-select-post"
                className="flex items-center gap-2"
              >
                <ArrowUpDown size={14} />
                <span>Sort</span>
              </Label>
              <Select value={sortBy} onValueChange={handleSortBy}>
                <SelectTrigger
                  id="sort-select-post"
                  className={cn(
                    "rounded-xl",
                    "hover:bg-secondary/50 hover:text-secondary-foreground",
                    "transition-colors duration-200",
                    "focus-visible:bg-secondary focus-visible:text-secondary-foreground",
                    "focus-visible:ring-0 focus-visible:ring-offset-0 w-40"
                  )}
                >
                  <SelectValue className="line-clamp-1" />
                </SelectTrigger>
                <SelectContent className="dark rounded-xl">
                  {sortOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="rounded-lg"
                    >
                      <div className="flex gap-3 items-center">
                        <p>{option.label}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <nav className="p-3 flex flex-col gap-3 !border-t-0">
            {processedPosts.map((post, index) => (
              <PostEntry
                className={cn("p-3", {
                  "!border-t-0": index === 0,
                })}
                key={index}
                post={post}
              />
            ))}
          </nav>
        </div>
      </ScrollArea>
    </ResizablePanel>
  );
}
