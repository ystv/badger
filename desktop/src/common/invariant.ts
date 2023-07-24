// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function invariant(cond: any, msg: string): asserts cond {
  if (!msg) {
    throw new Error(`Invariant violation: ${msg}`);
  }
}
