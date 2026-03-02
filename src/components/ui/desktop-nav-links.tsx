import { children } from "solid-js";
import { cn } from "@/libs/helpers/cn";
import { explodeString } from "@/libs/helpers/explode-string";
import type { NavLinkAttributes } from "@/libs/types/ui";
import LapplandLogoText from "../svgs/lappland-logo-text";
import LapplandLogoTrailsIcon from "../svgs/lappland-logo-trails-icon";

export default function DesktopNavLinks() {
  return (
    <>
      <nav class={cn("fixed top-5 left-5 z-[9999]")}>
        <ul
          class={cn(
            "flex flex-col items-start gap-0 text-xs",
            "uppercase font-medium tracking-wider"
          )}
        >
          <DesktopNavLink href="#">Posts</DesktopNavLink>
          <DesktopNavLink href="#">Projects</DesktopNavLink>
          <DesktopNavLink href="#">About</DesktopNavLink>
          <DesktopNavLink href="#">Contact</DesktopNavLink>
        </ul>
      </nav>
      <nav class={cn("fixed top-5 right-5 z-[9999] w-30")}>
        <a
          class={cn(
            "flex items-center justify-end group",
            "relative overflow-hidden"
          )}
          href="/"
        >
          <LapplandLogoTrailsIcon
            class={cn(
              "w-12 h-12 text-primary",
              "transition-all duration-300 ease-[cubic-bezier(0.85,0,0.15,1)]",
              "translate-x-0 group-hover:-translate-x-12",
              "delay-300 group-hover:delay-0",
              "group-hover:text-foreground"
            )}
          />
          <LapplandLogoText
            class={cn(
              "w-12 h-12 text-primary",
              "absolute top-0 right-0",
              "opacity-0 group-hover:opacity-100",
              "transition-all duration-300 ease-[cubic-bezier(0.85,0,0.15,1)]",
              "translate-y-12 group-hover:translate-y-0",
              "delay-0 group-hover:delay-300",
              "group-hover:text-foreground"
            )}
          />
        </a>
      </nav>
    </>
  );
}

export function DesktopNavLink(props: NavLinkAttributes) {
  const resolved = children(() => props.children);

  const chars = () => explodeString(resolved());

  return (
    <li>
      <a
        href={props.href}
        class={cn(
          "group relative flex overflow-hidden cursor-pointer",
          props.class
        )}
      >
        <span class="flex text-primary">
          {chars().map((char, i) => (
            <span
              class={cn(
                "inline-block transition-transform duration-500",
                "ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:-translate-y-full"
              )}
              style={{ "transition-delay": `${i * 30}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
        <span class="absolute inset-0 flex">
          {chars().map((char, i) => (
            <span
              class={cn(
                "inline-block translate-y-full transition-transform",
                "duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]",
                "group-hover:translate-y-0"
              )}
              style={{ "transition-delay": `${i * 30}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </a>
    </li>
  );
}
