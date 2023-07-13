import { component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";

interface Props {
  showText?: boolean;
}

export const Waves = component$<Props>(({ showText = true }) => {
  return (
    <>
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
          <use
            href="#gentle-wave"
            x="48"
            y="0"
            class="fill-cyan-500 opacity-25"
          />
          <use
            href="#gentle-wave"
            x="48"
            y="3"
            class="fill-cyan-500 opacity-25"
          />
          <use
            href="#gentle-wave"
            x="48"
            y="5"
            class="fill-cyan-500 opacity-25"
          />
          <use
            href="#gentle-wave"
            x="48"
            y="7"
            class="fill-cyan-500 opacity-100"
          />
        </g>
      </svg>
      {showText !== false && (
        <div class="w-full py-8 bg-cyan-500">
          <p
            class={twMerge(
              "md:text-lg text-neutral-900 italic mx-auto",
              "text-opacity-80 w-full text-center px-5 max-w-4xl"
            )}
          >
            "So you are good at this!"
            <br />
            <span
              class={twMerge(
                "px-5 py-1 rounded-full not-italic inline-flex",
                "text-opacity-100 items-center w-fit justify-center",
                "bg-neutral-900 text-neutral-100"
              )}
            >
              <span class="text-neutral-100 font-semibold">
                Yes, of course I am.
              </span>
            </span>
          </p>
        </div>
      )}
      <svg
        class="waves rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use
            href="#gentle-wave"
            x="48"
            y="0"
            class="fill-cyan-500 opacity-25"
          />
          <use
            href="#gentle-wave"
            x="48"
            y="3"
            class="fill-cyan-500 opacity-25"
          />
          <use
            href="#gentle-wave"
            x="48"
            y="5"
            class="fill-cyan-500 opacity-25"
          />
          <use
            href="#gentle-wave"
            x="48"
            y="7"
            class="fill-cyan-500 opacity-100"
          />
        </g>
      </svg>
    </>
  );
});
