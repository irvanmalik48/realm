import React from "react";

export default function Loading() {
  return (
    <>
      <img
        src="/misc/lottie.svg"
        className="w-48 absolute left-0 top-0 hidden lg:block"
      />
      <main className="min-h-screen relative grid grid-cols-1 gap-3 place-content-center mx-auto max-w-4xl px-5">
        <img src="/misc/loading.svg" className="w-20 h-20 mx-auto" />
        <h1 className="text-xl font-heading font-semibold text-white text-center">
          Loading...
        </h1>
      </main>
    </>
  );
}
