/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import DefaultLayout from "@components/DefaultLayout.tsx";
import { tw } from "@utils/twind.ts";
import { css } from "twind/css";
import { JokesType } from "@/types.d.tsx";

export const handler: Handlers<JokesType | null> = {
  async GET(_req, ctx) {
    const res = await fetch("https://candaan-api.vercel.app/api/text/random");
    const body: JokesType = await res.json();

    if (res.status === 404) {
      return ctx.render(null);
    }

    return ctx.render(body);
  },
};

export default function Jokes(props: PageProps<JokesType>) {
  return (
    <DefaultLayout
      title="Jokes Indonesia"
      desc="Halaman lelucon (bapak-bapak) Indonesia."
    >
      <header
        className={tw`py-24 w-full flex flex-row justify-center items-center gap-5`}
      >
        <div className={tw`flex flex-col justify-center items-center`}>
          <p
            className={tw`text-dark-text text-center font-bold text-4xl mb-2 font-heading`}
          >
            Generated Joke:
          </p>
          <p
            className={tw`w-full text-center text-xl px-5 py-3 bg-dark-accent-quartertrans rounded-xl text-dark-text box-border ${css(
              {
                "backdrop-filter": "blur(.5rem)",
              }
            )}`}
          >
            {props.data.data}
          </p>
        </div>
      </header>
    </DefaultLayout>
  );
}
