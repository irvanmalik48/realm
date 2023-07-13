import { component$, Slot } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { twMerge } from "tailwind-merge";
import Cursor from "~/components/cursor/cursor";
import Footer from "~/components/footer/footer";
import { NavRail } from "~/components/navrail/navrail";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <main
      id="root"
      class="w-full bg-neutral-950 min-h-[100vh] flex flex-col relative"
    >
      <div
        class={twMerge(
          "z-20 fixed top-0 inset-x-0 h-16",
          "pointer-events-none lg:hidden",
          "bg-gradient-to-b from-neutral-950 to-transparent"
        )}
      />
      <Cursor />
      <NavRail />
      <section class="w-full mb-auto text-neutral-100 view-transition-target-root">
        <Slot />
      </section>
      <Footer />
    </main>
  );
});

export const head: DocumentHead = ({ head }) => {
  return {
    title: `realm | ${head.title}`,
    meta: [
      {
        name: "description",
        content:
          head.meta.find((meta) => meta.name === "description")?.content ??
          "No description",
      },
      {
        name: "og:title",
        content:
          head.meta.find((meta) => meta.name === "og:title")?.content ??
          "Untitled",
      },
      {
        name: "og:description",
        content:
          head.meta.find((meta) => meta.name === "og:description")?.content ??
          "No description",
      },
    ],
  };
};
