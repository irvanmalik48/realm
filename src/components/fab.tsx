"use client";

import {
  ArrowRight,
  ArrowUp,
  CircleDotDashed,
  GitGraph,
  Globe,
  Home,
  Info,
  Link2,
  LogIn,
  LogOut,
  Newspaper,
  Settings,
  User as UserIcon,
  LayoutDashboard,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Image from "next/image";
import Hero from "@/assets/img/fab-hero.png";
import performanceModeAtom from "@/lib/atoms/performance-mode";
import { useAtom } from "jotai";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "@/hooks/use-toast";

const handleInteractOutside = (e: Event) => {
  e.preventDefault();
};

const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export function FAB() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [performanceMode] = useAtom(performanceModeAtom);
  const { user, logout } = useAuth();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const trackScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", trackScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", trackScroll);
    };
  }, []);

  const initials = user
    ? user.full_name
      ? user.full_name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : user.username.slice(0, 2).toUpperCase()
    : "";

  return (
    <>
      <button
        type="button"
        className={cn(
          "fixed bottom-20 md:bottom-25 flex items-center justify-center",
          "right-5 md:right-10 z-998 p-3 bg-background hover:bg-secondary rounded-lg",
          "text-foreground hover:text-secondary-foreground cursor-pointer",
          "border border-border transition-all outline-0",
          isScrolled ? "opacity-100" : "opacity-0",
          open
            ? "translate-y-15 -translate-x-15"
            : "translate-y-0 translate-x-0",
        )}
        onClick={handleScrollToTop}
        style={{ viewTransitionName: "site-fab-scroll-top" }}
      >
        <ArrowUp className="size-6" />
        <span className="sr-only">Scroll to top</span>
      </button>
      <Popover onOpenChange={handleOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "fixed bottom-5 md:bottom-10 flex items-center justify-center",
              "right-5 z-998 md:right-10 p-3 bg-background hover:bg-secondary rounded-lg",
              "text-foreground hover:text-secondary-foreground cursor-pointer",
              "border border-border transition-colors outline-0",
            )}
            style={{ viewTransitionName: "site-fab" }}
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
          className="z-998 max-w-3xs sm:max-w-xs md:max-w-sm w-full p-0 overflow-clip"
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
                isImageLoading && !performanceMode ? "blur" : "remove-blur"
              } transition-all ease-[cubic-bezier(0.22,1,0.36,1)] duration-500`}
            />
          </div>
          <h3 className="w-full flex items-center gap-3 bg-muted/20 px-4 py-2 border-b border-border font-bold">
            <span className="size-fit px-2 py-1 rounded-3xl bg-secondary text-secondary-foreground">
              <GitGraph className="size-4" />
            </span>
            <span>realm. (v9.0.0)</span>
          </h3>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/"
            transitionTypes={["nav-back"]}
          >
            <Home className="size-4" />
            <span>Home</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/dashboard"
            transitionTypes={["nav-forward"]}
          >
            <LayoutDashboard className="size-4" />
            <span>Dashboard</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/blog"
            transitionTypes={["nav-forward"]}
          >
            <Newspaper className="size-4" />
            <span>Blog</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>

          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/settings"
            transitionTypes={["nav-forward"]}
          >
            <Settings className="size-4" />
            <span>Settings</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="/about"
            transitionTypes={["nav-forward"]}
          >
            <Info className="size-4" />
            <span>About</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <h3 className="w-full flex items-center gap-3 bg-muted/20 px-4 py-2 border-b border-border font-semibold">
            <span className="size-fit px-2 py-1 rounded-3xl bg-secondary text-secondary-foreground">
              <Link2 className="size-4" />
            </span>
            <span>Others</span>
          </h3>
          <a
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="https://gnuweeb.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe className="size-4" />
            <span>GNU/Weeb</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </a>
          <a
            className="group relative border-b border-border text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
            href="https://webri.ng/webring/chads"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CircleDotDashed className="size-4" />
            <span>webri.ng</span>
            <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
              <ArrowRight className="size-4" />
            </div>
          </a>

          {/* Account & Profile Section */}
          <h3 className="w-full flex items-center gap-3 bg-muted/20 px-4 py-2 border-b border-border font-semibold">
            <span className="size-fit px-2 py-1 rounded-3xl bg-secondary text-secondary-foreground">
              <UserIcon className="size-4" />
            </span>
            <span>Account</span>
          </h3>

          {user ? (
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-background hover:bg-secondary/40 transition-colors">
              <Link
                href="/settings"
                className="flex items-center gap-2.5 min-w-0 flex-1 group cursor-pointer"
              >
                <Avatar className="size-7 border border-border shrink-0">
                  {user.avatar_url ? (
                    <AvatarImage
                      src={user.avatar_url}
                      alt={user.full_name || user.username}
                    />
                  ) : null}
                  <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {user.full_name || user.username}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate">
                    @{user.username}
                  </span>
                </div>
              </Link>
              <button
                type="button"
                onClick={async () => {
                  toast({
                    title: "Signed out",
                    description: "You have been signed out.",
                  });
                  await logout();
                }}
                className="text-muted-foreground hover:text-destructive p-1.5 rounded-md hover:bg-muted/80 transition-colors cursor-pointer shrink-0"
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <Link
              className="group relative text-sm cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors"
              href="/login"
              transitionTypes={["nav-forward"]}
            >
              <LogIn className="size-4" />
              <span>Sign in</span>
              <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                <ArrowRight className="size-4" />
              </div>
            </Link>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
