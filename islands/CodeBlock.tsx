/** @jsx h */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { syntaxHighlighterTheme } from "@utils/colors.ts";
import * as Themes from "rsh/dist/esm/styles/prism";
import { everblush } from "@utils/everblush.ts";
import { Prism } from "rsh";
import { tw } from "@utils/twind.ts";
import { CopyIcon, CheckIcon } from "@components/Icons.tsx";

export default function CodeBlock(props: {
  className: string;
  children: h.JSX.Element | h.JSX.Element[] | string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    if (props.children === undefined || props.children === null) {
      return;
    }
    try {
      await navigator.clipboard.writeText(props.children.toString());
      setCopied(true);
    } catch (error) {
      setCopied(false);
      console.error((error && error.message) || "Copy failed");
    }
  }

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

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
          {fileName !== "none" && (
            <span
              className={tw`font-mono bg-dark-accent-semitrans w-[fit-content] text-sm text-dark-accent-solid font-semibold px-4 py-0.5 my-1 rounded-3xl`}
            >
              {fileName}
            </span>
          )}
          <button
            className={tw`font-mono inline-block bg-dark-nav hover:bg-dark-accent-semitrans active:bg-dark-accent-solid focus:outline-none focus:bg-dark-accent-solid ring ring-transparent hover:ring-dark-accent-solid w-[fit-content] text-sm text-dark-text active:text-dark-superdark focus:text-dark-superdark hover:text-dark-accent-solid transition-all duration-200 ease-linear font-semibold px-4 py-0.5 my-1 rounded-3xl`}
            onClick={handleClick}
            disabled={!IS_BROWSER}
          >
            {copied ? (
              <CheckIcon className={tw`w-[1rem]`} />
            ) : (
              <CopyIcon className={tw`w-[1rem]`} />
            )}
          </button>
        </p>
      </div>
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
    </div>
  );
}
