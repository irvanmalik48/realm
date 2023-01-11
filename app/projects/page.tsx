import { Projects } from "c/Projects";

export default function Page() {
  return (
    <main className="min-h-screen w-full px-5 relative">
      <img
        src="/misc/lottie.svg"
        className="w-48 absolute left-0 top-0 hidden lg:block"
      />
      <section className="max-w-4xl mx-auto py-48 relative">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-white w-full">
          All <span className="text-teal-300">projects</span> I've{" "}
          <span className="text-teal-300">done</span>.
        </h1>
        <h2 className="text-2xl mt-3 font-display text-white w-full">
          Well, I gotta still do something, ain't I?
        </h2>
        <Projects sliced={false} />
        <p className="text-2xl mt-12 font-heading text-center font-semibold text-white w-full">
          Not satisfied enough? Wait 'til I got more stuffs to make.
        </p>
      </section>
    </main>
  );
}
