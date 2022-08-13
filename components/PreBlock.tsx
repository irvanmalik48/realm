/** @jsx h */
import { h } from "preact";
import { Any } from "any";
import CodeBlock from "@islands/CodeBlock.tsx";

export default function PreBlock(props: {
  children: Any;
  rest: h.JSX.IntrinsicAttributes & h.JSX.HTMLAttributes<HTMLPreElement>;
}) {
  if ("type" in props.children && props.children["type"] === "code") {
    return CodeBlock(props.children.props);
  }
  return (
    <pre {...props.rest} className="notranslate" translate="no">
      {props.children}
    </pre>
  );
}
