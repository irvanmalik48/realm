export function explodeString(text: unknown): string[] {
  if (typeof text === "string") {
    return text.split("");
  }
  return [];
}
