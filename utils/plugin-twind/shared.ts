//  SPDX-FileCopyrightText: 2021 Luca Casonato
//  SPDX-License-Identifier: MIT

import { JSX, options as preactOptions, VNode } from "preact";
import {
  Configuration,
  DarkMode,
  setup as twSetup,
  Preflight,
  Sheet,
  ThemeConfiguration,
  tw,
  CSSRules,
  strict,
} from "twind";
import { Any } from "any";

export const STYLE_ELEMENT_ID = "__FRSH_TWIND";

export interface Options {
  darkMode?: DarkMode;
  theme?: ThemeConfiguration;
  variants?: Record<string, string>;
  hash?: boolean;
  preflight?: Preflight | boolean | CSSRules;
}

declare module "preact" {
  namespace JSX {
    interface DOMAttributes<Target extends EventTarget> {
      class?: string;
      className?: string;
    }
  }
}

export function setup(options: Options, sheet: Sheet) {
  const config: Configuration = {
    darkMode: options.darkMode,
    hash: options.hash,
    mode: strict,
    sheet,
    variants: options.variants,
    theme: options.theme,
    important: true,
    preflight: options.preflight,
  };
  twSetup(config);

  const originalHook = preactOptions.vnode;
  preactOptions.vnode = (vnode: VNode<JSX.DOMAttributes<Any>>) => {
    if (typeof vnode.type === "string" && typeof vnode.props === "object") {
      const { props } = vnode;
      const classes: string[] = [];
      if (props.class) {
        classes.push(tw(props.class));
        props.class = undefined;
      }
      if (props.className) {
        classes.push(tw(props.className));
      }
      if (classes.length) {
        props.class = classes.join(" ");
      }
    }

    originalHook?.(vnode);
  };
}
