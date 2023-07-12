import { $, component$, useOnDocument } from "@builder.io/qwik";
import { LuArrowUpRight } from "@qwikest/icons/lucide";

export default component$(() => {
  useOnDocument(
    "mousemove",
    $((event) => {
      const cursor = document.getElementById("cursor");
      const cursorIcon = document.getElementById("cursor-icon");
      const mouseEvent = event as MouseEvent;

      if (!cursor) return;
      if (!cursorIcon) return;

      cursor.animate(
        {
          opacity: 1,
        },
        {
          duration: 200,
          fill: "forwards",
        }
      );

      const x = mouseEvent.clientX;
      const y = mouseEvent.clientY;

      cursor.animate(
        {
          left: `${x - cursor.offsetWidth / 2}px`,
          top: `${y - cursor.offsetHeight / 2}px`,
        },
        {
          duration: 800,
          fill: "forwards",
        }
      );
    })
  );

  useOnDocument(
    "mouseleave",
    $(() => {
      const cursor = document.getElementById("cursor");

      if (!cursor) return;

      cursor.animate(
        {
          opacity: 0,
        },
        {
          duration: 200,
          fill: "forwards",
        }
      );
    })
  );

  useOnDocument(
    "mousedown",
    $((event) => {
      const ping = document.getElementById("cursor-ping");
      const mouseEvent = event as MouseEvent;

      const allowedButtons = [0, 1, 2];

      if (!ping) return;

      if (!allowedButtons.includes(mouseEvent.button)) return;

      if (mouseEvent.button === 0) {
        ping.style.backgroundColor = "#06b6d4";
        ping.animate(
          {
            scale: 3,
            opacity: 0,
          },
          {
            duration: 500,
            easing: "ease-out",
          }
        );
      } else if (mouseEvent.button === 1) {
        ping.style.backgroundColor = "#facc15";
        ping.animate(
          {
            scale: 3,
            opacity: 0,
          },
          {
            duration: 500,
            easing: "ease-out",
          }
        );
      } else if (mouseEvent.button === 2) {
        ping.style.backgroundColor = "#f87171";
        ping.animate(
          {
            scale: 3,
            opacity: 0,
          },
          {
            duration: 500,
            easing: "ease-out",
          }
        );
      }
    })
  );

  return (
    <>
      <div
        class="fixed z-[9999] pointer-events-none md:block hidden"
        id="cursor"
        style={{
          opacity: 0,
          top: "-1000px",
          left: "50%",
        }}
      >
        <div
          class="absolute inset-0 rounded-full z-0 transition"
          id="cursor-ping"
        />
        <div
          class="bg-neutral-100 rounded-full flex flex-col gap-1 z-10 relative justify-center items-center"
          style={{
            width: "2rem",
            height: "2rem",
          }}
        >
          <LuArrowUpRight
            class="text-neutral-900 w-4 h-4"
            id="cursor-icon"
            style={{
              opacity: 0,
            }}
          />
        </div>
      </div>
    </>
  );
});
