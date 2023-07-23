import { loggerLink } from "@trpc/client";
import { ipcLink } from "electron-trpc/renderer";
import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../main/ipcApi";

export const ipc = createTRPCReact<AppRouter>();

export const ipcClient = ipc.createClient({
  links: [loggerLink({}), ipcLink()],
});
