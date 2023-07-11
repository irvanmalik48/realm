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

export const NavRail = component$(() => {
  const location = useLocation();
  const showNavRail = useSignal(false);

  return (
    <section class="w-fit h-full z-50 flex flex-col items-center justify-center fixed top-0 left-0 text-neutral-100">
      <button
        class="flex focus:outline-none items-center p-3 rounded-lg transition-[background-color_opacity_transform] opacity-50 hover:scale-105 active:scale-95 hover:opacity-100 hover:bg-neutral-900 fixed top-3 left-3 z-50"
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
        class="flex p-3 rounded-r-xl bg-neutral-900 backdrop-blur-md bg-opacity-20 flex-col items-center justify-center gap-3 transition-[opacity_transform]"
        id="nav-items"
        style={{
          transform: showNavRail.value ? "translateX(0)" : "translateX(-125%)",
          opacity: showNavRail.value ? "1" : "0",
        }}
      >
        <Link
          href="/"
          class={`flex items-center p-3 rounded-lg transition-colors ${
            location.url.pathname === "/"
              ? "bg-neutral-900 hover:bg-neutral-800"
              : "hover:bg-neutral-900"
          }`}
          aria-label="Home page"
          title="Home page"
        >
          <LuHome class="w-5 h-5" />
        </Link>
        <Link
          href="/posts"
          class={`flex items-center p-3 rounded-lg transition-colors ${
            location.url.pathname === "/posts/"
              ? "bg-neutral-900 hover:bg-neutral-800"
              : "hover:bg-neutral-900"
          }`}
          aria-label="Posts page"
          title="Posts page"
        >
          <LuNewspaper class="w-5 h-5" />
        </Link>
        <Link
          href="/projects"
          class={`flex items-center p-3 rounded-lg transition-colors ${
            location.url.pathname === "/projects/"
              ? "bg-neutral-900 hover:bg-neutral-800"
              : "hover:bg-neutral-900"
          }`}
          aria-label="Projects page"
          title="Projects page"
        >
          <LuBriefcase class="w-5 h-5" />
        </Link>
        <Link
          href="/about"
          class={`flex items-center p-3 rounded-lg transition-colors ${
            location.url.pathname === "/about/"
              ? "bg-neutral-900 hover:bg-neutral-800"
              : "hover:bg-neutral-900"
          }`}
          aria-label="About page"
          title="About page"
        >
          <LuInfo class="w-5 h-5" />
        </Link>
        <span class="w-5 h-0.5 block bg-neutral-800 rounded-full" />
        <a
          href="https://social.gnuweeb.org/@lappland"
          rel="me"
          class="flex items-center p-3 rounded-lg transition-colors hover:bg-neutral-900"
          aria-label="Mastodon profile"
          title="Mastodon profile"
        >
          <SiMastodon class="w-5 h-5" />
        </a>
        <a
          href="https://t.me/lapplund"
          class="flex items-center p-3 rounded-lg transition-colors hover:bg-neutral-900"
          aria-label="Telegram profile"
          title="Telegram profile"
        >
          <SiTelegram class="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com/in/irvanmalik48"
          class="flex items-center p-3 rounded-lg transition-colors hover:bg-neutral-900"
          aria-label="LinkedIn profile"
          title="LinkedIn profile"
        >
          <SiLinkedin class="w-5 h-5" />
        </a>
        <a
          href="https://github.com/irvanmalik48"
          class="flex items-center p-3 rounded-lg transition-colors hover:bg-neutral-900"
          aria-label="GitHub profile"
          title="GitHub profile"
        >
          <SiGithub class="w-5 h-5" />
        </a>
      </nav>
    </section>
  );
});
