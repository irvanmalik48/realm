import Footer from "../stateless/Footer";
import Navbar from "../stateful/Navbar";
import { NextSeo } from "next-seo";
import ScrollToTop from "../stateful/ScrollToTop";

export default function BaseLayout(props: any) {
  return (
    <>
      <NextSeo
        titleTemplate="The Realm | %s"
        title={props.title}
        description={props.description}
        key="next-seo"
        openGraph={{
          title: "The Realm | " + props.title,
          description: props.description,
        }}
      />
      <Navbar />
      <main>{props.children}</main>
      <Footer />
      <div className="fixed bottom-0 left-0 right-0 z-40 w-full h-24 md:h-16 lg:h-12 bg-gradient-to-t from-gray-900 to-transparent"></div>
      <ScrollToTop />
    </>
  );
}
