import { Dispatch } from "redux";
import type { AppState } from "../main/store";

interface RendererStoreAPIType {
  _dispatch: Dispatch;
  onStateChange: (
    callback: (actionType: string, newState: AppState) => void,
  ) => void;
  getState: () => Promise<AppState>;
}

declare global {
  interface Window {
    MainStoreAPI: RendererStoreAPIType;
  }
}
