import { $, component$, useOnDocument } from "@builder.io/qwik";
import { Image } from "../image/image";

export default component$(() => {
  useOnDocument(
    "mousemove",
    $((event) => {
      const headerHero = document.getElementById("header-hero");
      const interactionCanvas = document.getElementById("interaction-canvas");
      const mouseEvent = event as MouseEvent;

      if (!headerHero) return;
      if (!interactionCanvas) return;

      const x = mouseEvent.pageX - headerHero.offsetLeft / 2;
      const y = mouseEvent.pageY - headerHero.offsetTop / 2;

      // use the mouse position to change the radial gradient of the interaction canvas position
      if (
        x < 0 ||
        y < 0 ||
        x > headerHero.offsetWidth ||
        y > headerHero.offsetHeight
      ) {
        interactionCanvas.style.opacity = "0";
      } else {
        interactionCanvas.style.opacity = "1";
        interactionCanvas.style.background = `radial-gradient(circle at ${x}px ${y}px, #06b6d4df, #06b6d400)`;
      }
    })
  );

  return (
    <div
      class="w-full h-auto rounded-xl bg-neutral-900 relative"
      id="header-hero"
    >
      <div
        class="absolute -inset-1 z-0 rounded-xl transition-opacity duration-700"
        id="interaction-canvas"
      />
      <Image
        src="https://cdn.realmof.tech/hero_rz1wup.jpg"
        layout="fullWidth"
        height="250"
        alt="Original wallpaper image by YoStar"
        class="w-full h-[250px] rounded-lg z-10 relative"
        priority={true}
      />
    </div>
  );
});
