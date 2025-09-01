import { atomWithStorage } from "jotai/utils";

const darkModeToggleAnimation = atomWithStorage<"fade" | "circle-blur">(
  "darkModeToggleAnimation",
  "circle-blur"
);

export default darkModeToggleAnimation;
