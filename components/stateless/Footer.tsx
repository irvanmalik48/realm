import React from "react";

export function Footer() {
  return (
    <footer className="w-full px-5 py-8 mb-20 lg:mb-0">
      <div className="flex flex-col-reverse md:flex-row max-w items-center justify-between max-w-4xl mx-auto">
        <div className="">
          <p className="text-white text-center md:text-start text-opacity-50">
            Made with{" "}
            <span className="text-teal-300">pure sarcastic remarks</span> by{" "}
            <a
              href="github.com/irvanmalik48"
              className="text-teal-300 hover:text-opacity-100 transition ease-out underline underline-offset-2"
            >
              my own self
            </a>
            .
          </p>
          <p className="text-white text-center md:text-start text-opacity-50">
            Copyright © 2022 Irvan Malik Azantha. Licensed under MIT License.
          </p>
        </div>
        <div className="flex flex-row gap-3 py-5">
          <a
            href="https://twitter.com/irvanmalik48"
            className="bg-white bg-opacity-50 text-neutral-900 p-2 rounded-full block hover:bg-opacity-100 transition ease-out"
          >
            <TwitterIcon className="w-6" />
          </a>
          <a
            href="https://linkedin.com/in/irvanmalik48"
            className="bg-white bg-opacity-50 text-neutral-900 p-2 rounded-full block hover:bg-opacity-100 transition ease-out"
          >
            <LinkedInIcon className="w-6" />
          </a>
          <a
            href="mailto:irvanmalik48@gmail.com"
            className="bg-white bg-opacity-50 text-neutral-900 p-2 rounded-full block hover:bg-opacity-100 transition ease-out"
          >
            <MailFastIcon className="w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
      />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
      />
    </svg>
  );
}

function MailFastIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M22 5.5H9C7.9 5.5 7 6.4 7 7.5V16.5C7 17.61 7.9 18.5 9 18.5H22C23.11 18.5 24 17.61 24 16.5V7.5C24 6.4 23.11 5.5 22 5.5M22 9.17L15.5 12.5L9 9.17V7.5L15.5 10.81L22 7.5V9.17M5 16.5C5 16.67 5.03 16.83 5.05 17H1C.448 17 0 16.55 0 16S.448 15 1 15H5V16.5M3 7H5.05C5.03 7.17 5 7.33 5 7.5V9H3C2.45 9 2 8.55 2 8S2.45 7 3 7M1 12C1 11.45 1.45 11 2 11H5V13H2C1.45 13 1 12.55 1 12Z"
      />
    </svg>
  );
}
