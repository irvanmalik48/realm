import { atomWithStorage } from "jotai/utils";

const marqueeEnable = atomWithStorage<boolean>("marqueeEnable", true);

export default marqueeEnable;
