import invariant from "../common/invariant";
import { ipcMain } from "electron";
import { ActionCreatorsMapObject } from "redux";
import { AppStore, ExposedActionCreators } from "./store";
import { getLogger } from "./base/logging";

const logger = getLogger("storeIpc");

export function setupStoreIPC(
  store: AppStore,
  exposedActionCreators: ExposedActionCreators,
) {
  ipcMain.on("dispatch", (event, action) => {
    store.dispatch(action);
  });

  ipcMain.handle("getState", () => store.getState());

  ipcMain.handle("dispatch", (event, actionType, ...args) => {
    invariant(
      actionType in exposedActionCreators,
      "Tried to dispatch non-exposed action " + actionType,
    );
    logger.info(`Dispatching action ${actionType}`);
    const creator = (exposedActionCreators as ActionCreatorsMapObject)[
      actionType
    ];
    const result = store.dispatch(creator(...args));
    return result;
  });
}
