import { ActionCreatorsMapObject } from "@reduxjs/toolkit";
import { ipcMain, ipcRenderer } from "electron";
import invariant from "../common/invariant";
import { getLogger } from "./base/logging";

const logger = getLogger("actionProxies");

export function createMainActionCreatorHandler<
  T extends ActionCreatorsMapObject,
>(actionCreators: T) {
  ipcMain.handle("dispatch", (event, actionType, ...args) => {
    invariant(
      actionType in actionCreators,
      "Tried to dispatch non-exposed action " + actionType,
    );
    logger.info(`Dispatching action ${actionType}`);
    const creator = actionCreators[actionType];
    globalThis.__MAIN_STORE.dispatch(creator(...args));
  });
}
