import { loggerLink } from "@trpc/client";
import { ipcLink } from "electron-trpc/renderer";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../main/ipcApi";
import { Events } from "../common/ipcEvents";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const ipc = createTRPCReact<AppRouter>();

export const ipcClient = ipc.createClient({
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
        console.log(parts.join(" "));
      },
    }),
    ipcLink(),
  ],
});

export function useInvalidateQueryOnIPCEvent(
  query: QueryKey,
  event: keyof Events,
) {
  const qc = useQueryClient();
  useEffect(() => {
    const handler = () => qc.invalidateQueries(query);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.IPCEventBus.on(event as any, handler);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => window.IPCEventBus.off(event as any, handler);
  }, [query, event, qc]);
}
