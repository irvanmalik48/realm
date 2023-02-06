import ProviderButtons from "c/ProviderButtons";

export default async function Page() {

  return (
    <main className="min-h-screen w-full px-5 relative">
      <img
        src="/misc/lottie.svg"
        className="w-48 z-[6] absolute left-0 top-0 hidden lg:block"
      />
      <section className="max-w-4xl mx-auto py-48 relative">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-white w-full">
          Authenticate <span className="text-teal-300">yourself</span>
        </h1>
        <h2 className="text-2xl mt-3 font-display text-white w-full mb-5">
          I give you two choices. You choose.
        </h2>
        <div className="grid grid-cols-2 gap-5">
          <ProviderButtons />
        </div>
        <article className="prose prose-invert max-w-full mt-5">
          <p>
            A little bit of disclaimer. I don't collect any data from you. I
            don't store any data about you. I don't even know who you are.
          </p>
          <p>
            This is just a simple authentication system so that you can use the
            comment section and some more functions I might add to this blog.
          </p>
        </article>
      </section>
    </main>
  );
}
