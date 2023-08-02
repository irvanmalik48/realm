import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {
  LuArrowUp,
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
import { twMerge } from "tailwind-merge";
import { animate } from "motion";

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
  const windowWidth = useSignal(0);

  useTask$(({ track }) => {
    const tracking = track(() => isOpen.value);
    if (typeof window === "undefined") return;

    windowWidth.value = window.innerWidth;

    const blockingBg = document.getElementById("blocking-bg");
    const actualNav = document.getElementById("actual-nav");
    const mainSection = document.getElementById("main-section");

    if (!blockingBg || !actualNav || !mainSection) return;

    if (tracking) {
      animate(
        blockingBg,
        {
          opacity: 1,
          pointerEvents: "auto",
        },
        {
          allowWebkitAcceleration: true,
        }
      );

      animate(
        actualNav,
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        {
          allowWebkitAcceleration: true,
        }
      );

      animate(
        mainSection,
        {
          filter: "blur(14px)",
          transform: `translateY(-${actualNav.offsetHeight / 3}px)`,
        },
        {
          allowWebkitAcceleration: true,
        }
      );
    } else {
      animate(
        blockingBg,
        {
          opacity: 0,
          pointerEvents: "none",
        },
        {
          allowWebkitAcceleration: true,
        }
      );

      animate(
        actualNav,
        {
          opacity: 0,
          // Trick to get Chrome's GPU acceleration to work
          transform: `translateY(${actualNav.offsetHeight}px)`,
        },
        {
          allowWebkitAcceleration: true,
        }
      );

      animate(
        mainSection,
        {
          filter: "blur(0)",
          transform: "translateY(0)",
        },
        {
          allowWebkitAcceleration: true,
        }
      );
    }
  });

  return (
    <>
      <button
        id="controller"
        class={`${twMerge(
          "transition z-[21] rounded-full fixed right-5",
          "bottom-5 md:right-10 md:bottom-10 p-5"
        )} ${
          isOpen.value
            ? "bg-cyan-500 text-neutral-950"
            : "bg-neutral-800/50 text-neutral-100 backdrop-blur-lg"
        }`}
        title="Open/Close Navigation Menu"
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
      <button
        id="to-top"
        class={twMerge(
          "transition z-[9] rounded-full fixed right-5",
          "bottom-24 md:right-10 md:bottom-32 p-5",
          "bg-neutral-800/50 text-neutral-100 backdrop-blur-lg"
        )}
        title="Scroll to Top"
        onClick$={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <LuArrowUp class="w-6 h-6" />
      </button>
      <div
        class="fixed inset-0 z-10 bg-neutral-800/70 focus:outline-none"
        id="blocking-bg"
        style={{
          opacity: 0,
          pointerEvents: "none",
        }}
        onClick$={() => {
          isOpen.value = false;
        }}
      />
      <nav
        class={twMerge(
          "w-full fixed bottom-0 h-[30vh] md:h-[75vh]",
          "lg:h-[50vh] bg-neutral-950 rounded-t-2xl",
          "z-20 p-5 pt-7 md:p-10"
        )}
        id="actual-nav"
        style={{
          transform: `translateY(1000px)`,
          opacity: 0,
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
                class={twMerge(
                  "rounded-full bg-neutral-900/50 text-neutral-100",
                  "backdrop-blur-lg flex items-center",
                  "justify-center p-3"
                )}
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
        <div
          class={twMerge(
            "w-full text-center md:text-left grid grid-cols-2",
            "lg:grid-cols-4 md:gap-x-10 gap-x-5 gap-y-5"
          )}
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              class="w-full flex flex-col gap-1 group"
              onClick$={() => {
                isOpen.value = false;
              }}
            >
              <p
                class={twMerge(
                  "w-full text-neutral-100 uppercase px-5 py-2 rounded-full",
                  "bg-neutral-900 md:px-0 md:py-0 md:bg-transparent",
                  "font-heading font-medium"
                )}
              >
                {item.label}
              </p>
              <div
                class={twMerge(
                  "aspect-video group-hover:bg-neutral-900 transition-all",
                  "hidden w-full bg-neutral-900/20 md:grid grid-cols-1",
                  "place-content-center text-neutral-100 rounded-xl"
                )}
              >
                <div
                  class={twMerge(
                    "p-5 w-fit group-hover:bg-neutral-950 transition-all",
                    "mx-auto rounded-full bg-neutral-900"
                  )}
                >
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
