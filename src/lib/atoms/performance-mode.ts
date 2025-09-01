import { atomWithStorage } from "jotai/utils";

const performanceModeAtom = atomWithStorage<boolean>("performanceMode", false);

export default performanceModeAtom;
