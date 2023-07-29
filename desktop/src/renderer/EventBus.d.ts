import { Events } from "../common/ipcEvents";

interface EventBusType {
  on<K extends keyof Events>(
    evt: K,
    callback: (...args: Parameters<Events[K]>) => void,
  ): void;
  once<K extends keyof Events>(
    evt: K,
    callback: (...args: Parameters<Events[K]>) => void,
  ): void;
  off<K extends keyof Events>(
    evt: K,
    callback: (...args: Parameters<Events[K]>) => void,
  ): void;
}

declare global {
  interface Window {
    EventBus: EventBusType;
  }
}
