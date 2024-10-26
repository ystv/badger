import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppDispatch, AppState } from "./store";

export const listener = createListenerMiddleware();

export const listenOnStore = listener.startListening.withTypes<
  AppState,
  AppDispatch
>();
export const stopListeningOnStore = listener.stopListening;
