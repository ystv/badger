import {
  Action,
  ActionCreatorsMapObject,
  configureStore,
  createListenerMiddleware,
  Middleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import { AppSettings, settingsReducer } from "./base/settings";
import { ipcMain } from "electron/main";
import { listener } from "./storeListener";
import { localMediaReducer } from "./media/state";
import { selectedShowReducer } from "./base/selectedShow";
import { preflightReducer } from "./preflight";
import {
  connectToServer,
  serverConnectionReducer,
} from "./base/serverConnectionState";
import { createMainActionCreatorHandler } from "./actionProxies";
import { getLogger } from "./base/logging";
import { inspect } from "util";

const logger = getLogger("store");

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action !== "object" || action === null) {
    return next(action);
  }
  logger.info(`${(action as Action).type}`);
  logger.debug(inspect(action));
  return next(action);
};

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    localMedia: localMediaReducer,
    selectedShow: selectedShowReducer,
    preflight: preflightReducer,
    serverConnection: serverConnectionReducer,
  },
  middleware: (def) => def().concat(listener.middleware, loggerMiddleware),
});
globalThis.__MAIN_STORE = store;

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<A = void> = ThunkAction<A, AppState, unknown, Action>;

// IPC bits

ipcMain.on("dispatch", (event, action) => {
  store.dispatch(action);
});

ipcMain.handle("getState", () => store.getState());

export interface ExposedActionCreators extends ActionCreatorsMapObject {
  connectToServer: typeof connectToServer;
}
createMainActionCreatorHandler<ExposedActionCreators>({
  connectToServer,
});
