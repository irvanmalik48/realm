/**
 * Recursively freezes an object and all its nested object properties.
 * This makes the object and its children completely immutable.
 *
 * @template T - The type of the object being frozen.
 * @param obj - The object to freeze.
 * @returns The same object, now frozen and typed as immutable.
 */
export function deepFreeze<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  Object.freeze(obj);

  for (const key of Object.keys(obj as object)) {
    const value = obj[key as keyof T];
    if (typeof value === "object" && value !== null) {
      deepFreeze(value);
    }
  }
  return obj;
}
