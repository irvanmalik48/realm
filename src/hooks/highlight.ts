import { useEffect, useState } from "react";
import highlight from "highlight.js";

const useHighlight = (text: string) => {
  const [highlighted, setHighlighted] = useState<string>("");
  const [language, setLanguage] = useState<string>("plaintext");

  useEffect(() => {
    const highlightResult = highlight.highlightAuto(text);

    setHighlighted(highlightResult.value);
    setLanguage(highlightResult.language ?? "plaintext");
  }, [text]);

  return { highlighted, language };
};

export default useHighlight;
