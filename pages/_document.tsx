import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head />
      <body className="bg-gray-900 text-gray-300 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-red-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
