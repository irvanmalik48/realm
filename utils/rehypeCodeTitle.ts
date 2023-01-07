import { visit } from "unist-util-visit";
import { h } from "hastscript";

export default function codeTitle(opt: any) {
  const className = (opt && opt.className) || "flex flex-col";

  return function (tree: any) {
    visit(tree, { tagName: "pre" }, visitor);

    function visitor(node: any, index: any) {
      if (node.children && node.children.length > 0) {
        const { properties } = node.children[0];
        if (properties.className && properties.className.length > 0) {
          const [lang, filename] = properties.className[0]
            .split(":")
            .map((e: any) => e.trim());
          properties.className = lang;
          if (!filename) return;

          const title = h("p", { class: "code-title" }, filename);
          const container = h("div", { class: className }, [title, node]);
          tree.children[index] = container;
        }
      }
    }
  };
}
