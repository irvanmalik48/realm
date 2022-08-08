/** @jsx h */
import { h, Component, createRef, RefObject } from "preact";
import { Any } from "any";

export default class Comments extends Component {
  private box: RefObject<HTMLDivElement>;

  constructor(props: Record<never, never> | Any) {
    super(props);
    this.box = createRef();
  }

  componentDidMount() {
    const element: HTMLScriptElement = document.createElement("script");
    element.setAttribute("src", "https://giscus.app/client.js");
    element.setAttribute("crossorigin", "anonymous");
    element.setAttribute("async", "true");
    element.setAttribute("data-repo", "irvanmalik48/realm");
    element.setAttribute("data-repo-id", "R_kgDOHpHiPg");
    element.setAttribute("data-category", "Comments");
    element.setAttribute("data-category-id", "DIC_kwDOHpHiPs4CQsGa");
    element.setAttribute("data-mapping", "title");
    element.setAttribute("data-reactions-enabled", "0");
    element.setAttribute("data-emit-metadata", "0");
    element.setAttribute("data-lang", "en");
    element.setAttribute("data-input-position", "top");
    element.setAttribute("data-theme", "transparent_dark");
  }

  render(): h.JSX.Element {
    return <div ref={this.box}></div>;
  }
}