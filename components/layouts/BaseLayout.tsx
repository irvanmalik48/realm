import Head from "next/head";
import Footer from "../stateless/Footer";
import Navbar from "../stateful/Navbar";
import { NextSeo } from "next-seo";

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
    </>
  );
}
