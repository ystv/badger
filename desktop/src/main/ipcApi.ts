import { callProcedure } from "@trpc/server";
import { ipcMain } from "electron";
import logging from "./base/logging";
import { ontimeRouter } from "./ontime/ipc";
import { vmixRouter } from "./vmix/ipc";
import { obsRouter } from "./obs/ipc";
import { mediaRouter } from "./media/ipc";
import { r } from "./base/ipcRouter";
import { coreRouter, showsRouter } from "./base/ipc";
import { devtoolsRouter } from "./base/devtools";

const logger = logging.getLogger("ipcApi");

export const appRouter = r({
  core: coreRouter,
  shows: showsRouter,
  media: mediaRouter,
  obs: obsRouter,
  vmix: vmixRouter,
  ontime: ontimeRouter,
  devtools: devtoolsRouter,
});
export type AppRouter = typeof appRouter;

if (process.env.E2E_TEST === "true") {
  ipcMain.on("doIPCMutation", async (_, proc: string, input: unknown) => {
    logger.debug(
      "doIPCMutation: " + JSON.stringify(proc) + " " + JSON.stringify(input),
    );
    await callProcedure({
      procedures: appRouter._def.procedures,
      path: proc,
      rawInput: input,
      ctx: {},
      type: "mutation",
    });
  });
}
