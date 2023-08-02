import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Waves } from "~/components/waves/waves";

export default component$(() => {
  return (
    <>
      <section class="w-full py-24 grid grid-cols-1 place-content-center min-h-screen relative">
        <div class="max-w-4xl w-full mx-auto px-5">
          <h1 class="w-full text-neutral-100 font-semibold font-heading text-4xl md:text-5xl">
            All pages are under construction.
          </h1>
          <p class="w-full text-neutral-300 text-lg md:text-2xl mt-5 pb-10">
            Please come back later. I need to finish some stuff first. This
            website aren't even finished, so please be patient.
          </p>
        </div>
        <Waves showText={false} />
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "404",
  meta: [
    {
      name: "description",
      content: "Not found",
    },
    {
      name: "og:title",
      content: "404",
    },
    {
      name: "og:description",
      content: "Not found",
    },
  ],
};
