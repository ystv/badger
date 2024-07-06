import { test as base, expect } from "@/e2e/lib";
import SuperJSON from "superjson";
import {
  createTRPCProxyClient,
  CreateTRPCProxyClient,
  httpLink,
} from "@trpc/client";
import type { AppRouter } from "@/app/api/_router";

type API = CreateTRPCProxyClient<AppRouter>;

function createAPI(endpoint: string, password: string) {
  return createTRPCProxyClient<AppRouter>({
    transformer: SuperJSON,
    links: [
      httpLink({
        url: endpoint,
        headers: {
          Authorization: `Bearer ${password}`,
        },
      }),
    ],
  });
}

const MICRO_SERVER_PORT = process.env.MICRO_SERVER_PORT
  ? parseInt(process.env.MICRO_SERVER_PORT, 10)
  : process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 8594;

const test = base.extend<{
  scenario: string;
  live: API;
  micro: API;
}>({
  scenario: "default",
  live: async ({ baseURL }, use) => {
    await use(createAPI(baseURL + "/api/trpc", "aaa"));
  },
  micro: async ({ scenario }, use) => {
    await use(
      createAPI(
        `http://localhost:${MICRO_SERVER_PORT}/${scenario}/api/trpc`,
        "microserver",
      ),
    );
  },
});

export { test, expect };
