import {
  Operation,
  TRPCLink,
  createTRPCProxyClient,
  OperationResultEnvelope,
} from "@trpc/client";
import type { AppRouter } from "bowser-server/app/api/_router";
import { observable } from "@trpc/server/observable";
import SuperJSON from "superjson";

const mockResponses = new Map<string, unknown>();

function opKey(op: Operation<unknown>): string {
  return `${op.type} ${op.path}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).__MOCK_SERVER_API__ = {
  mock(type: string, path: string, res: unknown) {
    mockResponses.set(`${type} ${path}`, res);
  },
  reset() {
    mockResponses.clear();
  },
};

const mockLink: TRPCLink<AppRouter> =
  (runtime) =>
  ({ op }) => {
    return observable((observer) => {
      const res = mockResponses.get(opKey(op));
      if (!res) {
        throw new Error(`TEST: No mock response for ${op.type} ${op.path}`);
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
  links: [mockLink],
  transformer: SuperJSON,
});
