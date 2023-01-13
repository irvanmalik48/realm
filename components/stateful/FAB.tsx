"use client";

import { useState } from "react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HomeFill from "c/HomeFill";
import PagesFill from "c/PagesFill";
import WorkFill from "c/WorkFill";
import InfoFill from "c/InfoFill";
import ArrowUpwardFill from "c/ArrowUpwardFill";
import AddCircleFill from "c/AddCircleFill";

export function FAB() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              className="fixed top-1/2 right-5 lg:right-10 flex flex-col items-end gap-4 rounded-xl origin-right z-30 ease-out group"
              initial={{ opacity: 0, x: 100, y: "-50%" }}
              animate={{ opacity: 1, x: 0, y: "-50%" }}
              exit={{ opacity: 0, x: 100, y: "-50%" }}
              transition={{ duration: 0.1, type: "spring", stiffness: 50 }}
            >
              <Link
                href="/"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex flex-row gap-5 items-center group-hover:opacity-80 group-hover:hover:opacity-100 group-hover:hover:scale-110 transition group-hover:active:scale-90"
              >
                <p className="text-white">Home</p>
                <HomeFill
                  className="block fill-neutral-900 bg-teal-300 rounded-xl p-3"
                  size="24px"
                />
              </Link>
              <Link
                href="/posts"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex flex-row gap-5 items-center group-hover:opacity-80 group-hover:hover:opacity-100 group-hover:hover:scale-110 transition group-hover:active:scale-90"
              >
                <p className="text-white">Posts</p>
                <PagesFill
                  className="block fill-neutral-900 bg-teal-300 rounded-xl p-3"
                  size="24px"
                />
              </Link>
              <Link
                href="/projects"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex flex-row gap-5 items-center group-hover:opacity-80 group-hover:hover:opacity-100 group-hover:hover:scale-110 transition group-hover:active:scale-90"
              >
                <p className="text-white">Projects</p>
                <WorkFill
                  className="block fill-neutral-900 bg-teal-300 rounded-xl p-3"
                  size="24px"
                />
              </Link>
              <Link
                href="/about"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex flex-row gap-5 items-center group-hover:opacity-80 group-hover:hover:opacity-100 group-hover:hover:scale-110 transition group-hover:active:scale-90"
              >
                <p className="text-white">About</p>
                <InfoFill
                  className="block fill-neutral-900 bg-teal-300 rounded-xl p-3"
                  size="24px"
                />
              </Link>
              <m.button
                className="flex flex-row gap-5 items-center group-hover:opacity-80 group-hover:hover:opacity-100 group-hover:hover:scale-110 transition group-hover:active:scale-90"
                onClick={(e) => {
                  e.preventDefault();
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                  setIsOpen(false);
                }}
              >
                <p className="text-white">Back to top</p>
                <ArrowUpwardFill
                  className="block fill-neutral-900 bg-teal-300 rounded-xl p-3"
                  size="24px"
                />
              </m.button>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
      <button
        className="fixed block overflow-y-hidden bottom-5 lg:bottom-10 right-5 lg:right-10 p-4 bg-teal-300 rounded-xl hover:scale-110 transition active:scale-90 z-20"
        onClick={toggle}
        id="fab-button"
        aria-labelledby="fab-button-label"
      >
        <span id="fab-button-label" className="sr-only">
          Open FAB menu
        </span>
        <AddCircleFill
          className={`${
            isOpen ? "rotate-45" : ""
          } block fill-neutral-900 transition overflow-hidden`}
          size="28px"
        />
      </button>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              className="fixed inset-0 bg-neutral-900 bg-opacity-90 z-10"
              onClick={toggle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
}
