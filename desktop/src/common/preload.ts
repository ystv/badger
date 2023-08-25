import * as Sentry from "@sentry/electron";
import { contextBridge, ipcRenderer } from "electron";
import { exposeElectronTRPC } from "electron-trpc/main";
import { Events } from "./ipcEvents";
import invariant from "./invariant";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    release: global.__APP_VERSION__ + "-" + global.__GIT_COMMIT__.slice(0, 7),
  });
  console.log("[Preload] Sentry enabled");
}

process.once("loaded", async () => {
  exposeElectronTRPC();
  contextBridge.exposeInMainWorld("IPCEventBus", {
    on: (evt: keyof Events, callback: (...args: unknown[]) => void) => {
      // This invariant is necessary to avoid a malicious renderer process registering arbitrary event handlers.
      invariant(
        evt in Events,
        "Tried to register event handler for non-exposed event type",
      );
      ipcRenderer.on(evt, callback);
    },
    once: (evt: keyof Events, callback: (...args: unknown[]) => void) => {
      invariant(
        evt in Events,
        "Tried to register event handler for non-exposed event type",
      );
      ipcRenderer.once(evt, callback);
    },
    off: (evt: keyof Events, callback: (...args: unknown[]) => void) => {
      invariant(
        evt in Events,
        "Tried to register event handler for non-exposed event type",
      );
      ipcRenderer.off(evt, callback);
    },
  });
});
