import { h } from "preact";
import * as Themes from "rsh/dist/esm/styles/prism";
import { Prism } from "rsh";
import CopyButton from "@islands/CopyButton.tsx";
import { syntaxHighlighterTheme } from "@utils/colors.ts";
import { everblush } from "@utils/everblush.ts";
import { tw } from "@utils/twind.ts";

export default function CodeBlock(props: {
  className?: string;
  children: h.JSX.Element | h.JSX.Element[] | string;
}) {
  let lang = "text";
  let fileName = "none";
  if (props.className && props.className.startsWith("lang-")) {
    lang = props.className.replace("lang-", "");
    if (lang.includes("|")) {
      const temp = lang.split("|");
      lang = temp[0];
      fileName = temp[1].replaceAll("&nbsp;", " ");
    }
  }

  return (
    <div
      className={tw`text-dark-text font-mono bg-dark-bg text-sm overflow-x-auto my-3 rounded-xl overflow-clip`}
    >
      <div className={tw`px-5 py-2 bg-dark-superdark`}>
        <p className={tw`w-full flex flex-row justify-between items-center`}>
          <span
            className={tw`w-[fit-content] gap-2 flex flex-row justify-center items-center`}
          >
            {fileName === "none" && (
              <span
                className={tw`font-mono bg-dark-accent-semitrans w-[fit-content] text-sm text-dark-accent-solid font-semibold px-4 py-0.5 my-1 rounded-3xl`}
              >
                {lang === "text" ? "Plain" : lang.toUpperCase()}
              </span>
            )}
            {fileName !== "none" && (
              <span
                className={tw`font-mono bg-dark-accent-semitrans w-[fit-content] text-sm text-dark-accent-solid font-semibold px-4 py-0.5 my-1 rounded-3xl`}
              >
                {fileName}
              </span>
            )}
          </span>
          <span></span>
          <CopyButton
            text={typeof props.children === "string" ? props.children : ""}
          />
        </p>
      </div>
      <Prism
        language={lang}
        style={(syntaxHighlighterTheme as string) === "everblush"
          ? everblush
          : Themes[syntaxHighlighterTheme]}
      >
        {props.children}
      </Prism>
    </div>
  );
}
