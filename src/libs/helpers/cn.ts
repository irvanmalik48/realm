import { type ClassValue, clsx } from "clsx";

/**
 * Merges multiple Tailwind CSS classes or class arrays into a single string.
 * Uses `clsx` for conditional classes.
 *
 * @param inputs - A list of class names, arrays, or conditional objects.
 * @returns A merged string of sanitized Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
