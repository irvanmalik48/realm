import { FAB } from "c/FAB";
import { Footer } from "c/Footer";
import Head from "next/head";
import React from "react";
import "s/globals.css";

export default function NotFound() {
  return (
    <div className="bg-neutral-900 w-full px-5 relative">
      <Head>
        <title>Realm | 404</title>
      </Head>
      <img
        src="/misc/lottie.svg"
        className="w-48 absolute left-0 top-0 hidden lg:block"
      />
      <main className="min-h-screen relative grid grid-cols-1 gap-3 place-content-center mx-auto max-w-4xl px-5">
        <h1 className="text-7xl w-fit justify-self-center self-center font-heading px-10 py-5 rounded-xl border-2 border-neutral-800 text-white font-bold">
          4<span className="text-teal-300">0</span>4
        </h1>
        <h2 className="text-lg font-display text-white text-center">
          Page not found or still in construction.
        </h2>
      </main>
      <FAB />
    </div>
  );
}
