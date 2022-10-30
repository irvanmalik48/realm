import { useEffect } from "react";

export default function ScrollToTop() {
  const handleClick = (e: any) => {
    e.preventDefault();
    window?.top?.scrollTo(0, 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollBtn = document.getElementById("scroll-to-top");
      if (window.scrollY > 100) {
        scrollBtn?.classList.remove("opacity-0");
        scrollBtn?.classList.add("opacity-100");
      } else {
        scrollBtn?.classList.add("opacity-0");
        scrollBtn?.classList.remove("opacity-100");
      }
    });
  }, []);

  return (
    <button
      id="scroll-to-top"
      className="opacity-0 transition fixed bottom-4 right-4 xl:right-8 z-50"
      onClick={handleClick}
    >
      <div className="stack hover:before:bg-red-400 hover:before:bg-opacity-40 before:transition rounded-md relative p-2 bg-gray-800 border-2 border-red-400 before:absolute before:inset-0 before:bg-gray-700">
        <div className="flex items-center justify-center lg:flex-col gap-2">
          <span className="material-symbols-sharp">expand_less</span>
          <span className="hidden md:block absolute origin-left scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-x-20 transition font-bold px-4 py-2 bg-red-400 bg-opacity-20 text-sm rounded-lg">
            Back to top
          </span>
        </div>
      </div>
    </button>
  );
}
