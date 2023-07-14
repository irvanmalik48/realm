import { component$, useSignal } from "@builder.io/qwik";
import {
  LuHome,
  LuInfo,
  LuNewspaper,
  LuBriefcase,
  LuPlus,
} from "@qwikest/icons/lucide";
import {
  SiGithub,
  SiLinkedin,
  SiMastodon,
  SiTelegram,
} from "@qwikest/icons/simpleicons";
import { Link, useLocation } from "@builder.io/qwik-city";
import { twMerge } from "tailwind-merge";

const navItems = [
  {
    key: "home",
    href: "/",
    icon: <LuHome class="w-5 h-5" />,
    label: "Home",
  },
  {
    key: "posts",
    href: "/posts",
    icon: <LuNewspaper class="w-5 h-5" />,
    label: "Posts",
  },
  {
    key: "projects",
    href: "/projects",
    icon: <LuBriefcase class="w-5 h-5" />,
    label: "Projects",
  },
  {
    key: "about",
    href: "/about",
    icon: <LuInfo class="w-5 h-5" />,
    label: "About",
  },
];

const socialLinks = [
  {
    key: "mastodon",
    rel: "me",
    href: "https://social.gnuweeb.org/@lappland",
    icon: <SiMastodon class="w-5 h-5" />,
    label: "Mastodon Profile",
  },
  {
    key: "telegram",
    rel: "external",
    href: "https://t.me/lapplund",
    icon: <SiTelegram class="w-5 h-5" />,
    label: "Telegram Profile",
  },
  {
    key: "linkedin",
    rel: "external",
    href: "https://www.linkedin.com/in/irvanmalik48",
    icon: <SiLinkedin class="w-5 h-5" />,
    label: "LinkedIn Profile",
  },
  {
    key: "github",
    rel: "external",
    href: "https://github.com/irvanmalik48",
    icon: <SiGithub class="w-5 h-5" />,
    label: "GitHub Profile",
  },
];

export const NavRail = component$(() => {
  const loc = useLocation();
  const showNavRail = useSignal(false);

  return (
    <section
      class={twMerge(
        "w-fit h-full z-[999] flex flex-col",
        "items-center justify-center fixed top-0 left-0",
        "text-neutral-100"
      )}
    >
      <button
        class={twMerge(
          "flex focus:outline-none items-center p-3",
          "rounded-lg transition-[background-color_opacity_transform]",
          "opacity-50 hover:scale-105 active:scale-95 hover:opacity-100",
          "hover:bg-neutral-900 fixed top-3 left-3 z-50"
        )}
        aria-label="Toggle navigation"
        title="Toggle navigation"
        onClick$={() => {
          showNavRail.value = !showNavRail.value;
        }}
      >
        <LuPlus
          class="w-5 h-5 transition-transform"
          style={{
            transform: showNavRail.value ? "rotate(45deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <nav
        class={twMerge(
          "flex p-3 rounded-r-xl bg-neutral-900 backdrop-blur-md",
          "bg-opacity-20 flex-col items-center justify-center gap-3",
          "transition-[opacity_transform] view-transition-target-navrail"
        )}
        id="nav-items"
        style={{
          transform: showNavRail.value ? "translateX(0)" : "translateX(-125%)",
          opacity: showNavRail.value ? "1" : "0",
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            class={`flex items-center p-3 rounded-lg transition ${loc.url.pathname.includes(item.href)
                ? "bg-neutral-900 hover:bg-neutral-800"
                : "hover:bg-neutral-900"
              }`}
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
          </Link>
        ))}
        <span class="w-5 h-0.5 block bg-neutral-800 rounded-full" />
        {socialLinks.map((link) => (
          <a
            key={link.key}
            href={link.href}
            rel={link.rel}
            class="flex items-center p-3 rounded-lg transition-colors hover:bg-neutral-900"
            aria-label={link.label}
            title={link.label}
          >
            {link.icon}
          </a>
        ))}
      </nav>
    </section>
  );
});
