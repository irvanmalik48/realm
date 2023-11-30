import DefaultLayout from "@/components/layout/default";
import {
  ChatBubbleIcon,
  Component1Icon,
  Component2Icon,
  ComponentInstanceIcon,
  DownloadIcon,
  FileTextIcon,
  GitHubLogoIcon,
  InfoCircledIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  Pencil2Icon,
  TextIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import ProfileImage from "@/assets/img/profile.webp";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function Home() {
  const links = [
    {
      href: "https://github.com/irvanmalik48",
      text: "GitHub",
      icon: GitHubLogoIcon,
    },
    {
      href: "https://www.linkedin.com/in/irvanmalik48/",
      text: "LinkedIn",
      icon: LinkedInLogoIcon,
    },
    {
      href: "https://instagram.com/irvann48_",
      text: "Instagram",
      icon: InstagramLogoIcon,
    },
    {
      href: "https://twitter.com/irvanmalik48",
      text: "Twitter",
      icon: TwitterLogoIcon,
    },
    {
      href: "https://t.me/lappv",
      text: "Telegram",
      icon: ChatBubbleIcon,
    },
    {
      href: "mailto:irvanmalik48@gmail.com",
      text: "Email",
      icon: Pencil2Icon,
    },
  ];

  const navLinks = [
    {
      href: "/posts",
      text: "Blog Posts",
      icon: FileTextIcon,
    },
    {
      href: "/about",
      text: "About Me",
      icon: InfoCircledIcon,
    },
    {
      href: "/shorts",
      text: "Shorts",
      icon: TextIcon,
    },
    {
      href: "/resume",
      text: "Download Resume",
      icon: DownloadIcon,
    },
  ];

  return (
    <DefaultLayout title="Landing Page">
      <div className="w-full min-h-screen flex flex-col py-12">
        <section className="w-full max-w-3xl p-5 my-auto mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="w-full relative aspect-video flex items-center justify-center md:aspect-square overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground">
            <Image
              priority={true}
              src={ProfileImage}
              blurDataURL={ProfileImage.blurDataURL}
              placeholder="blur"
              alt="Profile Image"
              className="w-full h-auto md:h-full object-cover"
            />
            <p className="absolute bottom-2 left-2 px-3 py-1 rounded-full bg-background text-foreground text-xs">
              Irvan Malik Azantha
            </p>
          </div>
          <div className="w-full relative overflow-hidden rounded-xl md:col-span-2 border border-border bg-popover text-popover-foreground">
            <div className="px-5 py-3 flex items-center gap-3">
              <ComponentInstanceIcon className="w-5 h-5" />
              <h1 className="text-lg font-semibold dark:font-medium">
                Brief Description
              </h1>
            </div>
            <Separator />
            <p className="px-5 py-3 dark:text-foreground/70">
              A 20 y&apos;o living in Indonesia. An undergrad student majoring
              in Computer Science at Sriwijaya University. High interest in web
              development and current AI trends. I like to learn new things and
              experiment. Also does music and stuffs.
            </p>
          </div>
          <div className="w-full relative overflow-hidden rounded-xl md:col-span-2 border border-border bg-popover text-popover-foreground">
            <div className="px-5 py-3 flex items-center gap-3">
              <Component1Icon className="w-5 h-5" />
              <h1 className="text-lg font-semibold dark:font-medium">
                Most Recent Post
              </h1>
            </div>
            <Separator />
            <p className="px-5 py-3 dark:text-foreground/70">
              Section is under construction.
            </p>
          </div>
          <div className="w-full relative grid grid-cols-2 gap-5 p-5 md:aspect-square overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground">
            {navLinks.map((link, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className="py-3 px-5 md:py-5 rounded-xl md:rounded-full flex-col border-border border text-secondary-foreground w-full h-full flex items-center justify-center hover:bg-secondary/80 transition"
                  >
                    <link.icon className="w-7 h-7" />
                    <p className="w-full text-xs text-center mt-2 md:hidden">
                      {link.text}
                    </p>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center" sideOffset={8}>
                  <p>{link.text}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <div className="w-full relative overflow-hidden rounded-xl md:col-span-3 border border-border bg-popover text-popover-foreground">
            <div className="px-5 py-3 flex items-center gap-3">
              <Component2Icon className="w-5 h-5" />
              <h1 className="text-lg font-semibold dark:font-medium">
                Socials
              </h1>
            </div>
            <Separator />
            <div className="p-5 grid grid-cols-2 md:grid-cols-3 gap-5">
              {links.map((link, index) => (
                <Button variant="outline" asChild key={index}>
                  <Link
                    href={link.href}
                    className="flex gap-3 items-center justify-center hover:bg-secondary"
                  >
                    <link.icon className="w-5 h-5" />
                    <div className="text-sm font-medium dark:font-normal">
                      {link.text}
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
