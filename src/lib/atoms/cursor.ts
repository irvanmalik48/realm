import { atomWithStorage } from "jotai/utils";

export const cursorEnabledAtom = atomWithStorage<boolean>("cursorEnabled", true);
export const cursorSpeedAtom = atomWithStorage<number>("cursorSpeed", 0.15);
export const cursorHoverScaleAtom = atomWithStorage<number>("cursorHoverScale", 1.5);
export const cursorSizeAtom = atomWithStorage<number>("cursorSize", 40);
export const cursorPointerSizeAtom = atomWithStorage<number>("cursorPointerSize", 16);
