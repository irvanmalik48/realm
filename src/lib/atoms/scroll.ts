import { atomWithStorage } from "jotai/utils";

export const smoothScrollAtom = atomWithStorage<boolean>("smoothScroll", true);
export const scrollLerpAtom = atomWithStorage<number>("scrollLerp", 0.1);
export const scrollDurationAtom = atomWithStorage<number>("scrollDuration", 1.2);
export const customScrollbarEnabledAtom = atomWithStorage<boolean>("customScrollbarEnabled", true);
