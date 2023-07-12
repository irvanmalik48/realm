import { component$ } from "@builder.io/qwik";
import { Image } from "../image/image";

export default component$(() => {
  return (
    <div
      class="w-full h-auto rounded-xl bg-neutral-900 relative"
      id="header-hero"
    >
      <Image
        src="https://cdn.realmof.tech/hero_rz1wup.jpg?w=0.4"
        layout="fullWidth"
        height="250"
        alt="Original wallpaper image by YoStar"
        class="w-full h-[250px] rounded-lg z-10 relative object-cover"
        priority={true}
      />
    </div>
  );
});
