import {
  CreateTRPCProxyClient,
  createTRPCProxyClient,
  httpBatchLink,
  loggerLink,
} from "@trpc/client";
import type { AppRouter } from "bowser-server/app/api/_router";
import superjson from "superjson";
import { getServerSettings, saveServerSettings } from "./settings";

export let serverApiClient: CreateTRPCProxyClient<AppRouter> | null = null;

async function newAPIClient(endpoint: string, password: string) {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      loggerLink(),
      httpBatchLink({
        url: endpoint,
        headers: () => ({
          authorization: `Bearer ${password}`,
        }),
      }),
    ],
    transformer: superjson,
  });
  await client.ping.query();
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
    console.warn("Failed to load server settings", e, "Continuing anyway.");
    return;
  }
  if (settings !== null) {
    serverApiClient = await newAPIClient(settings.endpoint, settings.password);
  }
}
