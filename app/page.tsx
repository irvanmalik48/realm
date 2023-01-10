import Icon from "react-material-symbols/rounded";
import { Posts } from "c/Posts";
import { Projects } from "c/Projects";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen w-full px-5 relative">
      <img
        src="/misc/lottie.svg"
        className="w-48 absolute left-0 top-0 hidden lg:block"
      />
      <section className="max-w-4xl min-h-screen place-content-center mx-auto grid grid-cols-1 relative">
        <h1 className="text-4xl text-center md:text-start md:text-5xl lg:text-7xl font-heading font-semibold text-white w-full">
          Cope, seethe, mald, dilate, and{" "}
          <span className="text-teal-300">repeat</span>.
        </h1>
        <h2 className="text-2xl mt-3 text-center md:text-start font-display text-white w-full">
          Irvan Malik Azantha's personal blog.
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-start mt-7 gap-3">
          <a
            href="#self-intro"
            className="flex flex-row justify-start items-center w-fit pl-2 pr-9 py-2 font-semibold text-lg bg-teal-300 hover:scale-110 active:scale-90 transition ease-out rounded-full"
          >
            <Icon
              icon="check"
              size={18}
              fill
              className="block p-2 rounded-full bg-neutral-900 text-white mr-5"
            />
            I've coped enough, let me in
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            className="block w-fit px-7 py-2 text-lg text-white text-opacity-50 hover:text-opacity-100 transition ease-out rounded-full"
          >
            Cry about it instead
          </a>
        </div>
      </section>
      <section
        id="self-intro"
        className="max-w-4xl min-h-screen place-content-center mx-auto grid grid-cols-1 relative"
      >
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/misc/intro-hero.webp"
            type="image/webp"
          />
          <source srcSet="/misc/intro-hero-mobile.webp" type="image/webp" />
          <img
            src="/misc/intro-hero.webp"
            alt="lmao photos"
            className="rounded-xl border-2 border-neutral-800"
          />
        </picture>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-semibold mt-4 text-white w-full">
          Little bit of <span className="text-teal-300">intro</span>.
        </h1>
        <h2 className="text-2xl mt-3 font-display text-white w-full">
          I'll let y'all know me first.
        </h2>
        <p className="text-neutral-300 mt-3">
          Hello, I'm{" "}
          <strong className="text-teal-300">Irvan Malik Azantha</strong>. A
          result-oriented programmer with 2 years of experience in creating and
          maintaining web development projects. Highly ambitious and logical.
          Very interested in open source technology and related project
          developments. Skilled at web development and UI/UX designing.
        </p>
        <p className="text-teal-300 font-heading font-bold mt-3">
          Yes, you can just scroll down. Don't be a lazy bum.
        </p>
      </section>
      <section className="max-w-4xl mx-auto grid grid-cols-1 relative min-h-screen place-content-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-white w-full">
          I regularly <span className="text-teal-300">post</span> about{" "}
          <span className="text-teal-300">something</span>.
        </h1>
        <h2 className="text-2xl mt-3 font-display text-white w-full">
          Yes, you read that right.
        </h2>
        <Posts sliced={true} />
        <div className="flex flex-row justify-end items-center">
          <Link
            href="/posts"
            scroll={true}
            className="text-white text-opacity-50 hover:text-opacity-100 mt-3 group transition ease-out flex flex-row gap-2 justify-center items-center"
          >
            Show more posts
            <Icon
              icon="arrow_forward"
              size={18}
              fill
              className="block bg-white opacity-50 group-hover:opacity-100 text-neutral-900 p-1 rounded-full transition"
            />
          </Link>
        </div>
      </section>
      <section className="max-w-4xl mx-auto grid grid-cols-1 relative min-h-screen place-content-center mt-12 md:mt-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-white w-full">
          I also regularly <span className="text-teal-300">make</span>{" "}
          something.
        </h1>
        <h2 className="text-2xl mt-3 font-display text-white w-full">
          It's useful for me, so sure.
        </h2>
        <Projects sliced={true} />
        <div className="flex flex-row justify-end items-center">
          <Link
            href="/projects"
            scroll={true}
            className="text-white text-opacity-50 hover:text-opacity-100 mt-3 group transition ease-out flex flex-row gap-2 justify-center items-center"
          >
            Show more projects
            <Icon
              icon="arrow_forward"
              size={18}
              fill
              className="block bg-white opacity-50 group-hover:opacity-100 text-neutral-900 p-1 rounded-full transition"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
