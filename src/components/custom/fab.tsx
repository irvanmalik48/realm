import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  ChevronUpIcon,
  Cross1Icon,
  FileTextIcon,
  HamburgerMenuIcon,
  HomeIcon,
  InfoCircledIcon,
  OpenInNewWindowIcon,
  Pencil2Icon,
  TextIcon,
} from "@radix-ui/react-icons";

import Link from "./link-wrapper";
import { inter, jetbrainsMono } from "../layout/default";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { useToast } from "../ui/use-toast";

import HeroImage from "@/assets/img/hero.webp";
import { cn } from "@/lib/utils";

export default function FAB() {
  const links = [
    {
      href: "/",
      text: "Landing Page",
      icon: HomeIcon,
    },
    {
      href: "/posts",
      text: "Blog Posts",
      icon: FileTextIcon,
    },
    {
      href: "/shorts",
      text: "Shorts",
      icon: TextIcon,
    },
    {
      href: "/about",
      text: "About Me",
      icon: InfoCircledIcon,
    },
    {
      href: "/bin",
      text: "Realm Bin",
      icon: Pencil2Icon,
    },
  ];

  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [showStt, setShowStt] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowStt(true);
      } else {
        setShowStt(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setShowStt(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        size="icon"
        variant="secondary"
        className={cn(
          "fixed w-auto h-auto shadow-xl dark:shadow-none",
          "p-5 flex items-center justify-center ease-out",
          "rounded-full z-[995] transition-all duration-200",
          open ? "bottom-5 right-24" : "bottom-24 right-5 delay-300",
          showStt ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <span className="sr-only">Scroll to top</span>
        <ChevronUpIcon className="w-5 h-5" />
      </Button>
      <Popover
        onOpenChange={() => {
          setOpen(!open);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className={cn(
              "fixed w-auto h-auto shadow-xl dark:shadow-none",
              "p-5 flex items-center justify-center bottom-5",
              "right-5 rounded-full z-[999]"
            )}
          >
            <span className="sr-only">Open navigation menu</span>
            {!open ? (
              <HamburgerMenuIcon className="w-5 h-5" />
            ) : (
              <Cross1Icon className="w-5 h-5" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`p-0 overflow-hidden z-[999] subpixel-antialiased ${jetbrainsMono.variable} ${inter.variable} font-sans`}
          align="end"
          sideOffset={16}
        >
          <div className="relative overflow-hidden aspect-video w-full">
            <Image
              src={HeroImage}
              className="relative w-full h-full object-cover"
              alt="Art by Aier from Pixiv"
              blurDataURL={HeroImage.blurDataURL}
              placeholder="blur"
            />
            <div
              className={cn(
                "absolute bottom-1 text-xs left-1",
                "px-3 py-1 rounded-full bg-background",
                "text-foreground font-mono"
              )}
            >
              re:6.1.0
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://www.pixiv.net/en/artworks/113382570"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "absolute block top-1 right-1 p-2 rounded-full",
                    "opacity-50 hover:opacity-100 transition-opacity",
                    "bg-background text-foreground"
                  )}
                >
                  <OpenInNewWindowIcon className="w-4 h-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="end" sideOffset={8}>
                <p>
                  Jump to the art source on Pixiv.
                  <br />
                  <em>(Opens in a new tab)</em>
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Separator />
          <div className="w-full px-5 py-3 gap-3 flex items-center">
            <div className="font-semibold dark:font-medium">Navigation</div>
          </div>
          <Separator />
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "w-full px-5 py-3 gap-3 flex",
                "items-center hover:bg-secondary transition"
              )}
            >
              <link.icon className="w-5 h-5" />
              <div className="text-sm font-medium dark:font-normal">
                {link.text}
              </div>
            </Link>
          ))}
          <Separator />
          <div className="w-full px-5 py-3 gap-3 flex items-center">
            <div className="font-semibold dark:font-medium">Controls</div>
          </div>
          <Separator />
          <div
            className={cn(
              "w-full px-5 py-2 gap-3 flex",
              "items-center hover:bg-secondary transition",
              "cursor-pointer"
            )}
          >
            <Switch
              checked={theme === "dark"}
              onCheckedChange={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                toast({
                  title: "Theme changed!",
                  description: `You are now using ${
                    theme === "dark" ? "light" : "dark"
                  } mode.`,
                });
              }}
              id="dark-mode-toggle"
              className="cursor-pointer"
            />
            <Label
              htmlFor="dark-mode-toggle"
              className="w-full flex flex-col cursor-pointer"
            >
              <span className="text-sm font-medium">Dark Mode</span>
              <span className="text-xs text-foreground-50">
                {theme === "dark" ? "Disable dark mode" : "Enable dark mode"}
              </span>
            </Label>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
