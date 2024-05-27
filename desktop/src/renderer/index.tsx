/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import * as Sentry from "@sentry/electron/renderer";
import { init as reactInit } from "@sentry/react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import logging from "loglevel";

if (import.meta.env.VITE_DESKTOP_SENTRY_DSN) {
  Sentry.init(
    {
      dsn: import.meta.env.VITE_DESKTOP_SENTRY_DSN,
      release: global.__SENTRY_RELEASE__,
    },
    reactInit,
  );
  logging.debug("[Renderer] Sentry enabled");
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
