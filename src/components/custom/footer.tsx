export default function Footer() {
  return (
    <footer className="mt-auto w-full py-5 border-t border-border">
      <div className="w-full flex flex-col gap-1 max-w-3xl mx-auto px-5">
        <div className="w-full flex gap-3 items-center">
          <svg
            viewBox="0 0 188 188"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-foreground"
          >
            <path
              d="M21.2694 35.2291L34.3295 22.1689L165.802 153.642L152.742 166.702L21.2694 35.2291Z"
              fill="currentColor"
            />
            <path
              d="M51.3509 6.04696L5.17616 52.2217L5.17616 6.04696L51.3509 6.04696Z"
              fill="currentColor"
            />
            <path
              d="M182.388 136.214L136.213 182.388L182.388 182.388V136.214Z"
              fill="currentColor"
            />
            <path
              d="M34.7649 166.266L21.7047 153.206L153.177 21.7336L166.238 34.7938L34.7649 166.266Z"
              fill="currentColor"
            />
            <path
              d="M5.58276 136.185L51.7575 182.36H5.58276L5.58276 136.185Z"
              fill="currentColor"
            />
            <path
              d="M135.749 5.14756L181.924 51.3223V5.14756H135.749Z"
              fill="currentColor"
            />
            <path
              d="M24.2945 101.333L24.2941 87.5326H163.222L163.222 101.333L24.2945 101.333Z"
              fill="currentColor"
            />
            <path
              d="M24.7695 70.0215L24.7695 118.814L0.373047 94.4179L24.7695 70.0215Z"
              fill="currentColor"
            />
            <path
              d="M162.777 69.5613L162.777 118.354L187.173 93.9577L162.777 69.5613Z"
              fill="currentColor"
            />
            <path
              d="M100.869 163.241L87.0684 163.242L87.0684 24.3134L100.869 24.3138V163.241Z"
              fill="currentColor"
            />
            <path
              d="M69.5572 162.766H118.35L93.9537 187.163L69.5572 162.766Z"
              fill="currentColor"
            />
            <path
              d="M69.0971 24.7588L117.89 24.7587L93.4935 0.362305L69.0971 24.7588Z"
              fill="currentColor"
            />
          </svg>
          <h4 className="text-lg font-semibold dark:font-medium">realm.</h4>
        </div>
        <p className="text-xs dark:text-foreground/50 w-3/4 lg:w-full">
          Made with Next.js, shadcn/ui, and TypeScript, using my last 3
          braincells, assuming that I have at least 1 to begin with.
        </p>
        <p className="text-xs mt-2 dark:text-foreground/50 w-3/4 lg:w-full">
          For privacy blockheads: I DO NOT collect any data and I DO NOT need to
          ask for your consent for the usage of cookies. All I ever use cookies
          for in this site is ONLY to save your theme mode preference and
          that&apos;s it.
        </p>
        <p className="text-xs dark:text-foreground/50 w-3/4 lg:w-full">
          For FLOSS extremists: Don&apos;t even try to yap about how I should
          use web technologies that are more &quot;free&quot; and
          &quot;libre&quot;. There&apos;s this thing called
          &quot;pragmatism&quot; that I&apos;m trying to achieve here and your
          idealistic views are not helping. Go yap somewhere else.
        </p>
        <p className="text-xs dark:text-foreground/50 w-3/4 lg:w-full">
          For everyone else: You can find the source code of this site in my
          GitHub account. Feel free to fork it and make your own version of it.
          Do let me know if you do so, I&apos;d love to see it!
        </p>
        <p className="text-xs mt-2 dark:text-foreground/50 w-3/4 lg:w-full">
          &copy; 2023 Irvan Malik Azantha. Licensed in MIT.
        </p>
      </div>
    </footer>
  );
}
