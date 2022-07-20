/** @jsx h */
import { h } from "preact";
import { UnknownPageProps } from "$fresh/server.ts";
import DefaultLayout from "../components/DefaultLayout.tsx";
import { tw } from "../utils/twind.ts";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <DefaultLayout title="Page not found" desc="The page you're looking for is not found.">
    <header
      class={tw`py-24 w-full flex flex-row justify-center items-center gap-5`}
    >
      <div class={tw`flex flex-col justify-center items-center`}>
        <p class={tw`text-dark-text text-center font-bold text-3xl`}>
          404
        </p>
        <p class={tw`w-full text-center text-dark-accent-solid text-lg`}>
          Page <strong>{url.pathname}</strong> not found.
        </p>
      </div>
    </header>
  </DefaultLayout>
    );
}