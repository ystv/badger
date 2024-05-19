import { escapeRegExp } from "lodash";
import "server-only";

export function getTusEndpoint(): string {
  return process.env.TUS_ENDPOINT!;
}

export function getPublicTusEndpoint(): string {
  return process.env.PUBLIC_TUS_ENDPOINT ?? getTusEndpoint();
}

export function uploadUrlToPath(url: string) {
  return url.replace(
    // Strip off the Tus endpoint prefix so the source is just the ID
    new RegExp(`^${escapeRegExp(getPublicTusEndpoint())}/?`),
    "",
  );
}
