import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Waves } from "~/components/waves/waves";

async function sleep(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export default component$(() => {
  useVisibleTask$(async () => {
    await sleep(5);
    window.location.href = "https://t.me/lapplund";
  });

  return (
    <>
      <section class="w-full py-24 grid grid-cols-1 place-content-center min-h-screen relative">
        <div class="max-w-4xl w-full mx-auto px-5">
          <h1 class="w-full text-neutral-100 font-semibold font-heading text-4xl md:text-5xl">
            Redirecting to Telegram...
          </h1>
          <p class="w-full text-neutral-300 text-lg md:text-2xl mt-5 pb-10">
            If you're not redirected automatically, click{" "}
            <a
              href="https://t.me/lapplund"
              class="text-neutral-300 hover:text-neutral-100 transition underline"
            >
              here
            </a>
            .
          </p>
          <a
            href="https://social.gnuweeb.org/@lappland"
            rel="me"
            class="hidden"
          >
            mastodon verification
          </a>
        </div>
        <Waves showText={false} />
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Telegram",
  meta: [
    {
      name: "description",
      content: "Redirecting",
    },
    {
      name: "og:title",
      content: "Telegram",
    },
    {
      name: "og:description",
      content: "Redirecting",
    },
  ],
};
