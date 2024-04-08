import useHighlight from "@/hooks/highlight";
import InjectCSS from "./inject-css";
import { cn } from "@/lib/utils";
import { getStyleClass, getTheme } from "@/lib/style-classes";
import { memo, useEffect, useState } from "react";
import { useTheme } from "next-themes";

function HighlightBin({ text }: { text: string }) {
  const { highlighted, language } = useHighlight(text);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  });

  return (
    mounted && (
      <>
        <InjectCSS
          css={getTheme(
            theme === "dark" ? "StackoverflowDark" : "StackoverflowLight"
          )}
        />
        <pre
          className={cn(
            getStyleClass(
              theme === "dark" ? "StackoverflowDark" : "StackoverflowLight"
            ),
            "w-full overflow-auto font-mono whitespace-pre"
          )}
        >
          <code
            className={`hljs language-${language} !bg-background !px-5 !py-3 block`}
            data-type="realm-syntax-highlighter"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </>
    )
  );
}

export default memo(HighlightBin);
