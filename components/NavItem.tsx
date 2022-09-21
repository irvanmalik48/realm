import { tw } from "@utils/twind.ts";
import { Any } from "any";

export function NavItem(
  props: {
    active: string;
    parentActive: string;
    href: string;
    text: Any;
    children: Any;
  },
) {
  return (
    <a
      href={props.href}
      className={tw`w-full md:w-auto flex flex-row justify-center md:justify-start items-center gap-4`}
    >
      <div
        className={tw`${
          props.active === props.parentActive
            ? "md:bg-dark-accent-semitrans text-dark-accent-solid"
            : ""
        } w-full md:w-auto group flex flex-col justify-center items-center bg-transparent text-dark-text w-[fit-content] p-2.5 rounded-xl md:hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
      >
        {props.children}
        <span
          className={tw`hidden md:block group-hover:text-dark-nav md:group-hover:text-dark-text md:group-hover:scale-100 md:bg-dark-nav md:absolute md:left-24 font-semibold md:m-2 w-auto md:min-w-max md:origin-left md:scale-0 md:rounded-3xl md:uppercase md:px-6 md:py-2 text-xs md:text-sm transition-all duration-100`}
        >
          {props.text}
        </span>
      </div>
    </a>
  );
}
