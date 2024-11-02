import {
  Action,
  configureStore,
  Middleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { settingsReducer } from "./base/settings";
import { listener } from "./storeListener";
import { localMediaActions, localMediaReducer } from "./media/state";
import {
  _enterReducer,
  _exitReducer,
  changeSelectedShow,
  selectedShowReducer,
} from "./base/selectedShow";
import { preflightReducer } from "./preflight";
import {
  connectToServer,
  serverConnectionReducer,
} from "./base/serverConnectionState";
import { getLogger } from "./base/logging";
import { inspect } from "util";
import { serverDataSlice } from "./base/serverDataState";
import { addContinuityItemAsScene, obsConnect, obsSlice } from "./obs/state";
import { integrationsReducer } from "./base/integrations";
import { connectToOntime, ontimeReducer } from "./ontime/state";

const logger = getLogger("store");

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action !== "object" || action === null) {
    return next(action);
  }
  logger.info(`${(action as Action).type}`);
  logger.debug(inspect(action));
  return next(action);
};

const topReducer = combineReducers({
  settings: settingsReducer,
  localMedia: localMediaReducer,
  preflight: preflightReducer,
  serverConnection: serverConnectionReducer,
  serverData: serverDataSlice.reducer,
  obs: obsSlice.reducer,
  integrations: integrationsReducer,
  ontime: ontimeReducer,
});

export interface AppState extends ReturnType<typeof topReducer> {
  selectedShow: ReturnType<typeof selectedShowReducer>;
}

export const store = configureStore({
  reducer: (state: AppState | undefined, action) => {
    // Since nearly every other bit of the application depends on the selected show,
    // we have a shortcut to allow all the other reducers to access it without embedding
    // it in their state. In effect, we temporarily set the selected show as a global variable,
    // expose it to reducers through the getSelectedShow function, and then immediately unset it.
    //
    // This seems like a side effect and thus forbidden in Redux, but it's actually
    // valid, since it's only used within the reducer function itself.
    // This is a way to apply the "reducer compostion" pattern within the constraints
    // of Redux Toolkit. The "clean" Redux way would be for all the other reducers to
    // take the current show state as a third argument, but Redux Toolkit doesn't support
    // this and we don't want to re-implement it. So we use this global as a pseudo-argument.
    //
    // Note that, if any other slices want to react to changes in the selected show, they
    // will need to include showDataChangeMatcher as a reducer case as normal.
    const selectedShowState = selectedShowReducer(state?.selectedShow, action);
    _enterReducer(selectedShowState.show);
    const rest = topReducer(state, action);
    _exitReducer();
    return {
      selectedShow: selectedShowState,
      ...rest,
    };
  },
  middleware: (def) =>
    def({
      serializableCheck: false, // we have Dates in our state
    }).concat(listener.middleware, loggerMiddleware),
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<A = void> = ThunkAction<A, AppState, unknown, Action>;

export const exposedActionCreators = {
  connectToServer,
  changeSelectedShow,
  queueMediaDownload: localMediaActions.queueMediaDownload,
  downloadAllMediaForSelectedShow:
    localMediaActions.downloadAllMediaForSelectedShow,
  obsConnect,
  addContinuityItemAsScene,
  connectToOntime,
};
export type ExposedActionCreators = typeof exposedActionCreators;
