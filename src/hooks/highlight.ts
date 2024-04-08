import { useEffect, useState } from "react";
import highlight from "highlight.js";

const useHighlight = (text: string) => {
  const [highlighted, setHighlighted] = useState<string>("");
  const [language, setLanguage] = useState<string>("plaintext");

  highlight.configure({
    languages: [
      "javascript",
      "typescript",
      "css",
      "c",
      "cpp",
      "java",
      "kotlin",
      "python",
      "rust",
      "go",
      "bash",
      "php",
      "ruby",
      "html",
      "json",
      "plaintext",
    ],
  });

  useEffect(() => {
    const highlightResult = highlight.highlightAuto(text);

    setHighlighted(highlightResult.value);
    setLanguage(highlightResult.language ?? "plaintext");
  }, [text]);

  return { highlighted, language };
};

export default useHighlight;
