import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const smoothScrollingToggleAtom = atomWithStorage("smoothScrollPref", false);

export function useSSToggle() {
  const [smoothScrolling, setSmoothScrolling] = useAtom(
    smoothScrollingToggleAtom
  );

  return {
    smoothScrolling,
    setSmoothScrolling,
  };
}
