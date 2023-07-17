import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {
  LuBriefcase,
  LuHome,
  LuInfo,
  LuNewspaper,
  LuPlus,
} from "@qwikest/icons/lucide";
import {
  SiMastodon,
  SiTelegram,
  SiLinkedin,
  SiGithub,
} from "@qwikest/icons/simpleicons";

const navItems = [
  {
    key: "home",
    href: "/",
    icon: <LuHome class="w-12 h-12 lg:w-8 lg:h-8 xl:w-12 xl:h-12" />,
    label: "Home",
  },
  {
    key: "posts",
    href: "/posts",
    icon: <LuNewspaper class="w-12 h-12 lg:w-8 lg:h-8 xl:w-12 xl:h-12" />,
    label: "Posts",
  },
  {
    key: "projects",
    href: "/projects",
    icon: <LuBriefcase class="w-12 h-12 lg:w-8 lg:h-8 xl:w-12 xl:h-12" />,
    label: "Projects",
  },
  {
    key: "about",
    href: "/about",
    icon: <LuInfo class="w-12 h-12 lg:w-8 lg:h-8 xl:w-12 xl:h-12" />,
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

export default component$(() => {
  const isOpen = useSignal(false);

  return (
    <>
      <button
        id="controller"
        class={`transition z-[21] rounded-full fixed right-5 bottom-5 md:right-10 md:bottom-10 p-5 ${
          isOpen.value
            ? "bg-cyan-500 text-neutral-950"
            : "bg-neutral-800 text-neutral-100 bg-opacity-50 backdrop-blur-lg"
        }`}
        onClick$={() => {
          isOpen.value = !isOpen.value;
        }}
      >
        <LuPlus
          class="w-6 h-6"
          style={{
            transform: isOpen.value ? "rotate(45deg)" : "rotate(0deg)",
            transition: "all 500ms cubic-bezier(.33,.56,.33,.94)",
          }}
        />
      </button>
      <div
        class="fixed inset-0 z-10 bg-neutral-900 bg-opacity-70"
        style={{
          opacity: isOpen.value ? 1 : 0,
          backdropFilter: "blur(14px)",
          transition: "all 500ms cubic-bezier(.33,.56,.33,.94)",
          pointerEvents: isOpen.value ? "auto" : "none",
        }}
        onClick$={() => {
          isOpen.value = false;
        }}
      />
      <nav
        class="w-full fixed bottom-0 h-[30vh] md:h-[75vh] lg:h-[50vh] bg-neutral-950 rounded-t-2xl z-20 p-5 pt-7 md:p-10"
        style={{
          transform: isOpen.value ? "translateY(0)" : "translateY(100%)",
          opacity: isOpen.value ? 1 : 0,
          transition: "all 500ms cubic-bezier(.33,.56,.33,.94)",
        }}
      >
        <div class="absolute w-fit left-5 bottom-5 md:left-10 md:bottom-10">
          <p class="text-neutral-100 font-heading font-medium uppercase">
            Social Links
          </p>
          <div class="flex items-center justify-center gap-5 mt-2">
            {socialLinks.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                rel={item.rel}
                class="rounded-full bg-neutral-900 text-neutral-100 bg-opacity-50 backdrop-blur-lg flex items-center justify-center p-3"
                target="_blank"
                onClick$={() => {
                  isOpen.value = false;
                }}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
        <div class="w-full text-center md:text-left grid grid-cols-2 lg:grid-cols-4 md:gap-x-10 gap-x-5 gap-y-5">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              class="w-full flex flex-col gap-1 group"
              onClick$={() => {
                isOpen.value = false;
              }}
            >
              <p class="w-full text-neutral-100 uppercase px-5 py-2 rounded-full bg-neutral-900 md:px-0 md:py-0 md:bg-transparent font-heading font-medium">
                {item.label}
              </p>
              <div class="aspect-video group-hover:bg-opacity-100 transition-all hidden w-full bg-neutral-900 bg-opacity-20 md:grid grid-cols-1 place-content-center text-neutral-100 rounded-xl">
                <div class="p-5 w-fit group-hover:bg-neutral-950 transition-all mx-auto rounded-full bg-neutral-900">
                  {item.icon}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
});
