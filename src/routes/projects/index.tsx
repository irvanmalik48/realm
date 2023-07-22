import { component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import { Image } from "~/components/image/image";
import { PROJECT_CONSTANTS } from "~/data/projects/constants";
import { LuGitBranch, LuExternalLink } from "@qwikest/icons/lucide";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const projects = PROJECT_CONSTANTS;

  return (
    <>
      <section class="w-full max-w-4xl px-5 py-24 mx-auto min-h-screen relative">
        <h1 class="text-3xl md:text-5xl lg:text-6xl w-full mt-24 font-medium font-heading">
          Projects
        </h1>
        <p class="mt-5 text-neutral-300 text-lg">All that I've done.</p>
        <input
          type="text"
          placeholder="Search projects..."
          class={twMerge(
            "mt-10 bg-neutral-900 rounded-full w-full px-5 py-3",
            "focus:bg-neutral-800 text-neutral-300 placeholder-neutral-400",
            "placeholder:italic focus:outline-none focus:ring-2",
            "focus:ring-cyan-500 transition my-5"
          )}
        />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              class="bg-neutral-900 text-neutral-300 rounded-xl overflow-hidden"
            >
              <div class="w-full p-5">
                <h2
                  class={twMerge(
                    "font-mono text-neutral-100 font-medium px-5 py-2",
                    "rounded-full bg-opacity-50 bg-neutral-950 w-fit",
                    "mx-auto text-center truncate"
                  )}
                >
                  {project.title}
                </h2>
                <p class="mt-3 text-neutral-300 line-clamp-3 min-h-[72px]">
                  {project.description}
                </p>
                <p class="text-neutral-400"></p>
              </div>
              <div class="p-5 pt-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  class={twMerge(
                    "w-full aspect-video ring ring-neutral-800 grayscale",
                    "hover:grayscale-0 transition rounded-lg object-cover",
                    "hover:ring-cyan-500"
                  )}
                  width={1920}
                  height={1080}
                />
              </div>
              <div
                class={twMerge(
                  "flex bg-neutral-950 bg-opacity-50 justify-stretch",
                  "w-full divide-x divide-neutral-900 items-center"
                )}
              >
                <a
                  href={project.links.github}
                  title={`View ${project.title}'s repository on GitHub`}
                  target="_blank"
                  class={twMerge(
                    "w-full flex items-center justify-center gap-3",
                    "p-3.5 transition text-sm hover:bg-neutral-800"
                  )}
                >
                  <LuGitBranch class="w-5 h-5" />
                  <span>View repo</span>
                </a>
                {project.links.deployed && (
                  <a
                    href={project.links.deployed}
                    title={`View ${project.title} - ${project.deployment}`}
                    target="_blank"
                    class={twMerge(
                      "w-full flex items-center justify-center",
                      "gap-3 p-3.5 transition text-sm hover:bg-neutral-800"
                    )}
                  >
                    <LuExternalLink class="w-5 h-5" />
                    <span>View site</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <p
          class={twMerge(
            "text-neutral-300 text-opacity-80 text-sm",
            "w-full mt-10 text-center font-medium"
          )}
        >
          To be fair, I actually have a lot more projects than this. Lemme just
          try to get them together first.
        </p>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Projects",
  meta: [
    {
      name: "description",
      content: "Projects I've made",
    },
    {
      name: "og:title",
      content: "Projects",
    },
    {
      name: "og:description",
      content: "Projects I've made",
    },
  ],
};
