/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import DefaultLayout from "@components/DefaultLayout.tsx";
import { tw, css } from "@utils/twind.ts";
import ky from "ky";
import { JokesImage, JokesText, JokesType } from "@/types.d.tsx";

export const handler: Handlers<JokesType> = {
  async GET(req, ctx) {
    const includeParams = new URL(req.url).searchParams.get("type");
    const res: {
      text: JokesText;
      img: JokesImage;
    } = {
      text: await (
        await ky("https://candaan-api.vercel.app/api/text/random")
      ).json(),
      img: await (
        await ky("https://candaan-api.vercel.app/api/image/random")
      ).json(),
    };
    const cases = {
      _default: res,
      text: {
        text: res.text,
      },
      image: {
        img: res.img,
      },
    };

    const body: JokesType =
      includeParams !== null && includeParams !== "all"
        ? cases[includeParams as keyof typeof cases]
        : cases["_default"];

    if (res.text.status === 404 || res.img.status === 404) {
      return ctx.render(null);
    }

    return ctx.render(body);
  },
};

export default function Jokes(
  props: PageProps<{ text?: JokesText; img?: JokesImage }>
) {
  return (
    <DefaultLayout
      title="Jokes Indonesia"
      desc="Halaman lelucon (bapak-bapak) Indonesia."
    >
      <header
        className={tw`py-24 w-full flex flex-row justify-center items-center gap-5`}
      >
        <div className={tw`w-full flex flex-col justify-center items-center`}>
          <p
            className={tw`text-dark-text text-center font-bold text-4xl mb-10 font-heading`}
          >
            Generated Joke:
          </p>
          <div
            className={tw`w-full text-center flex flex-col gap-5 text-xl p-5 pt-3 bg-dark-accent-quartertrans rounded-xl text-dark-text box-border ${css(
              {
                "backdrop-filter": "blur(.5rem)",
              }
            )}`}
          >
            {props.data.text ? <TextJoke data={props.data.text} /> : ""}
            {props.data.img ? <ImageJoke data={props.data.img} /> : ""}
          </div>
        </div>
      </header>
    </DefaultLayout>
  );
}

function TextJoke(props: { data: JokesText | undefined }) {
  return (
    <div>
      <p
        className={tw`text-dark-text text-left font-bold text-xl mb-2 font-heading`}
      >
        Text:
      </p>
      <p
        className={tw`text-dark-text text-center px-5 py-3 text-lg bg-dark-accent-semitrans rounded-xl`}
      >
        {props?.data?.data}
      </p>
    </div>
  );
}

function ImageJoke(props: { data: JokesImage | undefined }) {
  return (
    <div>
      <p
        className={tw`text-dark-text text-left font-bold text-xl mb-2 font-heading`}
      >
        Image:
      </p>
      <img
        className={tw`w-full h-[500px] object-contain bg-dark-superdark transition-all duration-200 ease-linear ring ring-transparent hover:ring-dark-accent-solid rounded-xl`}
        src={props?.data?.data.url}
        alt="joke"
      />
    </div>
  );
}
