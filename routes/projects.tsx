import { Projects } from "@/types.d.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import ProjectCard from "@components/ProjectCard.tsx";
import { loadShowcases } from "@utils/load.ts";
import { css, tw } from "@utils/twind.ts";

const projects = await loadShowcases("projects/");

export default function Posts() {
  const projectProps: Projects[] = [];

  for (const [_key, project] of projects.entries()) {
    projectProps.push(project);
  }

  return (
    <DefaultLayout
      title="Projects"
      desc="All that I have made currently."
      active="projects"
    >
      <header
        className={tw`py-24 w-full flex flex-col md:flex-row justify-center items-center gap-5`}
      >
        <div className={tw`flex flex-col justify-center items-center`}>
          <p className={tw`text-dark-text font-bold text-3xl font-heading`}>
            Projects
          </p>
          <p className={tw`w-full text-dark-accent-solid text-lg`}>
            All that I have made currently.
          </p>
        </div>
      </header>
      <section
        className={tw`flex flex-col w-full bg-dark-navglass py-4 px-5 rounded-xl mb-5 ${
          css(
            {
              "-webkit-backdrop-filter": "blur(.5rem)",
              "backdrop-filter": "blur(.5rem)",
            },
          )
        }`}
      >
        <p
          className={tw`text-2xl rounded-xl font-bold text-dark-text mt-1 px-4 py-2 bg-dark-accent-semitrans text-center font-heading`}
        >
          All Projects
        </p>
        <div
          className={tw`grid grid-cols-1 xl:grid-cols-4 mt-5 gap-5 items-between`}
        >
          {projectProps.map((data: Projects, key: number) => {
            return (
              <ProjectCard
                key={key}
                path={"/projects" + data.path}
                title={data.title}
                img={data.screenshot}
                desc={data.desc}
              />
            );
          })}
        </div>
      </section>
    </DefaultLayout>
  );
}
