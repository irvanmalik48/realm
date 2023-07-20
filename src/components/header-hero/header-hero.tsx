import { component$ } from "@builder.io/qwik";
import { Image } from "../image/image";
import { twMerge } from "tailwind-merge";

export default component$(() => {
  return (
    <div
      class={twMerge(
        "w-full h-auto rounded-xl bg-neutral-900 relative",
        "overflow-hidden ring-2 ring-neutral-900"
      )}
      id="header-hero"
    >
      <div class="screen-overlay" />
      <Image
        src="https://cdn.realmof.tech/hero_rz1wup.jpg?w=0.6&expires=2019488400"
        width="1500"
        height="600"
        alt="Original wallpaper image by YoStar"
        class="w-full h-[250px] rounded-lg z-10 relative object-cover"
        priority={true}
      />
    </div>
  );
});
