import {
  AtSign,
  Github,
  Instagram,
  Linkedin,
  Send,
  Twitter,
} from "lucide-solid";

export default function Footer() {
  return (
    <footer class="w-full bg-gradient-to-b from-neutral-800 via-transparent to-transparent border-t border-neutral-700 pt-4 pb-28 md:pb-12 mt-24 flex flex-col-reverse md:flex-row gap-4 lg:gap-0 justify-center items-center">
      <div class="w-full px-4 flex justify-between items-center">
        <p class="text-neutral-200 text-center md:text-left text-sm w-full">
          Copyright © 2023 Irvan Malik Azantha.
          <span class="block">
            Built with{" "}
            <a
              href="https://astro.build/"
              class="text-red-400 hover:text-neutral-200 underline transition"
            >
              Astro
            </a>{" "}
            and{" "}
            <a
              href="https://tailwindcss.com"
              class="text-red-400 hover:text-neutral-200 underline transition"
            >
              Tailwind
            </a>
            , deployed on{" "}
            <a
              href="https://vercel.com"
              class="text-red-400 hover:text-neutral-200 underline transition"
            >
              Vercel
            </a>
            .
          </span>
        </p>
      </div>
      <div class="flex px-4 gap-1 items-center">
        <a
          href="https://linkedin.com/in/irvanmalik48"
          class="nav-item rounded-full"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="https://twitter.com/irvanmalik48"
          class="nav-item rounded-full"
          aria-label="Twitter Profile"
        >
          <Twitter size={18} />
        </a>
        <a
          href="https://github.com/irvanmalik48"
          class="nav-item rounded-full"
          aria-label="Github Profile"
        >
          <Github size={18} />
        </a>
        <a
          href="https://instagram.com/irvann48_"
          class="nav-item rounded-full"
          aria-label="Instagram Profile"
        >
          <Instagram size={18} />
        </a>
        <a
          href="https://t.me/lappretard"
          class="nav-item rounded-full"
          aria-label="Telegram Profile"
        >
          <Send size={18} />
        </a>
        <a
          href="mailto:irvanmalik48@gmail.com"
          class="nav-item rounded-full"
          aria-label="Email Handle"
        >
          <AtSign size={18} />
        </a>
      </div>
    </footer>
  );
}
