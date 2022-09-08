import { h } from "preact";
import { asset, Head } from "$fresh/runtime.ts";
import Nav from "@components/Nav.tsx";
import Sidebar from "@components/Sidebar.tsx";
import DonateCard from "@components/Donate.tsx";
import Footer from "@components/Footer.tsx";
import WaterDrop from "@islands/WaterDrop.tsx";
import FAB from "@islands/FAB.tsx";
import { apply, css, tw } from "@utils/twind.ts";
import Thumbnail from "@utils/thumb.ts";
import { colorScheme, currentColorScheme } from "@utils/colors.ts";

export default function DefaultLayout(props: {
  title?: string;
  desc?: string;
  date?: string;
  tag?: string[];
  active?: string;
  children: h.JSX.Element | h.JSX.Element[];
}) {
  const styles = css({
    "*":
      apply`ring ring-transparent focus:outline-none focus-visible:ring-dark-accent-solid ${
        css(
          {
            "scroll-behavior": "smooth",
          },
        )
      }`,
  });
  return (
    <>
      <main
        className={tw`${
          css({
            background: `url(/bg.svg)`,
            "background-size": "500px",
            "background-color": `${colorScheme[currentColorScheme].dark.bg}`,
            "background-position": "center",
            "-webkit-tap-highlight-color": "transparent",
          })
        } ${styles} w-screen gap-0 flex flex-col-reverse md:grid md:grid-cols-tablet lg:grid-cols-root`}
      >
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0"
          />
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
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="IrvanMA's Lair" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-TileColor"
            content={colorScheme[currentColorScheme].dark.nav}
          />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta
            name="theme-color"
            content={colorScheme[currentColorScheme].dark.nav}
          />
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
        <Nav active={props.active ?? "home"} />
        <Sidebar />
        <section
          className={tw`sticky top-0 w-full text-dark-text h-screen overflow-y-auto ${
            css(
              {
                "&::-webkit-scrollbar": apply`hidden`,
              },
            )
          } md:${
            css({
              "&::-webkit-scrollbar":
                apply`block bg-dark-accent-quartertrans w-5`,
              "&::-webkit-scrollbar-thumb":
                apply`bg-dark-accent-solid border-transparent border-[7px] border-solid bg-clip-content rounded-xl`,
            })
          }`}
          id="main-sect"
        >
          <div className={tw`p-4 md:px-6 lg:px-12 xl:px-24`}>
            {props.children}
            <DonateCard />
            <Footer />
            <FAB />
          </div>
          <WaterDrop />
        </section>
      </main>
    </>
  );
}
