"use client";

import useSWR from "swr";
import React from "react";
import { ProjectCard } from "c/ProjectCard";
import { ProjectCardProps } from "t/types";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

async function fetcher(url: string) {
  return await fetch(url).then((res) => res.json());
}

export function Projects(props: { sliced?: boolean }) {
  const { data, error } = useSWR("/api/projects", fetcher);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence initial={false}>
        {data ? (
          <m.section
            key={"data"}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, delay: 0.5 }}
          >
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
          </m.section>
        ) : error ? (
          <m.section
            key={"error"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Error />
          </m.section>
        ) : (
          <m.section
            key={"loading"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Loading />
          </m.section>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

function Error() {
  return (
    <section className="h-80 rounded-xl border-2 border-neutral-800 col-span-2 place-content-center grid grid-cols-1">
      <h1 className="text-4xl font-heading font-semibold text-white text-center">
        Error loading entries.
      </h1>
    </section>
  );
}

function Loading() {
  return (
    <section className="h-80 rounded-xl border-2 border-neutral-800 col-span-2 place-content-center grid grid-cols-1">
      <img src="/misc/loading.svg" className="w-20 h-20 mx-auto" />
      <h1 className="text-xl font-heading font-semibold text-white text-center">
        Loading entries...
      </h1>
    </section>
  );
}
