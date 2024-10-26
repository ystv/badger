import {
  Action,
  configureStore,
  Middleware,
  PayloadAction,
} from "@reduxjs/toolkit";
import type { AppState, ExposedActionCreators } from "../main/store";
import { useSelector, useStore } from "react-redux";
import { createRendererActionCreatorsProxy } from "./actionProxiesRenderer";

/**
 * The Renderer store works a little bit interestingly.
 * It is still a fully-fledged Redux store, but its only purpose
 * is to mirror the state of the main process store.
 *
 * The main process store has a middleware that emits IPC events
 * when it changes, which are available through Store.onStateChange.
 * The renderer store has a listener that listens for these events
 * and updates its state. It does this by dispatching an "action"
 * with the same name as the original action with a "@@main/" prefix, but with a payload
 * that is the new state. Meanwhile the renderer reducer just
 * replaces the state with the payload. That way Redux DevTools
 * still works in the renderer process.
 *
 * Meanwhile, actions from the renderer process are dispatched to the main
 * process store through the MainStoreAPI.dispatch object. We use a middleware
 * to ensure that any usage of useDispatch in the renderer process is caught.
 */

const mainProcessActionRedirectMiddleware: Middleware =
  (store) => (next) => (action) => {
    // Don't try to handle non-object actions
    if (typeof action !== "object" || action === null) {
      return next(action);
    }
    // Don't intercept Redux built-in actions, or those from the main process
    if ((action as Action).type.startsWith("@@")) {
      return next(action);
    }
    // Redirect all other dispatches back to the main process
    throw new Error(
      `Unexpected dispatch of ${(action as Action).type} in the renderer process. Add it to the exposed list in main/store.ts, then use window.MainStoreAPI.dispatch.yourActionType.`,
    );
  };

export const store = configureStore({
  reducer: (state = {}, action: PayloadAction<AppState>) => action.payload,
  middleware: (def) =>
    def({
      thunk: false,
    }).concat(mainProcessActionRedirectMiddleware),
});

let stateInitialised = false;

window.MainStoreAPI.onStateChange((actionType, newState) => {
  store.dispatch({
    type: actionType,
    payload: newState,
  });
  stateInitialised = true;
});

window.MainStoreAPI.getState().then((state) => {
  if (!stateInitialised) {
    store.dispatch({
      type: "@@INIT",
      payload: state,
    });
  }
});

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<typeof store>();

export const dispatch =
  createRendererActionCreatorsProxy<ExposedActionCreators>();
