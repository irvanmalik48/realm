"use client";

import {
  ArrowRight,
  ArrowUp,
  Code2,
  Home,
  Info,
  Newspaper,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Image from "next/image";
import Hero from "@/assets/img/fab-hero.png";

export function FAB() {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleInteractOutside = (e: Event) => {
    e.preventDefault();
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const trackScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", trackScroll);

    return () => {
      window.removeEventListener("scroll", trackScroll);
    };
  }, []);

  return (
    <>
      <button
        className={cn(
          "fixed bottom-20 md:bottom-25 flex items-center justify-center",
          "right-5 md:right-10 z-50 p-3 bg-background hover:bg-secondary rounded-lg",
          "text-foreground hover:text-secondary-foreground cursor-pointer",
          "border border-border transition-all outline-0",
          scrollY > 10 ? "opacity-100" : "opacity-0",
          open
            ? "translate-y-15 -translate-x-15"
            : "translate-y-0 -translate-x-0",
        )}
        onClick={handleScrollToTop}
      >
        <ArrowUp className="size-6" />
        <span className="sr-only">Scroll to top</span>
      </button>
      <Popover onOpenChange={handleOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "fixed bottom-5 md:bottom-10 flex items-center justify-center",
              "right-5 z-50 md:right-10 p-3 bg-background hover:bg-secondary rounded-lg",
              "text-foreground hover:text-secondary-foreground cursor-pointer",
              "border border-border transition-colors outline-0",
            )}
          >
            <X
              className={cn(
                "size-6 transition-transform",
                open ? "rotate-0" : "rotate-45",
              )}
            />
            <span className="sr-only">Open FAB menu</span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          onInteractOutside={handleInteractOutside}
          className="max-w-3xs sm:max-w-xs md:max-w-sm w-full p-0 overflow-clip"
          align="end"
          sideOffset={10}
        >
          <div className="h-auto overflow-clip w-full border-b border-border">
            <Image
              src={Hero}
              height={120}
              placeholder="blur"
              alt="FAB Hero Image"
              blurDataURL={Hero.blurDataURL}
              onLoad={() => setIsImageLoading(false)}
              className={`${
                isImageLoading ? "blur scale-150" : "remove-blur scale-100"
              } transition-all ease-[cubic-bezier(0.22,_1,_0.36,_1)] duration-500`}
            />
          </div>
          <h3 className="w-full bg-muted/20 px-4 py-2 border-b border-border font-bold">
            realm. (v8.0.0-rev3)
          </h3>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/"
          >
            <Home className="size-4" />
            <span>Home</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/blog"
          >
            <Newspaper className="size-4" />
            <span>Posts</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/projects"
          >
            <Code2 className="size-4" />
            <span>Projects</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            className="group relative text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/about"
          >
            <Info className="size-4" />
            <span>About</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
        </PopoverContent>
      </Popover>
    </>
  );
}
