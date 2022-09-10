import {
  AboutIcon,
  BlogIcon,
  GitHubIcon,
  HomeIcon,
  ProjectIcon,
  RepoIcon,
} from "@components/Icons.tsx";
import { tw } from "@utils/twind.ts";
import ThemeButton from "@islands/ThemeButton.tsx";
import { Any } from "any";

export default function Nav(props: { active: string }) {
  return (
    <nav
      className={tw`bg-light-nav dark:bg-dark-nav h-auto md:h-screen w-full text-light-text dark:text-dark-text fixed md:sticky md:top-0 bottom-0 shadow z-50 m-0 overflow-y-clip flex flex-row md:flex-col justify-evenly md:justify-between md:w-[fit-content] py-4 md:p-4`}
    >
      <div
        className={tw`grid grid-cols-4 md:flex md:flex-col w-full md:w-auto justify-center items-center gap-2 md:gap-5`}
      >
        <NavItem active="home" parentActive={props.active} href="/" text="Home">
          <HomeIcon />
        </NavItem>
        <NavItem
          active="posts"
          parentActive={props.active}
          href="/posts"
          text="Posts"
        >
          <BlogIcon />
        </NavItem>
        <NavItem
          active="projects"
          parentActive={props.active}
          href="/projects"
          text="Projects"
        >
          <ProjectIcon />
        </NavItem>
        <ThemeButton />
        <NavItem
          active="about"
          parentActive={props.active}
          href="/about"
          text="About"
        >
          <AboutIcon />
        </NavItem>
      </div>
      <div
        className={tw`hidden md:flex md:flex-col w-full md:w-auto justify-center items-center gap-2 md:gap-5`}
      >
        <NavItem
          active="undefined"
          parentActive={props.active}
          href="https://github.com/irvanmalik48/realm"
          text="This Blog's Repository"
        >
          <RepoIcon />
        </NavItem>
        <NavItem
          active="undefined"
          parentActive={props.active}
          href="https://github.com/irvanmalik48"
          text="My GitHub Profile"
        >
          <GitHubIcon />
        </NavItem>
      </div>
    </nav>
  );
}

function NavItem(
  props: {
    active: string;
    parentActive: string;
    href: string;
    text: string;
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
            ? "md:dark:bg-dark-accent-semitrans md:bg-light-accent-semitrans text-light-accent-solid dark:text-dark-accent-solid"
            : ""
        } w-full md:w-auto group flex flex-col justify-center items-center bg-transparent text-light-text dark:text-dark-text w-[fit-content] p-3 rounded-xl md:hover:rounded-3xl hover:bg-light-accent-solid hover:text-light-nav hover:dark:bg-dark-accent-solid hover:dark:text-dark-nav transition-all duration-300`}
      >
        {props.children}
        <span
          className={tw`block md:group-hover:dark:text-dark-text md:group-hover:text-light-text md:group-hover:scale-100 md:bg-light-nav md:dark:bg-dark-nav md:absolute md:left-24 font-semibold md:m-2 w-auto md:min-w-max md:origin-left md:scale-0 md:rounded-3xl md:uppercase md:px-6 md:py-2 text-xs md:text-sm transition-all duration-100`}
        >
          {props.text}
        </span>
      </div>
    </a>
  );
}
