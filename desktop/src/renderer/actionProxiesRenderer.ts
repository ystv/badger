import { ActionCreatorsMapObject } from "redux";

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
  ) as T;
}
