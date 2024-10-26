import { ActionCreatorsMapObject } from "redux";

/**
 * This function creates a proxy object that can be used to dispatch actions
 * to the main process store from the renderer process.
 */
export function createRendererActionCreatorsProxy<
  T extends ActionCreatorsMapObject,
>(): T {
  return new Proxy(
    {},
    {
      get(target, prop, receiver) {
        if (typeof prop === "string") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (...args: any[]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.MainStoreAPI._dispatch(prop as any, ...args);
          };
        }
        return Reflect.get(target, prop, receiver);
      },
    },
    // SHENANIGANS ARE AFOOT! This is what lets us do `dispatch.yourActionType` as if it were a function call.
  ) as T;
}
