import "@sentry/electron/preload";
import { contextBridge, ipcRenderer } from "electron";
import { DeepPartial } from "react-hook-form";
import type { AppState } from "../main/store";

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("MainStoreAPI", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _dispatch: (...params: any[]) => ipcRenderer.invoke("dispatch", ...params),
    onStateChange: (
      callback: (actionType: string, newState: DeepPartial<AppState>) => void,
    ) => {
      ipcRenderer.on("stateChange", (event, actionType, newState) => {
        callback("@@main/" + actionType, newState);
      });
    },
    getState: () => ipcRenderer.invoke("getState"),
  });
});
