import { Dispatch } from "@reduxjs/toolkit";
import isElectron from "is-electron";

// Initialises MainStoreAPO when we're not running in Electron.
if (import.meta.env.DEV && !isElectron()) {
  window.MainStoreAPI = {
    _dispatch: (async (actionType, ...args) => {
      const result = await fetch("/_dev/dispatch/" + actionType, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });
      return result.json();
    }) as Dispatch,
    getState: async () => {
      const result = await fetch("/_dev/getState");
      return result.json();
    },
    onStateChange: (callback) => {
      const ws = new WebSocket(`ws://${location.host}/_dev`);
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        callback("@@dev/" + data.type, data.state);
      };
      ws.onclose = () => {
        window.location.reload();
      };
    },
  };
}
