import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";

import FAB from "@/components/custom/fab";
import { ThemeProvider } from "@/components/misc/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import "@/styles/globals.css";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <FAB />
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => {
            if (typeof window !== "undefined") {
              window.scrollTo(0, 0);
            }
          }}
        >
          <Component key={router.pathname} {...pageProps} />
        </AnimatePresence>
      </TooltipProvider>
    </ThemeProvider>
  );
}
