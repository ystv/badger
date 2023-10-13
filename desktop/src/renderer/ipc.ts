import { createTRPCProxyClient, loggerLink } from "@trpc/client";
import { ipcLink } from "electron-trpc/renderer";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../main/ipcApi";
import { Events } from "../common/ipcEvents";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import logging from "loglevel";

const logger = logging.getLogger("serverIPC");

export const ipc = createTRPCReact<AppRouter>();

const clientConfig = {
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
        logger.info(parts.join(" "));
      },
    }),
    ipcLink(),
  ],
};

const ipcProxy = createTRPCProxyClient<AppRouter>(clientConfig);

export const ipcClient = ipc.createClient(clientConfig);

const oldFactory = logging.methodFactory;
logging.methodFactory = function (levelName, level, logger) {
  return function (message) {
    oldFactory(levelName, level, logger)(message);
    ipcProxy.log.mutate({
      level: levelName,
      logger: typeof logger === "symbol" ? String(logger) : logger,
      message,
    });
  };
};

const oldConsole = console;
window.console.log = (...args: unknown[]) => {
  oldConsole.log(...args);
  ipcProxy.log.mutate({ level: "debug", message: args.join(" ") });
};
window.console.info = (...args: unknown[]) => {
  oldConsole.info(...args);
  ipcProxy.log.mutate({ level: "info", message: args.join(" ") });
};
window.console.warn = (...args: unknown[]) => {
  oldConsole.warn(...args);
  ipcProxy.log.mutate({ level: "warn", message: args.join(" ") });
};
window.console.error = (...args: unknown[]) => {
  oldConsole.error(...args);
  ipcProxy.log.mutate({ level: "error", message: args.join(" ") });
};

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
