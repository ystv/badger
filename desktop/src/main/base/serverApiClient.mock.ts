/* eslint-disable no-console */
import {
  Operation,
  TRPCLink,
  createTRPCProxyClient,
  OperationResultEnvelope,
  loggerLink,
} from "@trpc/client";
import type { AppRouter } from "badger-server/app/api/_router";
import { observable } from "@trpc/server/observable";
import SuperJSON from "superjson";

const mockResponses = new Map<string, unknown>();

function opKey(
  op: Operation<unknown> | { type: string; path: string },
): string {
  return `${op.type} ${op.path}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).__MOCK_SERVER_API__ = {
  mock(type: string, path: string, res: unknown) {
    mockResponses.set(opKey({ type, path }), res);
  },
  reset() {
    mockResponses.clear();
  },
};

const mockLink: TRPCLink<AppRouter> =
  (runtime) =>
  ({ op }) => {
    return observable((observer) => {
      console.log("Handling " + opKey(op));
      const res = mockResponses.get(opKey(op));
      if (!res) {
        console.error("No mock response for " + opKey(op));
        throw new Error(`TEST: No mock response for ${opKey(op)}`);
      }
      observer.next({
        result: {
          type: "data",
          data: res,
        },
      } satisfies OperationResultEnvelope<unknown>);
      observer.complete();
    });
  };

export const mockServerAPIClient = createTRPCProxyClient<AppRouter>({
  links: [loggerLink({}), mockLink],
  transformer: SuperJSON,
});
