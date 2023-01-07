"use client";

import { useState } from "react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import Icon from "react-material-symbols/rounded";
import Link from "next/link";

export function FAB() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              className="fixed top-1/2 right-5 lg:right-10 flex flex-col items-end gap-4 rounded-xl origin-right z-20 ease-out group"
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
                <Icon
                  icon="home"
                  size={24}
                  fill
                  className="block text-neutral-900 bg-teal-300 rounded-xl p-3"
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
                <Icon
                  icon="pages"
                  size={24}
                  fill
                  className="block text-neutral-900 bg-teal-300 rounded-xl p-3"
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
                <Icon
                  icon="work"
                  size={24}
                  fill
                  className="block text-neutral-900 bg-teal-300 rounded-xl p-3"
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
                <Icon
                  icon="info"
                  size={24}
                  fill
                  className="block text-neutral-900 bg-teal-300 rounded-xl p-3"
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
                <Icon
                  icon="arrow_upward"
                  size={24}
                  fill
                  className="block leading-none text-neutral-900 bg-teal-300 rounded-xl p-3"
                />
              </m.button>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
      <button
        className="fixed block box-content w-[28px] h-[28px] bottom-5 lg:bottom-10 right-5 lg:right-10 p-4 bg-teal-300 rounded-xl hover:scale-110 transition active:scale-90 z-20"
        onClick={toggle}
      >
        <Icon
          icon="add_circle"
          size={28}
          fill
          className={`${
            isOpen ? "rotate-45" : ""
          } block text-neutral-900 transition`}
          as="i"
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
