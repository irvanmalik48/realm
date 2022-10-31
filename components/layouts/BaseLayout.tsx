import Footer from "../stateless/Footer";
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
      <main>{props.children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
