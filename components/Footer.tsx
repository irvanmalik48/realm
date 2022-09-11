import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
  TwitterIcon,
} from "@components/Icons.tsx";
import { tw } from "@utils/twind.ts";

export default function Footer() {
  return (
    <footer
      className={tw`flex flex-col gap-0 mt-4 justify-center items-center`}
    >
      <div className={tw`mb-5 flex flex-row flex-wrap gap-2 justify-center items-center`}>
        <a
          href="https://github.com/irvanmalik48"
          className={tw`flex flex-row justify-start items-center gap-4`}
          aria-label="GitHub"
        >
          <div
            className={tw`flex justify-center items-center bg-transparent text-dark-text w-[fit-content] p-3 rounded-xl hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <GitHubIcon />
          </div>
        </a>
        <a
          href="https://facebook.com/irvanmalik48"
          className={tw`flex flex-row justify-start items-center gap-4`}
          aria-label="Facebook"
        >
          <div
            className={tw`flex justify-center items-center bg-transparent text-dark-text w-[fit-content] p-3 rounded-xl hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <FacebookIcon />
          </div>
        </a>
        <a
          href="https://instagram.com/irvann48_"
          className={tw`flex flex-row justify-start items-center gap-4`}
          aria-label="Instagram"
        >
          <div
            className={tw`flex justify-center items-center bg-transparent text-dark-text w-[fit-content] p-3 rounded-xl hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <InstagramIcon />
          </div>
        </a>
        <a
          href="https://twitter.com/irvanmalik48"
          className={tw`flex flex-row justify-start items-center gap-4`}
          aria-label="Twitter"
        >
          <div
            className={tw`flex justify-center items-center bg-transparent text-dark-text w-[fit-content] p-3 rounded-xl hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <TwitterIcon />
          </div>
        </a>
        <a
          href="https://t.me/lapprealm"
          className={tw`flex flex-row justify-start items-center gap-4`}
          aria-label="Telegram"
        >
          <div
            className={tw`flex justify-center items-center bg-transparent text-dark-text w-[fit-content] p-3 rounded-xl hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <TelegramIcon />
          </div>
        </a>
        <a
          href="https://linkedin.com/in/irvanmalik48"
          className={tw`flex flex-row justify-start items-center gap-4`}
          aria-label="LinkedIn"
        >
          <div
            className={tw`flex justify-center items-center bg-transparent text-dark-text w-[fit-content] p-3 rounded-xl hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <LinkedInIcon />
          </div>
        </a>
        <a
          href="mailto:irvanma@gnuweeb.org"
          className={tw`flex flex-row justify-start items-center gap-4`}
          aria-label="Email"
        >
          <div
            className={tw`flex justify-center items-center bg-transparent text-dark-text w-[fit-content] p-3 rounded-xl hover:rounded-3xl hover:bg-dark-accent-solid hover:text-dark-nav transition-all duration-300`}
          >
            <MailIcon />
          </div>
        </a>
      </div>
      <p className={tw`text-dark-footertext text-sm m-0 p-0 mb-5`}>
        This website is deployed in Deno Deploy and made with...
      </p>
    </footer>
  );
}
