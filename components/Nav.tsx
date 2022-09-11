import {
  AboutIcon,
  BlogIcon,
  GitHubIcon,
  HomeIcon,
  ProjectIcon,
  RepoIcon,
} from "@components/Icons.tsx";
import { tw } from "@utils/twind.ts";
import { NavItem } from "@components/NavItem.tsx";

export default function Nav(props: { active: string }) {
  return (
    <nav
      className={tw`bg-dark-nav h-auto md:h-screen w-full text-dark-text fixed md:sticky md:top-0 bottom-0 shadow z-50 m-0 overflow-y-clip flex flex-row md:flex-col justify-evenly md:justify-between md:w-[fit-content] py-4 md:p-4`}
    >
      <div
        className={tw`grid grid-cols-4 md:flex md:flex-col w-full md:w-auto justify-center items-center gap-2 md:gap-5`}
      >
        <NavItem
          active="home"
          parentActive={props.active}
          href="/"
          text="Home"
        >
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
          text={
            <>
              Projects
              <span className={tw`hidden md:inline`}>{" "}(WIP)</span>
            </>
          }
        >
          <ProjectIcon />
        </NavItem>
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
          active="no-active"
          parentActive={props.active}
          href="https://github.com/irvanmalik48/realm"
          text="This Blog's Repository"
        >
          <RepoIcon />
        </NavItem>
        <NavItem
          active="no-active"
          parentActive={props.active}
          href="https://github.com/irvanmalik48"
          text={
            <>
              Jump to my{" "}
              <span className={tw`text-dark-accent-solid`}>GitHub Profile</span>
            </>
          }
        >
          <GitHubIcon />
        </NavItem>
      </div>
    </nav>
  );
}
