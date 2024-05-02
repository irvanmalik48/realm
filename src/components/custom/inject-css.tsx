import { FC, useState, useEffect } from "react";
import { appendStyle, isDOMReady } from "@/lib/utils";

const idCache: any = {};

type InjectCSSProps = {
  css: string;
};

function InjectCSS({ css }: InjectCSSProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!idCache[css]) {
      idCache[css] =
        "__react_highlight_syntax__inject_css_id-" +
        Object.keys(idCache).length;
    }

    if (isDOMReady()) {
      appendStyle(idCache[css], css);
      setReady(true);
    }

    if (!ready && isDOMReady()) {
      appendStyle(idCache[css], css);
    }
  }, [css, ready]);

  return null;
}

export default InjectCSS;
