export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-transparent via-red-400 to-transparent pt-0.5">
      <div className="w-full pt-4 pb-36 lg:pb-12 bg-gray-900">
        <div className="container-responsive">
          <div className="flex flex-col-reverse gap-5 md:gap-3 md:flex-row justify-between items-center">
            <div className="text-center md:text-start flex flex-col">
              <p className="w-full font-helvetica text-sm px-4 text-gray-200 text-opacity-80">
                Made with{" "}
                <a
                  href="https://nextjs.org/"
                  className="text-red-400 underline"
                >
                  Next.js
                </a>{" "}
                and{" "}
                <a
                  href="https://tailwindcss.com/"
                  className="text-red-400 underline"
                >
                  Tailwind
                </a>
                . Hosted in{" "}
                <a
                  href="https://vercel.com/"
                  className="text-red-400 underline"
                >
                  Vercel
                </a>
                .
              </p>
              <p className="w-full font-helvetica text-sm px-4 text-gray-200 text-opacity-80">
                Copyright &copy; 2021 Irvan Malik Azantha. Licensed under MIT
                License.
              </p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <a
                aria-label="anchor-social"
                className="p-2 rounded-full hover:bg-red-400 transition hover:bg-opacity-50 bg-gray-800"
                href="https://linkedin.com/in/irvanmalik48"
              >
                <svg
                  className="h-[24px] w-auto fill-gray-200"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
                  />
                </svg>
              </a>
              <a
                aria-label="anchor-social"
                className="p-2 rounded-full hover:bg-red-400 transition hover:bg-opacity-50 bg-gray-800"
                href="https://twitter,com/irvanmalik48"
              >
                <svg
                  className="h-[24px] w-auto fill-gray-200"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
                  />
                </svg>
              </a>
              <a
                aria-label="anchor-social"
                className="p-2 rounded-full hover:bg-red-400 transition hover:bg-opacity-50 bg-gray-800"
                href="https://linkedin.com/in/irvanmalik48"
              >
                <svg
                  className="h-[24px] w-auto fill-gray-200"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
