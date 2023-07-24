import "server-only";

export function getTusEndpoint(): string {
  return process.env.TUS_ENDPOINT!;
}
