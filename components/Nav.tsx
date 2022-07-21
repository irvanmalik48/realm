/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { HomeIcon, RepoIcon, BlogIcon, AboutIcon, GitHubIcon } from "./Icons.tsx";

export default function Nav() {
  return (
    <nav
      className={tw`bg-dark-nav h-auto md:h-screen w-screen md:w-auto text-dark-text sticky md:top-0 bottom-0 shadow z-50 m-0 overflow-y-clip flex flex-row md:flex-col justify-evenly md:justify-between w-[fit-content] p-4`}
    >
      <div className={tw`flex md:flex-col w-full md:w-auto justify-evenly items-center flex-row gap-5`}>
        <a
          href="/"
          className={tw`flex flex-row justify-start items-center gap-4`}
        >
          <div
            className={tw`group flex justify-center items-center bg-dark-accent-semitrans text-dark-accent-solid w-[fit-content] p-3 rounded-xl hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <HomeIcon />
            <span
              className={tw`group-hover:scale-100 bg-dark-nav absolute left-24 font-semibold m-2 w-auto min-w-max origin-left scale-0 rounded-3xl uppercase px-6 py-2 text-sm text-dark-text transition-all duration-100`}
            >
              Homepage
            </span>
          </div>
        </a>
        <a
          href="/"
          className={tw`flex flex-row justify-start items-center gap-4`}
        >
          <div
            className={tw`group flex justify-center items-center bg-transparent text-dark-text w-[fit-content] p-3 rounded-xl hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <RepoIcon />
            <span
              className={tw`group-hover:scale-100 bg-dark-nav absolute left-24 font-semibold m-2 w-auto min-w-max origin-left scale-0 rounded-3xl uppercase px-6 py-2 text-sm text-dark-text transition-all duration-100`}
            >
              Blog Repository
            </span>
          </div>
        </a>
        <a
          href="/"
          className={tw`flex flex-row justify-start items-center gap-4`}
        >
          <div
            className={tw`group flex justify-center items-center bg-transparent text-dark-text w-[fit-content] p-3 rounded-xl hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <BlogIcon />
            <span
              className={tw`group-hover:scale-100 bg-dark-nav absolute left-24 font-semibold m-2 w-auto min-w-max origin-left scale-0 rounded-3xl uppercase px-6 py-2 text-sm text-dark-text transition-all duration-100`}
            >
              Blog Posts
            </span>
          </div>
        </a>
        <a
          href="/"
          className={tw`flex flex-row justify-start items-center gap-4`}
        >
          <div
            className={tw`group flex justify-center items-center bg-transparent text-dark-text w-[fit-content] p-3 rounded-xl hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <AboutIcon />
            <span
              className={tw`group-hover:scale-100 bg-dark-nav absolute left-24 font-semibold m-2 w-auto min-w-max origin-left scale-0 rounded-3xl uppercase px-6 py-2 text-sm text-dark-text transition-all duration-100`}
            >
              About Me
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
            className={tw`group-hover:scale-100 bg-dark-nav absolute left-24 font-semibold m-2 w-auto min-w-max origin-left scale-0 rounded-3xl uppercase px-6 py-2 text-sm text-dark-text transition-all duration-100`}
          >
            Jump to my{" "}
            <span className={tw`text-dark-accent-solid`}>GitHub Profile</span>
          </span>
        </div>
      </a>
    </nav>
  );
}
