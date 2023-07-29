import { Events } from "../common/ipcEvents";
import { Subscribable } from "rxjs";
import { selectedShow } from "./selectedShow";

let sender: (evt: keyof Events, ...args: unknown[]) => void = () => {
  throw new Error("sender not initialized");
};

export function setSender(newSender: typeof sender) {
  sender = newSender;
}

export const IPCEvents = new Proxy(Events, {
  get: (target, prop: keyof Events) => {
    return (...args: unknown[]) => {
      sender(prop, ...args);
    };
  },
});

export function emitObservable<K extends keyof Events>(
  evt: K,
  obs: Subscribable<Parameters<Events[K]>[0]>,
) {
  obs.subscribe({
    next(val) {
      sender(evt, val);
    },
  });
}
