import Image from "next/image";
import BaseLayout from "../components/layouts/BaseLayout";

const slug = {
  title: "About",
  description: "IrvanMA's little secrets.",
};

export default function About(props: any) {
  return (
    <BaseLayout {...slug}>
      <section className="w-full min-h-screen grid place-content-center place-items-center gap-5 py-24 container-responsive">
        <section className="min-h-full px-5 py-2 flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="rounded-full w-fit hover:before:bg-red-400 hover:before:bg-opacity-40 before:rounded-full transition before:transition ring-2 ring-red-400 ring-opacity-50 hover:ring-opacity-100 stack before:absolute before:inset-0 before:bg-gray-700">
            <Image
              className="rounded-full"
              src="https://github.com/irvanmalik48.png"
              width={200}
              height={200}
              alt="Profile Picture"
            />
          </div>
          <div className="flex flex-col items-center lg:items-start gap-3">
            <p className="w-fit text-4xl font-bold border-b-2 border-red-400 border-opacity-50">
              About Me
            </p>
            <p className="text-lg">Things about me.</p>
          </div>
        </section>
        <div className="prose prose-invert max-w-none prose-headings:font-helvetica prose-headings:text-gray-200 prose-p:text-gray-200 prose-a:text-red-400 prose-code:text-gray-200">
          <h2>Description</h2>
          <p>
            Hello, my name&apos;s Irvan Malik Azantha. I&apos;m a 19 y&apos;o
            man currently studying on Universitas Sriwijaya. I live in
            Palembang, Indonesia. I&apos;m a self taught developer that loves to
            learn new things.
          </p>
          <p>
            I&apos;ve started programming since 2020 (2018 actually but
            that&apos;s mostly just buzzing around with stuffs) and I&apos;ve
            been pretty much hooked up with it until now. You might find me
            annoying sometimes (if you know me or somehow make a contact with me
            in one of social media platforms where I simply exist) but
            that&apos;s what I tend to always do to just have fun. No offense
            given at all. And finally,{" "}
            <a href="https://t.me/gnuweeb">GNU/Weeb</a> is my place where I
            moderate and also contribute to nowadays.
          </p>
          <h2>About This Website</h2>
          <p>
            This website is built using{" "}
            <a href="https://nextjs.org/">Next.js</a> and{" "}
            <a href="https://tailwindcss.com/">Tailwind CSS</a>. I&apos;ve
            started this website since 2020 and I&apos;ve been working on it
            until now. I&apos;ve been learning a lot of things while working on
            this website including web development, design, and also best
            practices. <s>Don&apos;t forget about ranting. Yeah I rant alot</s>.
            Not alot but yeah, still frequent.
          </p>
          <p>
            This website has went through many evolutions. But since the last
            one broke stuffs and I&apos;ve been too lazy to fix it, I&apos;ve
            decided to start from scratch and make it better than before by
            using Next.js again after their{" "}
            <a href="https://nextjs.org/blog/next-13">
              Next.js 13 release announcement
            </a>
            .
          </p>
          <h2>Things I Like</h2>
          <div className="grid md:grid-cols-2">
            <ul className="mb-0 pb-0">
              <li>Programming</li>
              <li>Design</li>
              <li>Music</li>
              <li>GNU/Linux</li>
            </ul>
            <ul className="mt-0 pt-0">
              <li>Coffee</li>
              <li>Tea</li>
              <li>Philosophy</li>
              <li>Science</li>
            </ul>
          </div>
          <h2>Tools I Commonly Use</h2>
          <div className="grid md:grid-cols-2">
            <ul>
              <li className="mb-0 pb-0">
                <a href="https://code.visualstudio.com/">Visual Studio Code</a>
              </li>
              <li>
                <a href="https://www.figma.com/">Figma</a>
              </li>
              <li>
                <a href="https://reactjs.org/">React</a>
              </li>
              <li>
                <a href="https://nextjs.org/">Next.js</a>
              </li>
            </ul>
            <ul>
              <li className="mt-0 pt-0">
                <a href="https://tailwindcss.com/">Tailwind CSS</a>
              </li>
              <li>
                <a href="https://www.typescriptlang.org/">Typescript</a>
              </li>
              <li>
                <a href="https://www.linux.org/">Linux</a>
              </li>
              <li>
                <a href="https://www.java.com/">Java</a>
              </li>
            </ul>
          </div>
          <h2>Contact Me</h2>
          <p>
            You can contact me on my social media platforms or you can send me
            an email. I&apos;ll try to reply as soon as possible. Listed below
            are the options to choose from.
            <ul>
              <li>
                <a href="https://t.me/irvanmalik48">Telegram</a>
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
          </p>
        </div>
      </section>
    </BaseLayout>
  );
}
