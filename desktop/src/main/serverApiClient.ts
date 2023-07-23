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

async function newAPIClient(endpoint: string) {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      loggerLink(),
      httpBatchLink({
        url: endpoint,
      }),
    ],
    transformer: superjson,
  });
  await client.ping.query();
  return client;
}

export async function createAPIClient(endpoint: string) {
  serverApiClient = await newAPIClient(endpoint);
  await saveServerSettings({ endpoint });
}

export async function tryCreateAPIClient() {
  const settings = await getServerSettings();
  if (settings !== null) {
    serverApiClient = await newAPIClient(settings.endpoint);
  }
}
