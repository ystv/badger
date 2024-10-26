import {
  CreateTRPCProxyClient,
  createTRPCProxyClient,
  httpBatchLink,
  httpLink,
  loggerLink,
} from "@trpc/client";
import type { AppRouter } from "badger-server/app/api/_router";
import superjson from "superjson";
import logging from "./logging";
import invariant from "../../common/invariant";

const logger = logging.getLogger("serverApiClient");

let serverApiClient: CreateTRPCProxyClient<AppRouter> | null = null;

export async function newAPIClient(endpoint: string, password: string) {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      loggerLink({
        logger(opts) {
          const parts = [];
          if (opts.direction === "down") {
            parts.push("-->");
          } else {
            parts.push("<--");
          }

          parts.push(opts.type);
          parts.push(opts.path);
          if (opts.direction === "down") {
            parts.push(JSON.stringify(opts.result));
          } else {
            parts.push(JSON.stringify(opts.input));
          }
          logger.trace(parts.join(" "));
        },
      }),
      // We disable batching in E2E tests to make mocking easier
      (process.env.E2E_TEST === "true" ? httpLink : httpBatchLink)({
        url: endpoint + "/api/trpc",
        headers: () => ({
          authorization: `Bearer ${password}`,
        }),
      }),
    ],
    transformer: superjson,
  });
  return client;
}

export function _setServerApiClient(client: CreateTRPCProxyClient<AppRouter>) {
  serverApiClient = client;
}

/**
 * Check if the server and client are running the same version of the app.
 * Takes in a client, rather than creating one, so that it can also be used
 * as a check if the connection works;
 */
export async function checkForVersionSkew(
  client: CreateTRPCProxyClient<AppRouter>,
) {
  const pingResponse = await client.ping.query();
  if (pingResponse.version !== global.__APP_VERSION__) {
    logger.warn(
      `Warning: version skew detected: server is running ${pingResponse.version}, but client is running ${global.__APP_VERSION__}`,
    );
    return true;
  }
  return false;
}

export function serverAPI() {
  invariant(serverApiClient !== null, "serverApiClient is null");
  return serverApiClient;
}
