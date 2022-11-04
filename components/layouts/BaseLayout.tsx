import Footer from "../stateless/Footer";
import { NextSeo } from "next-seo";
import ScrollToTop from "../stateful/ScrollToTop";
import Thumbnail from "../../utils/thumbnail";

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
        additionalMetaTags={[
          {
            name: "og:image",
            content: Thumbnail(props.title, props.date, props.tag),
          },
        ]}
      />
      <main>{props.children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
