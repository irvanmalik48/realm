import { Record } from "effect";
import { deepFreeze } from "./deep-freeze";

/**
 * Creates a "safe" version of an object that is prototype-less (Object.create(null))
 * and recursively frozen for immutability and security against prototype pollution.
 *
 * @template T - The type of the object.
 * @param initial - Optional initial object to clone and safe-ify.
 * @returns A prototype-less, deeply frozen version of the input or an empty safe object.
 */
export function newSafeObject<T extends object>(initial?: T): T {
  if (!initial) {
    return Object.create(null);
  }

  const safe = Object.create(null) as Record<string, unknown>;

  Record.toEntries(initial as Record<string, unknown>).forEach(
    ([key, value]) => {
      if (
        key === "__proto__" ||
        key === "constructor" ||
        key === "prototype"
      ) {
        return;
      }

      if (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        safe[key] = newSafeObject(value as object);
      } else {
        safe[key] = value;
      }
    }
  );

  return deepFreeze(safe) as T;
}

/**
 * Creates an empty object with no prototype (null prototype).
 *
 * @returns A record that is safe from prototype-level properties.
 */
export function createEmptySafe(): Record<string, unknown> {
  return Object.create(null);
}

/**
 * Checks if an object is a "safe" object (i.e., it has no prototype).
 *
 * @param obj - The value to check.
 * @returns True if the object is non-null and its prototype is null.
 */
export function isSafeObject(obj: unknown): boolean {
  return (
    obj !== null &&
    typeof obj === "object" &&
    Object.getPrototypeOf(obj) === null
  );
}
