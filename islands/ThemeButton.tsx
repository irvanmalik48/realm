import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "@utils/twind.ts";

export default function ThemeButton(props: h.JSX.IntrinsicAttributes) {
  let currentTheme: string | null;

  if (localStorage.getItem("theme") !== null) {
    currentTheme = localStorage.getItem("theme");
  } else {
    currentTheme = null;
  }

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (currentTheme === null) {
      localStorage.setItem("theme", "dark");
      currentTheme = localStorage.getItem("theme");
      document.body.classList.add("dark");
      setIsDarkTheme(true);
    } else {
      if (currentTheme === "dark") {
        document.body.classList.add("dark");
      } else {
        localStorage.setItem("theme", "light");
        setIsDarkTheme(false);
        document.body.classList.remove("dark");
      }
    }
  }, []);

  return (
    <button
      className={tw`w-full md:w-auto flex flex-row justify-center md:justify-start items-center gap-4`}
      onClick={() => {
        setIsDarkTheme(!isDarkTheme);
        if (!isDarkTheme) {
          localStorage.setItem("theme", "dark");
          document.body.classList.add("dark");
          setIsDarkTheme(true);
        } else {
          localStorage.setItem("theme", "light");
          document.body.classList.remove("dark");
          setIsDarkTheme(false);
        }
      }}
    >
      <div
        className={tw`w-full md:w-auto group flex flex-col justify-center items-center bg-transparent text-light-text dark:text-dark-text w-[fit-content] p-3 rounded-xl md:hover:rounded-3xl hover:bg-light-accent-solid hover:text-light-nav hover:dark:bg-dark-accent-solid hover:dark:text-dark-nav transition-all duration-300`}
      >
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path
            className={tw`${
              !isDarkTheme ? "opacity-100" : "opacity-0"
            } transition-all duration-200 ease-out`}
            fill="currentColor"
            d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"
          />
          <path
            className={tw`${
              isDarkTheme ? "opacity-100" : "opacity-0"
            } transition-all duration-200 ease-out`}
            fill="currentColor"
            d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"
          />
        </svg>
        <span
          className={tw`block md:group-hover:dark:text-dark-text md:group-hover:text-light-text md:group-hover:scale-100 md:bg-light-nav md:dark:bg-dark-nav md:absolute md:left-24 font-semibold md:m-2 w-auto md:min-w-max md:origin-left md:scale-0 md:rounded-3xl md:uppercase md:px-6 md:py-2 text-xs md:text-sm transition-all duration-100`}
        >
          Theme
        </span>
      </div>
    </button>
  );
}
