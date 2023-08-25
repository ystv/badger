import { app, BrowserWindow } from "electron";
import * as path from "path";
import { createIPCHandler } from "electron-trpc/main";
import { emitObservable, setSender } from "./ipcEventBus";
import { appRouter } from "./ipcApi";
import { tryCreateAPIClient } from "./serverApiClient";
import { tryCreateOBSConnection } from "./obs";
import { validateLocalMediaState } from "./settings";
import isSquirrel from "electron-squirrel-startup";
import { selectedShow } from "./selectedShow";
import logging, { LogLevelNames } from "loglevel";
import prefix from "loglevel-plugin-prefix";
import { tryCreateVMixConnection } from "./vmix";
import Icon from "../icon/png/64x64.png";
import { tryCreateOntimeConnection } from "./ontime";
import * as Sentry from "@sentry/electron/main";

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    release: global.__APP_VERSION__ + "-" + global.__GIT_COMMIT__.slice(0, 7),
  });
  console.log("[Main] Sentry enabled");
}

logging.setLevel(
  (process.env.LOG_LEVEL as LogLevelNames) ?? logging.levels.DEBUG,
);
prefix.reg(logging);
prefix.apply(logging, {
  template: "[%t] %l (%n):",
});

logging.info("Environment:", import.meta.env.MODE);

// https://www.electronforge.io/config/plugins/vite
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (isSquirrel) {
  app.quit();
}

const createWindow = async () => {
  await Promise.all([
    validateLocalMediaState(),
    tryCreateAPIClient(),
    tryCreateOBSConnection(),
    process.platform === "win32"
      ? tryCreateVMixConnection()
      : Promise.resolve(),
    tryCreateOntimeConnection(),
  ]);

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    maxWidth: 1280,
    height: 720,
    icon: Icon,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    await mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  if (import.meta.env.DEV) {
    mainWindow.webContents.openDevTools();
  }

  createIPCHandler({ router: appRouter, windows: [mainWindow] });
  setSender(mainWindow.webContents.send.bind(mainWindow.webContents));
  emitObservable("selectedShowChange", selectedShow);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
