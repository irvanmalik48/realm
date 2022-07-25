/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { HomeIcon, RepoIcon, BlogIcon, AboutIcon, GitHubIcon } from "./Icons.tsx";

export default function Nav() {
  return (
    <nav
      className={tw`bg-dark-nav h-auto md:h-screen w-full text-dark-text sticky md:top-0 bottom-0 shadow z-50 m-0 overflow-y-clip flex flex-row md:flex-col justify-evenly md:justify-between md:w-[fit-content] py-4 md:p-4`}
    >
      <div className={tw`flex md:flex-col box-border w-full md:w-auto justify-evenly items-center flex-row gap-2 md:gap-5`}>
        <a
          href="/"
          className={tw`flex flex-row md:flex-col justify-start items-center gap-4`}
        >
          <div
            className={tw`w-[80px] md:w-auto group flex flex-col justify-center items-center bg-transparent text-dark-text md:bg-dark-accent-semitrans md:text-dark-accent-solid w-[fit-content] py-3 md:p-3 rounded-xl md:hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <HomeIcon />
            <span
              className={tw`block group-hover:text-dark-nav md:group-hover:text-dark-text md:group-hover:scale-100 md:bg-dark-nav md:absolute md:left-24 font-semibold md:m-2 w-auto md:min-w-max md:origin-left md:scale-0 md:rounded-3xl md:uppercase md:px-6 md:py-2 text-xs md:text-sm text-dark-text transition-all duration-100`}
            >
              Home
            </span>
          </div>
        </a>
        <a
          href="/"
          className={tw`flex flex-row md:flex-col justify-start items-center gap-4`}
        >
          <div
            className={tw`w-[80px] md:w-auto group flex flex-col justify-center items-center bg-transparent text-dark-text w-[fit-content] py-3 md:p-3 rounded-xl md:hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <RepoIcon />
            <span
              className={tw`block group-hover:text-dark-nav md:group-hover:text-dark-text md:group-hover:scale-100 md:bg-dark-nav md:absolute md:left-24 font-semibold md:m-2 w-auto md:min-w-max md:origin-left md:scale-0 md:rounded-3xl md:uppercase md:px-6 md:py-2 text-xs md:text-sm text-dark-text transition-all duration-100`}
            >
              Repo
            </span>
          </div>
        </a>
        <a
          href="/"
          className={tw`flex flex-row justify-start items-center gap-4`}
        >
          <div
            className={tw`w-[80px] md:w-auto group flex flex-col justify-center items-center bg-transparent text-dark-text w-[fit-content] py-3 md:p-3 rounded-xl md:hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <BlogIcon />
            <span
              className={tw`block group-hover:text-dark-nav md:group-hover:text-dark-text md:group-hover:scale-100 md:bg-dark-nav md:absolute md:left-24 font-semibold md:m-2 w-auto md:min-w-max md:origin-left md:scale-0 md:rounded-3xl md:uppercase md:px-6 md:py-2 text-xs md:text-sm text-dark-text transition-all duration-100`}
            >
              Posts
            </span>
          </div>
        </a>
        <a
          href="/"
          className={tw`flex flex-row justify-start items-center gap-4`}
        >
          <div
            className={tw`w-[80px] md:w-auto group flex flex-col justify-center items-center bg-transparent text-dark-text w-[fit-content] py-3 md:p-3 rounded-xl md:hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <AboutIcon />
            <span
              className={tw`block group-hover:text-dark-nav md:group-hover:text-dark-text md:group-hover:scale-100 md:bg-dark-nav md:absolute md:left-24 font-semibold md:m-2 w-auto md:min-w-max md:origin-left md:scale-0 md:rounded-3xl md:uppercase md:px-6 md:py-2 text-xs md:text-sm text-dark-text transition-all duration-100`}
            >
              About
            </span>
          </div>
        </a>
      </div>
      <a
        href="/"
        className={tw`md:flex flex-row justify-start items-center gap-4 hidden`}
      >
        <div
          className={tw`group flex justify-center items-center bg-transparent text-dark-text w-[fit-content] p-3 rounded-xl hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
        >
          <GitHubIcon />
          <span
            className={tw`md:block hidden group-hover:scale-100 bg-dark-nav absolute left-24 font-semibold m-2 w-auto min-w-max origin-left scale-0 rounded-3xl uppercase px-6 py-2 text-sm text-dark-text transition-all duration-100`}
          >
            Jump to my{" "}
            <span className={tw`text-dark-accent-solid`}>GitHub Profile</span>
          </span>
        </div>
      </a>
    </nav>
  );
}
