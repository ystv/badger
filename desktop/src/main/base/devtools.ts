import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Integration } from "../../common/types";
import { IPCEvents } from "../ipcEventBus";
import { DEV_overrideSupportedIntegrations } from "./integrations";
import { proc, r } from "./ipcRouter";
import {
  devToolsConfigSchema,
  getDevToolsConfig,
  saveDevToolsConfig,
} from "./settings";
import { getLogger } from "./logging";

const logger = getLogger("devtools/ipc");

export const devtoolsRouter = r({
  devtools: r({
    getSettings: proc
      .output(devToolsConfigSchema)
      .query(() => getDevToolsConfig()),
    setSettings: proc
      .input(devToolsConfigSchema)
      .mutation(async ({ input }) => {
        logger.info("Dev Tools settings change: " + JSON.stringify(input));
        await saveDevToolsConfig(input);
        IPCEvents.send("devToolsSettingsChange");
      }),
    throwException: proc.mutation(async () => {
      if (!(await getDevToolsConfig()).enabled) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Dev tools not enabled",
        });
      }
      process.nextTick(() => {
        throw new Error("Test Main Process Exception");
      });
    }),
    crash: proc.mutation(async () => {
      if (!(await getDevToolsConfig()).enabled) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Dev tools not enabled",
        });
      }
      process.crash();
    }),
    setEnabledIntegrations: proc
      .input(z.array(z.string()))
      .mutation(async ({ input }) => {
        if (!(await getDevToolsConfig()).enabled) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "Dev tools not enabled",
          });
        }
        DEV_overrideSupportedIntegrations(input as Integration[]);
      }),
  }),
});
