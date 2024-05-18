import "server-only";

export function getTusEndpoint(): string {
  return process.env.TUS_ENDPOINT!;
}

export function getPublicTusEndpoint(): string {
  return process.env.PUBLIC_TUS_ENDPOINT ?? getTusEndpoint();
}
