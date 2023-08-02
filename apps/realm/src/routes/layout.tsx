import { component$, Slot } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import BottomBar from "~/components/bottom-bar/bottom-bar";
import Cursor from "~/components/cursor/cursor";
import Footer from "~/components/footer/footer";

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
      <BottomBar />
      <Cursor />
      <section
        id="main-section"
        class="w-full z-[2] mb-auto text-neutral-100 view-transition-target-root"
      >
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
      {
        name: "og:image",
        content: "https://cdn.realmof.tech/og-image_rwqxap.jpg",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:site",
        content: "@irvanmalik48",
      },
      {
        name: "twitter:creator",
        content: "@irvanmalik48",
      },
      {
        name: "twitter:title",
        content:
          head.meta.find((meta) => meta.name === "og:title")?.content ??
          "Untitled",
      },
      {
        name: "twitter:description",
        content:
          head.meta.find((meta) => meta.name === "og:description")?.content ??
          "No description",
      },
      {
        name: "twitter:image",
        content: "https://cdn.realmof.tech/og-image_rwqxap.jpg",
      },
    ],
  };
};