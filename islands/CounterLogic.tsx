import { useState } from "preact/hooks";
import { tw } from "@utils/twind.ts";

export default function CounterLogic(props: { start: number }) {
  let [count, setCount] = useState(props.start);
  return (
    <>
      <button
        className={tw`bg-dark-accent-semitrans text-dark-accent-solid p-3 rounded-xl w-[50px] h-[50px] text-center transition-all duration-200 ease-out hover:bg-dark-accent-solid hover:rounded-3xl hover:text-dark-nav`}
        onClick={(e) => {
          e.preventDefault();
          setCount(--count);
        }}
      >
        -1
      </button>
      <p className={tw`font-bold text-2xl`}>{count}</p>
      <button
        className={tw`bg-dark-accent-semitrans text-dark-accent-solid p-3 rounded-xl w-[50px] h-[50px] text-center transition-all duration-200 ease-out hover:bg-dark-accent-solid hover:rounded-3xl hover:text-dark-nav`}
        onClick={(e) => {
          e.preventDefault();
          setCount(++count);
        }}
      >
        +1
      </button>
    </>
  );
}
