import { AtSign, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-neutral-800 via-transparent to-transparent border-t border-neutral-700 pt-4 pb-12 mt-24 flex justify-center items-center">
      <div className="w-full px-4 flex justify-between items-center">
        <p className="text-neutral-200 text-sm w-full">
          Copyright © 2023 Irvan Malik Azantha.
          <span className="block">
            Built with{" "}
            <a
              href="https://rakkasjs.org"
              className="text-red-400 hover:text-neutral-200 underline transition"
            >
              Rakkas
            </a>{" "}
            and{" "}
            <a
              href="https://tailwindcss.com"
              className="text-red-400 hover:text-neutral-200 underline transition"
            >
              Tailwind
            </a>
            , deployed on{" "}
            <a
              href="https://netlify.com"
              className="text-red-400 hover:text-neutral-200 underline transition"
            >
              Netlify
            </a>
            .
          </span>
        </p>
      </div>
      <div className="flex px-4 gap-1 items-center">
        <a
          href="https://linkedin.com/in/irvanmalik48"
          className="nav-item rounded-full"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="https://twitter.com/irvanmalik48"
          className="nav-item rounded-full"
          aria-label="Twitter Profile"
        >
          <Twitter size={18} />
        </a>
        <a
          href="https://github.com/irvanmalik48"
          className="nav-item rounded-full"
          aria-label="Github Profile"
        >
          <Github size={18} />
        </a>
        <a
          href="mailto:irvanmalik48@gmail.com"
          className="nav-item rounded-full"
          aria-label="Email Handle"
        >
          <AtSign size={18} />
        </a>
      </div>
    </footer>
  );
}
