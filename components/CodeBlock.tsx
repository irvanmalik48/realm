/** @jsx h */
import { h } from "preact";
import { syntaxHighlighterTheme } from "@utils/colors.ts";
import * as Themes from "rsh/dist/esm/styles/prism";
import { everblush } from "@utils/everblush.ts";
import { Prism } from "rsh";

export default function CodeBlock(props: {
  className: string;
  children: h.JSX.Element | h.JSX.Element[] | string;
}) {
  let lang = "text";
  if (props.className && props.className.startsWith("lang-")) {
    lang = props.className.replace("lang-", "");
  }
  return (
    <Prism
      language={lang}
      style={
        (syntaxHighlighterTheme as string) === "everblush"
          ? everblush
          : Themes[syntaxHighlighterTheme]
      }
      showLineNumbers
      showInlineLineNumbers
    >
      {props.children}
    </Prism>
  );
}