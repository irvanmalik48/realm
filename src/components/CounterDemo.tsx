import { createSignal } from "solid-js";

export default function CounterDemo() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="flex justify-between items-center p-3 not-prose bg-neutral-800 rounded border-neutral-700 border">
      <button class="hover:bg-opacity-50 transition font-mono font-bold text-2xl bg-neutral-900 border-neutral-700 rounded border px-5 py-3" onClick={() => setCount(count() - 1)}>
        -
      </button>
      <p class="w-full text-center text-4xl">{count()}</p>
      <button class="hover:bg-opacity-50 transition font-mono font-bold text-2xl bg-neutral-900 border-neutral-700 rounded border px-5 py-3" onClick={() => setCount(count() + 1)}>
        +
      </button>
    </div>
  );
}