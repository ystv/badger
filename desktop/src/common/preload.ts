import { contextBridge, ipcRenderer } from "electron";
import { exposeElectronTRPC } from "electron-trpc/main";
import { Events } from "./ipcEvents";
import invariant from "./invariant";

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
