import { ActionCreatorsMapObject } from "redux";

/**
 * This function creates a proxy object that can be used to dispatch actions
 * to the main process store from the renderer process.
 */
export function createRendererActionCreatorsProxy<
  T extends ActionCreatorsMapObject,
>() {
  return new Proxy(
    {},
    {
      get(target, prop, receiver) {
        if (typeof prop === "string") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (...args: any[]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return window.MainStoreAPI._dispatch(prop as any, ...args);
          };
        }
        return Reflect.get(target, prop, receiver);
      },
    },
    // SHENANIGANS ARE AFOOT! This is what lets us do `dispatch.yourActionType` as if it were a function call.
  ) as {
    // This mapped type lets us get the type you get when dispatching the action creator.
    [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<ReturnType<T[K]>>;
  };
}
