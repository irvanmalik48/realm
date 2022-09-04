import { tw } from "@utils/twind.ts";
import CounterLogic from "@islands/CounterLogic.tsx";

export default function Counter(props: { start: number }) {
  return (
    <div
      className={tw`w-full my-3 flex flex-row justify-between items-center p-3 rounded-xl bg-dark-bg`}
    >
      <CounterLogic start={props.start} />
    </div>
  );
}
