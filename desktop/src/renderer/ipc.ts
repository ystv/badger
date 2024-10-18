import {
  CreateTRPCClientOptions,
  createTRPCProxyClient,
  loggerLink,
} from "@trpc/client";
import { ipcLink } from "electron-trpc/renderer";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../main/coreIPC";
import { Events } from "../common/ipcEvents";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import logging from "loglevel";
import SuperJSON from "superjson";

const logger = logging.getLogger("serverIPC");

export const ipc = createTRPCReact<AppRouter>();

const clientConfig: CreateTRPCClientOptions<AppRouter> = {
  links: [loggerLink({ logger: logger.info }), ipcLink()],
  transformer: SuperJSON,
};

const ipcProxy = createTRPCProxyClient<AppRouter>(clientConfig);

export const ipcClient = ipc.createClient(clientConfig);

const oldFactory = logging.methodFactory;
logging.methodFactory = function (levelName, level, logger) {
  return function (message) {
    oldFactory(levelName, level, logger)(message);
    ipcProxy.core.log.mutate({
      level: levelName,
      logger: typeof logger === "symbol" ? String(logger) : logger,
      message,
    });
  };
};

const { log, info, warn, error } = console;
window.console.log = (...args: unknown[]) => {
  log(...args);
  ipcProxy.core.log.mutate({ level: "debug", message: args.join(" ") });
};
window.console.info = (...args: unknown[]) => {
  info(...args);
  ipcProxy.core.log.mutate({ level: "info", message: args.join(" ") });
};
window.console.warn = (...args: unknown[]) => {
  warn(...args);
  ipcProxy.core.log.mutate({ level: "warn", message: args.join(" ") });
};
window.console.error = (...args: unknown[]) => {
  error(...args);
  ipcProxy.core.log.mutate({ level: "error", message: args.join(" ") });
};

// eslint-disable-next-line no-console
console.info("Renderer IPC logging initialised.");

export function useInvalidateQueryOnIPCEvent(
  query: QueryKey,
  event: keyof Events,
) {
  const qc = useQueryClient();
  useEffect(() => {
    const handler = () => {
      logger.debug(`Invalidating query ${query} due to IPC event ${event}`);
      qc.invalidateQueries(query);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.IPCEventBus.on(event as any, handler);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => window.IPCEventBus.off(event as any, handler);
  }, [query, event, qc]);
}
