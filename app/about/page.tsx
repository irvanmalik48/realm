export default function Page() {
  return (
    <main className="min-h-screen w-full px-5 relative">
      <img
        src="/misc/lottie.svg"
        className="w-48 z-[6] absolute left-0 top-0 hidden lg:block"
      />
      <section className="max-w-4xl mx-auto py-48 relative">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-white w-full">
          Some <span className="text-teal-300">information</span> I'ma{" "}
          <span className="text-teal-300">give</span>.
        </h1>
        <h2 className="text-2xl mt-3 font-display text-white w-full">
          Shit I pretty much claim about myself, mostly.
        </h2>
        <figure className="mt-6 rounded-xl overflow-clip border-2 border-neutral-800">
          <div className="px-5 bg-neutral-800 bg-opacity-50 border-l-8 py-4 border-teal-300">
            <p className="font-display text-lg text-white w-full">
              "And those who were seen dancing were thought to be insane by
              those who could not hear the music."
            </p>
          </div>
          <figcaption className="font-poppins px-5 py-2 border-l-8 border-teal-500 bg-teal-300 bg-opacity-10 font-semibold text-sm text-teal-300">
            Friedrich Nietzsche
          </figcaption>
        </figure>
        <article className="prose prose-invert max-w-4xl mt-4 prose-headings:font-heading prose-headings:py-3 prose-headings:border-b-2 prose-headings:border-neutral-800 prose-headings:mt-0">
          <p>
            I've started programming since 2020 (2018 actually but that's mostly
            just buzzing around with stuffs) and I've been pretty much hooked up
            with it until now. You might find me annoying sometimes (if you know
            me or somehow make a contact with me in one of social media
            platforms where I simply exist) but that's what I tend to always do
            to just have fun. No offense given at all. And finally, GNU/Weeb is
            my place where I moderate and also contribute to nowadays.
          </p>
          <h2>About this website</h2>
          <p>
            This website is built using Next.js and Tailwind CSS. I've started
            this website since 2020 and I've been working on it until now. I've
            been learning a lot of things while working on this website
            including web development, design, and also best practices. Don't
            forget about ranting. Yeah I rant alot. Not alot but yeah, still
            frequent.
          </p>
          <p>
            This website has went through many evolutions. But since the last
            one broke stuffs and I've been too lazy to fix it, I've decided to
            start from scratch and make it better than before by using Next.js
            again after their Next.js 13 release announcement.
          </p>
          <h2>Things I like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <ul className="my-0">
              <li>Programming</li>
              <li>UI/UX Design</li>
              <li>Songwriting</li>
              <li>GNU/Linux</li>
            </ul>
            <ul className="my-0">
              <li>Caffeine</li>
              <li>Science</li>
              <li>Philosophy</li>
              <li>Trolling</li>
            </ul>
          </div>
          <h2>Tools I commonly use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <ul className="my-0">
              <li>VSCode</li>
              <li>Figma</li>
              <li>React</li>
              <li>Next.js</li>
            </ul>
            <ul className="my-0">
              <li>Tailwind CSS</li>
              <li>Typescript</li>
              <li>Linux</li>
              <li>Java</li>
            </ul>
          </div>
          <h2>Contacts</h2>
          <p>
            You can contact me through my social media accounts or through my
            email. I'm not really active on social media but I'll try to reply
            you as soon as possible.
          </p>
          <ul>
            <li>
              <a href="https://t.me/lappretard">Telegram</a>
            </li>
            <li>
              <a href="https://twitter.com/irvanmalik48">Twitter</a>
            </li>
            <li>
              <a href="https://instagram.com/irvann48_">Instagram</a>
            </li>
            <li>
              <a href="https://linkedin.com/in/irvanmalik48">LinkedIn</a>
            </li>
            <li>
              <a href="mailto:me@irvanma.me">Email</a>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
}
