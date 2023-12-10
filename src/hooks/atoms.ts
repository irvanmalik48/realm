import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const smoothScrollingToggleAtom = atomWithStorage("smoothScrollPref", false);
const progressBarToggleAtom = atomWithStorage("progressBarPref", true);

export function useSSToggle() {
  const [smoothScrolling, setSmoothScrolling] = useAtom(
    smoothScrollingToggleAtom
  );

  return {
    smoothScrolling,
    setSmoothScrolling,
  };
}

export function usePBToggle() {
  const [progressBar, setProgressBar] = useAtom(progressBarToggleAtom);

  return {
    progressBar,
    setProgressBar,
  };
}
