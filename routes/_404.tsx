import { UnknownPageProps } from "$fresh/server.ts";
import NotFoundPageFound from "@/routes/blooper.tsx";
import DefaultLayout from "@components/DefaultLayout.tsx";
import { tw } from "@utils/twind.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  if (url.pathname === "/404") return <NotFoundPageFound />;
  else {
    return (
      <DefaultLayout
        title="Page not found"
        desc="The page you're looking for is not found."
        active="404 not found"
      >
        <header
          className={tw`py-24 w-full flex flex-row justify-center items-center gap-5`}
        >
          <div className={tw`flex flex-col justify-center items-center`}>
            <p
              className={tw`text-dark-text text-center font-bold text-4xl mb-2 font-heading`}
            >
              404
            </p>
            <p
              className={tw`w-full text-center text-dark-accent-solid text-lg`}
            >
              Page{" "}
              <code
                className={tw`font-mono bg-dark-accent-quartertrans text-sm text-dark-accent-solid font-semibold px-2.5 py-0.5 my-1 rounded-3xl`}
              >
                {url.pathname}
              </code>{" "}
              not found.
            </p>
          </div>
        </header>
      </DefaultLayout>
    );
  }
}
