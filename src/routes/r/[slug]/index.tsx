import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { Waves } from "~/components/waves/waves";
import { REDIRECT_CONSTANTS } from "~/data/redirects/constants";

async function sleep(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

export const useLoader = routeLoader$(async ({ params, status }) => {
  const { slug } = params;

  const redirectData = REDIRECT_CONSTANTS.find((item) => item.name === slug);

  if (!redirectData) {
    status(420);
  }

  return redirectData;
});

export default component$(() => {
  const redirectData = useLoader();

  useVisibleTask$(async () => {
    if (redirectData.value) {
      await sleep(2);
      window.location.href = redirectData.value.value.link;
    }
  });

  return (
    <>
      <section class="w-full py-24 grid grid-cols-1 place-content-center min-h-screen relative">
        <div class="max-w-4xl w-full mx-auto px-5">
          <h1 class="w-full text-neutral-100 font-semibold font-heading text-4xl md:text-5xl">
            {redirectData.value?.value.provider
              ? `Redirecting to ${redirectData.value.value.provider}...`
              : "No redirect found"}
          </h1>
          <p class="w-full text-neutral-300 text-lg md:text-2xl mt-5 pb-10">
            {redirectData.value ? (
              <>
                Redirecting to {redirectData.value.value.provider} in 2 seconds.
                If you are not redirected, click{" "}
                <a
                  href={redirectData.value.value.link}
                  class="text-neutral-300 hover:text-neutral-100 transition underline"
                  title={`${redirectData.value.value.provider} Link`}
                >
                  here
                </a>
                .
              </>
            ) : (
              <>
                Seems like there's no redirect data to be found. Please submit a
                PR to{" "}
                <a
                  href="https://github.com/irvanmalik48/realm"
                  class="text-neutral-300 hover:text-neutral-100 transition underline"
                  title={`GitHub Repository Link`}
                >
                  this website's repository
                </a>{" "}
                or contact me on{" "}
                <a
                  href="https://t.me/lapplund"
                  class="text-neutral-300 hover:text-neutral-100 transition underline"
                  title={`Telegram Link`}
                >
                  Telegram
                </a>{" "}
                to add a redirect data.
              </>
            )}
          </p>
          <a
            href={
              redirectData.value?.value.activityPubUrl ??
              "https://social.gnuweeb.org/@lappland"
            }
            rel="me"
            class="hidden"
          >
            ActivityPub Verification
          </a>
        </div>
        <Waves showText={false} />
      </section>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const redirectData = resolveValue(useLoader);

  return {
    title: !redirectData ? "420" : redirectData.value.provider,
    meta: [
      {
        name: "description",
        content: !redirectData
          ? "Redirect not found"
          : `Redirecting to ${redirectData.value.provider}`,
      },
      {
        name: "og:title",
        content: !redirectData ? "420" : redirectData.value.provider,
      },
      {
        name: "og:description",
        content: !redirectData
          ? "Redirect not found"
          : `Redirecting to ${redirectData.value.provider}`,
      },
    ],
  };
};
