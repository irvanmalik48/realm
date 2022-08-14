/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@utils/twind.ts";
import { CopyIcon, CheckIcon } from "@components/Icons.tsx";

export default function CopyButton(props: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    if (props.text === undefined || props.text === null) {
      return;
    } else {
      try {
        await navigator.clipboard.writeText(props.text.toString());
        setCopied(true);
      } catch (error) {
        setCopied(false);
        console.error((error && error.message) || "Copy failed");
      }
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

  return (
    <button
      className={tw`font-mono inline-block bg-dark-nav hover:bg-dark-accent-semitrans active:bg-dark-accent-solid focus:outline-none focus:bg-dark-accent-solid ring ring-transparent hover:ring-dark-accent-solid w-[fit-content] text-sm text-dark-text active:text-dark-superdark focus:text-dark-superdark hover:text-dark-accent-solid transition-all duration-200 ease-linear font-semibold px-4 py-0.5 my-1 rounded-3xl`}
      onClick={async (e) => {
        e.preventDefault();
        await handleClick();
      }}
      disabled={!IS_BROWSER}
    >
      {copied ? (
        <CheckIcon className={tw`w-[1rem]`} />
      ) : (
        <CopyIcon className={tw`w-[1rem]`} />
      )}
    </button>
  );
}
