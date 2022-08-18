//  SPDX-FileCopyrightText: 2021 Luca Casonato
//  SPDX-License-Identifier: MIT

import { Sheet } from "twind";
import {
  Options,
  setup,
  STYLE_ELEMENT_ID,
} from "@utils/plugin-twind/shared.ts";
import { Any } from "any";

type State = [Options, string[], [string, string][]];

export default function hydrate(state: State) {
  const el = document.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement;
  const rules = new Set(el.innerText.split("\n"));
  const precedences = state[1];
  const mappings = new Map(
    state[2].map((v) => (typeof v === "string" ? [v, v] : v))
  );
  const sheetState: Any[] = [precedences, rules, mappings, true];
  const target = el.sheet!;
  const sheet: Sheet = {
    target,
    insert: (rule, index) => target.insertRule(rule, index),
    init: (cb) => cb(sheetState.shift()),
  };
  setup(state[0], sheet);
}
