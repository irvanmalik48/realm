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
import { cn } from "@/lib/utils";

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
      <div className="w-full min-h-screen flex flex-col py-24">
        <section
          className={cn(
            "w-full max-w-3xl relative p-5",
            "my-auto mx-auto grid grid-cols-1",
            "md:grid-cols-3 gap-5"
          )}
        >
          <div
            className={cn(
              "absolute w-[1px] left-1/2 -translate-x-1/2",
              "-inset-y-10 bg-primary/20 animate-pulse"
            )}
          />
          <div
            className={cn(
              "absolute rounded-2xl border border-primary/20",
              "inset-y-0 inset-x-16 md:inset-x-[17.5%]",
              "animate-pulse"
            )}
          />
          <div
            className={cn(
              "absolute flex flex-col items-center",
              "justify-center p-2 -top-12 left-1/2",
              "-translate-x-1/2"
            )}
          >
            <div
              className={cn(
                "bg-primary/20 absolute rounded-full",
                "-inset-3 animate-ping"
              )}
            />
            <div
              className={cn(
                "bg-background border ring-4 ring-primary/20",
                "absolute rounded-full border-primary",
                "-inset-3"
              )}
            />
            <div
              className={cn(
                "absolute inset-0 flex",
                "items-center justify-center"
              )}
            >
              <div className="p-2">
                <svg
                  viewBox="0 0 250 250"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M115.129 32.0145H133.599V217.945H115.129V32.0145Z"
                    fill="currentColor"
                  />
                  <path
                    d="M157.035 32.6505H91.7339L124.384 0L157.035 32.6505Z"
                    fill="currentColor"
                  />
                  <path
                    d="M157.65 217.35H92.3495L125 250L157.65 217.35Z"
                    fill="currentColor"
                  />
                  <path
                    d="M32.0145 134.215V115.745H217.945V134.215H32.0145Z"
                    fill="currentColor"
                  />
                  <path
                    d="M32.6505 92.3089V157.61L0 124.959L32.6505 92.3089Z"
                    fill="currentColor"
                  />
                  <path
                    d="M217.35 91.6932V156.994L250 124.344L217.35 91.6932Z"
                    fill="currentColor"
                  />
                  <path
                    d="M70.5255 80.8963L80.2837 71.1375L178.521 169.375L168.762 179.133L70.5255 80.8963Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.0021 59.0914L58.5003 93.5932V59.0914H93.0021Z"
                    fill="currentColor"
                  />
                  <path
                    d="M190.914 156.352L156.412 190.854H190.914V156.352Z"
                    fill="currentColor"
                  />
                  <path
                    d="M80.8963 178.818L71.1375 169.06L169.375 70.8229L179.133 80.5817L80.8963 178.818Z"
                    fill="currentColor"
                  />
                  <path
                    d="M59.0914 156.342L93.5932 190.843H59.0914V156.342Z"
                    fill="currentColor"
                  />
                  <path
                    d="M156.352 58.4302L190.854 92.9319V58.4302H156.352Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "absolute flex items-center justify-center",
              "-bottom-10 left-1/2 -translate-x-1/2"
            )}
          >
            <div
              className={cn(
                "bg-primary border-primary",
                "p-1 animate-ping rounded-full"
              )}
            />
            <div
              className={cn(
                "absolute bg-primary border-primary",
                "inset-0 rounded-full"
              )}
            />
          </div>
          <div
            className={cn(
              "w-full relative aspect-video flex",
              "items-center justify-center md:aspect-square",
              "overflow-hidden rounded-xl border border-border",
              "bg-popover text-popover-foreground"
            )}
          >
            <Image
              priority={true}
              src={ProfileImage}
              blurDataURL={ProfileImage.blurDataURL}
              placeholder="blur"
              alt="Profile Image"
              className="w-full h-auto md:h-full object-cover"
            />
            <p
              className={cn(
                "absolute bottom-2 left-2 px-3",
                "py-1 rounded-full bg-background",
                "text-foreground text-xs"
              )}
            >
              Irvan Malik Azantha
            </p>
          </div>
          <div
            className={cn(
              "w-full relative flex overflow-hidden rounded-xl",
              "md:col-span-2 border border-border",
              "bg-popover text-popover-foreground"
            )}
          >
            <div
              className={cn(
                "relative p-3 flex flex-col",
                "items-center justify-start"
              )}
            >
              <div
                className={cn(
                  "absolute inset-y-0 right-1/2",
                  "translate-x-1/2 w-[1px] bg-border"
                )}
              />
              <div
                className={cn(
                  "relative p-2 bg-popover",
                  "rounded-full border border-border"
                )}
              >
                <ComponentInstanceIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex py-3 pr-5 flex-col gap-1 flex-1">
              <h1
                className={cn(
                  "h-10 flex items-center text-lg",
                  "font-semibold dark:font-medium"
                )}
              >
                Brief Description
              </h1>
              <p className="dark:text-foreground/70">
                A 20 y&apos;o living in Indonesia. An undergrad student majoring
                in Computer Science at Sriwijaya University. High interest in
                web development and current AI trends. Likes to learn new things
                and experiment. Loves watching anime and playing games. Also
                does music and stuffs.
              </p>
            </div>
          </div>
          <div
            className={cn(
              "w-full relative flex flex-row-reverse",
              "overflow-hidden rounded-xl md:col-span-2",
              "border border-border bg-popover text-popover-foreground"
            )}
          >
            <div
              className={cn(
                "relative p-3 flex flex-col",
                "items-center justify-start"
              )}
            >
              <div
                className={cn(
                  "absolute inset-y-0 right-1/2",
                  "translate-x-1/2 w-[1px] bg-border"
                )}
              />
              <div
                className={cn(
                  "relative p-2 bg-popover",
                  "rounded-full border border-border"
                )}
              >
                <Component1Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex py-3 pl-5 flex-col gap-1 flex-1">
              <h1
                className={cn(
                  "h-10 flex items-center text-lg",
                  "font-semibold dark:font-medium"
                )}
              >
                Dark Arts
              </h1>
              <div className="space-y-3 md:space-y-0 dark:text-foreground/70">
                <p className="flex flex-col md:flex-row">
                  <span className="font-semibold inline-block min-w-[6rem]">
                    Frontend
                  </span>
                  <span className="text-sm md:text-base">
                    React, Next.js, TailwindCSS
                  </span>
                </p>
                <p className="flex flex-col md:flex-row">
                  <span className="font-semibold inline-block min-w-[6rem]">
                    Backend
                  </span>
                  <span className="text-sm md:text-base">
                    Node.js, Express, Laravel
                  </span>
                </p>
                <p className="flex flex-col md:flex-row">
                  <span className="font-semibold inline-block min-w-[6rem]">
                    Database
                  </span>
                  <span className="text-sm md:text-base">
                    MongoDB, PostgreSQL, MariaDB
                  </span>
                </p>
                <p className="flex flex-col md:flex-row">
                  <span className="font-semibold inline-block min-w-[6rem]">
                    DevOps
                  </span>
                  <span className="text-sm md:text-base">
                    Linux, GitHub CI/CD, Docker, Nginx
                  </span>
                </p>
                <p className="flex flex-col md:flex-row">
                  <span className="font-semibold inline-block min-w-[6rem]">
                    AI/ML
                  </span>
                  <span className="text-sm md:text-base">
                    Tensorflow, PyTorch
                  </span>
                </p>
                <p className="flex flex-col md:flex-row">
                  <span className="font-semibold inline-block min-w-[6rem]">
                    Others
                  </span>
                  <span className="text-sm md:text-base">
                    Git, Figma, Premiere Pro
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            className={cn(
              "w-full relative grid grid-cols-2",
              "gap-5 p-5 md:aspect-square overflow-hidden",
              "rounded-xl border border-border bg-popover",
              "text-popover-foreground"
            )}
          >
            {navLinks.map((link, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "py-3 px-5 md:py-5 rounded-xl",
                      "md:rounded-full flex-col border-border",
                      "border text-secondary-foreground w-full h-full",
                      "flex items-center justify-center",
                      "hover:bg-secondary/80 transition"
                    )}
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
          <div
            className={cn(
              "w-full relative overflow-hidden rounded-xl",
              "md:col-span-3 border border-border",
              "bg-popover text-popover-foreground"
            )}
          >
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
