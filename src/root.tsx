import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { QwikPartytown } from "./components/partytown/partytown";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider viewTransition>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0A0A0A" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <QwikPartytown forward={["dataLayer.push"]} />
        <script
          type="text/partytown"
          data-goatcounter="https://realmof.tech/analytics/referrer"
          async
          src="//realmof.tech/analytics/count.js"
        />
        <RouterHead />
      </head>
      <body
        lang="en"
        class="scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-900"
      >
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
