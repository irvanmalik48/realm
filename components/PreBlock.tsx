import { h } from "preact";
import { Any } from "any";
import CodeBlock from "@components/CodeBlock.tsx";

export default function PreBlock(
  props: h.JSX.IntrinsicAttributes & h.JSX.HTMLAttributes<HTMLPreElement> & {
    children: Any;
  },
) {
  if (props.children && props.children["type"] === "code") {
    return CodeBlock(props.children.props);
  }
  return (
    <pre {...props} translate="no">
      {props.children}
    </pre>
  );
}
