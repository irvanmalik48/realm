/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Sidebar from "../islands/Sidebar.tsx";
import Nav from "../islands/Nav.tsx";
import { css } from "twind/css";

export default function DefaultLayout(props: {
  children: h.JSX.Element | h.JSX.Element[];
}) {
  return (
    <main class={tw`bg-dark-bg w-screen gap-0 md:grid md:grid-cols-root`}>
      <Nav />
      <Sidebar />
      <section
        class={tw`sticky top-0 w-full px-4 md:px-6 lg:px-12 xl:px-24 py-4 text-dark-text h-screen overflow-y-auto ${css(
          {
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }
        )}`}
      >
        {props.children}
      </section>
    </main>
  );
}
