export default function Page() {
  return (
    <main className="min-h-screen w-full px-5 relative">
      <img
        src="/misc/lottie.svg"
        className="w-48 z-[6] absolute left-0 top-0 hidden lg:block"
      />
      <section className="max-w-4xl mx-auto py-48 relative">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-white w-full">
          Jadwal <span className="text-teal-300">Kuliah</span>
        </h1>
        <h2 className="text-2xl mt-3 font-display text-white w-full">
          This is just some normal subheading. Please ignore.
        </h2>
        <figure className="mt-6 rounded-xl overflow-clip border-2 border-neutral-800">
          <div className="px-5 bg-neutral-800 bg-opacity-50 border-l-8 py-4 border-teal-300">
            <p className="font-display text-lg text-white w-full">
              "The roots of education are bitter, but the fruit is sweet."
            </p>
          </div>
          <figcaption className="font-poppins px-5 py-2 border-l-8 border-teal-500 bg-teal-300 bg-opacity-10 font-semibold text-sm text-teal-300">
            Aristotle
          </figcaption>
        </figure>
      </section>
    </main>
  );
}
