import { signal } from "signals";
import { tw } from "@utils/twind.ts";

export default function CounterLogic(props: { start: number }) {
  const count = signal(props.start);

  function setCount(val: number) {
    count.value = val;
  }

  return (
    <>
      <button
        className={tw`bg-light-accent-semitrans dark:bg-dark-accent-semitrans text-light-accent-solid dark:text-dark-accent-solid p-3 rounded-xl w-[50px] h-[50px] text-center transition-all duration-200 ease-out hover:bg-light-accent-solid hover:dark:bg-dark-accent-solid hover:rounded-3xl hover:text-light-nav hover:dark:text-dark-nav`}
        onClick={(e) => {
          e.preventDefault();
          setCount(--count.value);
        }}
      >
        -1
      </button>
      <p className={tw`text-light-text dark:text-dark-text font-bold text-2xl`}>
        {count}
      </p>
      <button
        className={tw`bg-light-accent-semitrans dark:bg-dark-accent-semitrans text-light-accent-solid dark:text-dark-accent-solid p-3 rounded-xl w-[50px] h-[50px] text-center transition-all duration-200 ease-out hover:bg-light-accent-solid hover:dark:bg-dark-accent-solid hover:rounded-3xl hover:text-light-nav hover:dark:text-dark-nav`}
        onClick={(e) => {
          e.preventDefault();
          setCount(++count.value);
        }}
      >
        +1
      </button>
    </>
  );
}
