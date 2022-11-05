import { GetStaticProps } from "next";
import BaseLayout from "@cly/BaseLayout";
import ProjectCard from "@csl/ProjectCard";
import { ProjectSlugs } from "@utils/types";
import { getProjectSlugs } from "@utils/utils";

const slug = {
  title: "Projects",
  description: "IrvanMA's niche projects.",
};

export default function Blog(props: ProjectSlugs) {
  return (
    <BaseLayout {...slug}>
      <section className="w-full min-h-screen grid place-content-center place-items-center gap-5 py-24 container-responsive">
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <section className="min-h-full px-5 py-2 flex flex-col items-center justify-center gap-3">
            <p className="w-fit text-3xl font-bold border-b-2 border-red-400 border-opacity-50">
              Projects
            </p>
            <p>Everything that I&apos;ve (or we&apos;ve) made.</p>
          </section>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {props.projects.map((project: any, index: any) => (
            <ProjectCard key={index} meta={project} />
          ))}
        </div>
      </section>
    </BaseLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const projectSlugs = getProjectSlugs();

  return {
    props: {
      projects: projectSlugs,
    },
  };
};
