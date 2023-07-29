/**
 * An invariant is something that should *always* be true. If it's not, it's a bug. Use this function to check,
 * e.g., that you have a non-null value, or that a value is within a certain range. It means you get more useful error
 * messages if, for whatever reason, it's not true, rather than a nondescript TypeError. It's particularly useful
 * together with nullable types when you *know* that the value is non-null, but you (or TypeScript) want to be sure.
 * @example
 *   const item = localMedia.find((x) => x.mediaID === info.id);
 *   invariant(
 *     item !== undefined,
 *     "no item (should never happen)",
 *   );
 *   // now typescript knows that `item` is not undefined, and you get a better error message if (for whatever reason) it is
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function invariant(cond: any, msg: string): asserts cond {
  if (!cond) {
    throw new Error(`Invariant violation: ${msg}`);
  }
}
