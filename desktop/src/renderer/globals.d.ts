import { Dispatch } from "redux";
import type { AppState } from "../main/store";

interface MainStoreAPIType {
  /** @deprecated Not actually deprecated, but you probably want to use the `dispatch` proxy object from `state.ts` instead. */
  _dispatch: Dispatch;
  onStateChange: (
    callback: (actionType: string, newState: AppState) => void,
  ) => void;
  getState: () => Promise<AppState>;
}

declare global {
  interface Window {
    MainStoreAPI: MainStoreAPIType;
  }
}
