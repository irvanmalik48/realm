import { h } from "preact";
import { tw } from "@utils/twind.ts";

export function Button(
  props?:
    & (
      & h.JSX.IntrinsicAttributes
      & (
        | h.JSX.HTMLAttributes<HTMLAnchorElement>
        | h.JSX.HTMLAttributes<HTMLButtonElement>
      )
    )
    & { type: "button" | "anchor" },
) {
  if (props?.type === "anchor") {
    return (
      <a
        onClick={props.onClick as
          | h.JSX.MouseEventHandler<HTMLAnchorElement>
          | undefined}
        href={props.href}
        className={tw`group bg-dark-accent-quartertrans px-4 py-2 inline-block text-sm text-uppercase text-dark-text rounded-3xl transition-all duration-200 ease-out hover:bg-dark-accent-semitrans hover:text-dark-accent-solid ring ring-dark-accent-quartertrans hover:ring-dark-accent-solid font-bold w-[fit-content] ${
          props.className ?? ""
        }`}
      >
        <div className={tw`flex flex-row justify-center items-center gap-1`}>
          {props.children}
          <svg
            className={tw`mt-0.5 ml-2 -mr-1 text-dark-text group-hover:text-dark-accent-solid stroke-2`}
            fill="none"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            aria-hidden="true"
          >
            <path
              className="opacity-0 transition group-hover:opacity-100"
              stroke="currentColor"
              d="M0 5h7"
            >
            </path>
            <path
              className="transition group-hover:translate-x-[3px]"
              stroke="currentColor"
              d="M1 1l4 4-4 4"
            >
            </path>
          </svg>
        </div>
      </a>
    );
  }

  return (
    <button
      onClick={props?.onClick as
        | h.JSX.MouseEventHandler<HTMLButtonElement>
        | undefined}
      className={tw`group bg-dark-accent-quartertrans px-4 py-2 inline-block text-sm text-uppercase text-dark-text rounded-3xl transition-all duration-200 ease-out hover:bg-dark-accent-semitrans hover:text-dark-accent-solid ring ring-dark-accent-quartertrans hover:ring-dark-accent-solid font-bold w-[fit-content] ${
        props?.className ?? ""
      }`}
    >
      <div className={tw`flex flex-row justify-center items-center gap-1`}>
        {props?.children}
        <svg
          className={tw`mt-0.5 ml-2 -mr-1 text-dark-text group-hover:text-dark-accent-solid stroke-2`}
          fill="none"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
        >
          <path
            className="opacity-0 transition group-hover:opacity-100"
            stroke="currentColor"
            d="M0 5h7"
          >
          </path>
          <path
            className="transition group-hover:translate-x-[3px]"
            stroke="currentColor"
            d="M1 1l4 4-4 4"
          >
          </path>
        </svg>
      </div>
    </button>
  );
}
