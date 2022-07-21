/** @jsx h */
import { h } from "preact";
import { apply, tw } from "@twind";
import Sidebar from "./Sidebar.tsx";
import Nav from "./Nav.tsx";
import { css } from "twind/css";
import { Head, asset } from "$fresh/runtime.ts";
import Thumbnail from "../utils/thumb.ts";
import Footer from "./Footer.tsx";
import DonateCard from "./Donate.tsx";

export default function DefaultLayout(props: {
  title?: string;
  desc?: string;
  date?: string;
  tag?: string[];
  children: h.JSX.Element | h.JSX.Element[];
}) {
  return (
    <main className={tw`bg-dark-bg w-screen gap-0 flex flex-row md:grid md:grid-cols-root `}>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="description" content={props.desc} />
        <meta key="words" name="keywords" content="blog" />

        <meta property="og:url" content="https://irvanma.live" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.desc} />
        <meta
          property="og:image"
          content={Thumbnail(props.title, props.date, props.tag)}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.desc} />
        <meta
          name="twitter:image"
          content={Thumbnail(props.title, props.date, props.tag)}
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="IrvanMA's Lair" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#282828" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#282828" />
        <meta name="format-detection" content="telephone=no" />

        <title>{props.title}</title>
        <link rel="manifest" href="/manifest.json" />
        <link
          href={asset("/icons/favicon-16x16.png")}
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href={asset("/icons/favicon-32x32.png")}
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link
          href={asset("/icons/favicon-96x96.png")}
          rel="icon"
          type="image/png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href={asset("/icons/favicon.ico")}
        />
        <link rel="apple-touch-icon" href={asset("/icons/ios/192.png")} />
      </Head>
      <Nav />
      <Sidebar />
      <section
        className={tw`sticky top-0 w-full px-4 md:px-6 lg:px-12 xl:px-24 py-4 text-dark-text h-screen overflow-y-auto ${css(
          {
            "&::-webkit-scrollbar": apply`bg-dark-accent-quartertrans w-5`,
            "&::-webkit-scrollbar-thumb": apply`bg-dark-accent-solid border-transparent border-[7px] border-solid bg-clip-content rounded-xl`,
          }
        )}`}
      >
        {props.children}
        <DonateCard />
        <Footer />
      </section>
    </main>
  );
}
