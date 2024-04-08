import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function appendStyle(id: string, css: string) {
  if (!document.head.querySelector("#" + id)) {
    const node = document.createElement("style");
    node.textContent = css;
    node.id = id;

    document.head.appendChild(node);
  }
}

export function isDOMReady() {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    document.head
  );
}
