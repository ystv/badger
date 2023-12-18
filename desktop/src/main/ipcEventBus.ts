import { Events } from "../common/ipcEvents";
import { Subscribable } from "rxjs";
import { getLogger } from "./logging";

const logger = getLogger("ipcEventBus");

let sender: (evt: keyof Events, ...args: unknown[]) => void = () => {
  throw new Error("sender not initialized");
};

export function setSender(newSender: typeof sender) {
  sender = newSender;
}

export const IPCEvents = {
  send(evt: keyof Events, ...args: unknown[]) {
    logger.debug(`sending ${evt}`);
    sender(evt, ...args);
  },
};

export function emitObservable<K extends keyof Events>(
  evt: K,
  obs: Subscribable<Parameters<Events[K]>[0]>,
) {
  obs.subscribe({
    next(val) {
      logger.debug(`emitting observable ${evt}`);
      sender(evt, val);
    },
  });
}
