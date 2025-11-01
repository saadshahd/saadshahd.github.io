import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with proper conflict resolution
 *
 * Combines clsx + tailwind-merge for CVA compatibility:
 * - clsx: Handles conditional classes and concatenation
 * - twMerge: Resolves Tailwind class conflicts (e.g., p-6 vs p-8 → keeps p-8)
 *
 * @example
 * ```typescript
 * cn('p-4 text-lg', 'p-8') // => 'text-lg p-8' (p-8 overrides p-4)
 * cn('px-4 py-2', 'p-8')   // => 'p-8' (p-8 overrides both px-4 and py-2)
 * cn('p-4', condition && 'p-8') // => 'p-4' or 'p-8' based on condition
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
