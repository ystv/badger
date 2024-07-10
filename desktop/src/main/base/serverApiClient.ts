import {
  CreateTRPCProxyClient,
  createTRPCProxyClient,
  httpBatchLink,
  httpLink,
  loggerLink,
} from "@trpc/client";
import type { AppRouter } from "badger-server/app/api/_router";
import superjson from "superjson";
import { getServerSettings, saveServerSettings } from "./settings";
import logging from "./logging";
import invariant from "../../common/invariant";

const logger = logging.getLogger("serverApiClient");

export let serverApiClient: CreateTRPCProxyClient<AppRouter> | null = null;

async function newAPIClient(endpoint: string, password: string) {
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
        url: endpoint,
        headers: () => ({
          authorization: `Bearer ${password}`,
        }),
      }),
    ],
    transformer: superjson,
  });
  const pingResponse = await client.ping.query();
  if (pingResponse.version !== global.__APP_VERSION__) {
    logger.warn(
      `Warning: version skew detected: server ${endpoint} is running ${pingResponse.version}, but client is running ${global.__APP_VERSION__}`,
    );
  }
  return client;
}

export async function createAPIClient(endpoint: string, password: string) {
  serverApiClient = await newAPIClient(endpoint, password);
  await saveServerSettings({ endpoint, password });
}

export async function tryCreateAPIClient() {
  let settings;
  try {
    settings = await getServerSettings();
  } catch (e) {
    logger.warn("Failed to load server settings", e, "Continuing anyway.");
    return;
  }
  if (settings !== null) {
    try {
      serverApiClient = await newAPIClient(
        settings.endpoint,
        settings.password,
      );
    } catch (e) {
      logger.warn("Failed to connect to server (will continue)", e);
    }
  }
}

export function serverAPI() {
  invariant(serverApiClient !== null, "serverApiClient is null");
  return serverApiClient;
}
