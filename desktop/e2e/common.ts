import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";
import { type AppRouter } from "bowser-server/app/api/_router";
import { fetch } from "undici";

export const api = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
      headers: () => ({
        Authorization: "Bearer aaa",
      }),
      // @ts-expect-error the undici types don't match what TRPC is expecting, but they're close enough
      fetch,
    }),
  ],
  transformer: SuperJSON,
});
