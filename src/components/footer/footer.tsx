import { component$ } from "@builder.io/qwik";
import { FooterTop } from "../footer-top/footer-top";

export default component$(() => {
  return (
    <>
      <FooterTop class="w-full" />
      <footer class="w-full px-5 pt-2 pb-4 bg-neutral-900 bg-opacity-20 text-neutral-100">
        <div class="mx-auto max-w-4xl flex flex-col gap-1 items-center">
          <p class="text-center text-sm rounded-full px-5 py-1 leading-sm mb-2 bg-neutral-900 font-heading">
            <span class="text-neutral-300">© 2023 Irvan Malik Azantha</span>
          </p>
          <p class="text-center text-sm">
            <span class="text-neutral-300">
              Made with
              <a
                href="https://qwik.builder.io"
                class="mx-1 text-neutral-300 hover:text-neutral-100"
              >
                Qwik
              </a>
              and
              <a
                href="https://tailwindcss.com"
                class="ml-1 text-neutral-300 hover:text-neutral-100"
              >
                Tailwind
              </a>
            </span>
            <span class="mx-4 text-neutral-300">|</span>
            <span class="text-neutral-300">Hosted on</span>
            <a
              href="https://vercel.com"
              class="mx-1 text-neutral-300 hover:text-neutral-100"
            >
              Vercel
            </a>
            <span class="mx-4 text-neutral-300">|</span>
            <span class="text-neutral-300">Powered by coffee and anime</span>
          </p>
        </div>
      </footer>
    </>
  );
});
