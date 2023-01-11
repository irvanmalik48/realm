import { ProjectCard } from "c/ProjectCard";
import { ProjectCardProps } from "t/types";
import { getSortedProjectSlugs } from "u/projects";

export function Projects(props: { sliced?: boolean }) {
  const data = getSortedProjectSlugs();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      {props.sliced === true
        ? data
            .slice(0, 2)
            .map((post: ProjectCardProps) => (
              <ProjectCard
                key={post.slug}
                title={post.title}
                tag={post.tag}
                slug={post.slug}
                desc={post.desc}
                link={post.link}
                gh={post.gh}
                screenshot={post.screenshot}
              />
            ))
        : data.map((post: ProjectCardProps) => (
            <ProjectCard
              key={post.slug}
              title={post.title}
              tag={post.tag}
              slug={post.slug}
              desc={post.desc}
              link={post.link}
              gh={post.gh}
              screenshot={post.screenshot}
            />
          ))}
    </section>
  );
}
