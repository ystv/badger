import { test as base, expect } from "@/e2e/lib";
import SuperJSON from "superjson";

const MICRO_SERVER_PORT = process.env.MICRO_SERVER_PORT
  ? parseInt(process.env.MICRO_SERVER_PORT, 10)
  : process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 8594;

const test = base.extend<{
  scenario: string;
  live: (endpoint: string, method: "get") => Promise<Record<string, unknown>>;
  micro: (endpoint: string, method: "get") => Promise<Record<string, unknown>>;
}>({
  scenario: "default",
  live: async ({ request }, use) => {
    await use(async (endpoint: string, method: "get") => {
      const res = await request[method](`/api/trpc/${endpoint}`, {
        headers: {
          Authorization: "Bearer aaa",
        },
      });
      expect(res.status()).toBe(200);
      const r = await res.json();
      return SuperJSON.deserialize(r.result.data);
    });
  },
  micro: async ({ request, scenario }, use) => {
    await use(async (endpoint: string, method: "get") => {
      const res = await request[method](
        `http://localhost:${MICRO_SERVER_PORT}/${scenario}/api/trpc/${endpoint}`,
        {
          headers: {
            Authorization: "Bearer microserver",
          },
        },
      );
      expect(res.status()).toBe(200);
      const r = await res.json();
      return SuperJSON.deserialize(r.result.data);
    });
  },
});

export { test, expect };
