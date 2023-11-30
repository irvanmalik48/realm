import { ThemeProvider } from "@/components/misc/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Component {...pageProps} />
      </TooltipProvider>
    </ThemeProvider>
  );
}
