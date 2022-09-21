import { ChevronUp } from "@components/Icons.tsx";
import { tw } from "@utils/twind.ts";

export default function FAB() {
  const handleClick = () => {
    const el = document.getElementById("main-sect");
    if (el !== null) {
      el.scrollTop = 0;
    }
  };

  return (
    <button
      className={tw`md:hidden bg-dark-accent-solid ring ring-dark-accent-semitrans text-dark-nav w-[fit-content] p-4 rounded-xl active:ring-dark-accent-solid transition-all duration-300 z-[999]`}
      aria-label="Back to top"
      onClick={(e) => {
        e.preventDefault;
        handleClick();
      }}
    >
      <ChevronUp />
    </button>
  );
}
