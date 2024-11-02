/* eslint-disable no-console */
/**
 * Only used in development. Start up the core logic without any Electron bits,
 * and exposes an API that the "renderer" (running in a browser) can use to
 * interact with the core logic.
 */

import { createServer } from "node:http";
import { WebSocketServer } from "ws";
import {
  AppStore,
  exposedActionCreators,
  ExposedActionCreators,
  store,
} from "./store";
import { listenOnStore } from "./storeListener";
import { doPreflight } from "./preflight";
import express from "express";
import { json as bodyParserJSON } from "body-parser";
import { Action } from "redux";

const DEV_SERVER_PORT = 5174;

export function createReduxDevServer(
  store: AppStore,
  exposedActionCreators: ExposedActionCreators,
) {
  const app = express();
  app.use(bodyParserJSON());
  app.get("/getState", (req, res) => {
    res.json(store.getState());
  });
  app.post("/dispatch/:actionType", (req, res) => {
    const type = req.params.actionType as keyof ExposedActionCreators;
    if (!(type in exposedActionCreators)) {
      res.status(404).end(`Action ${type} not found`);
      return;
    }
    const body = req.body;
    if (!Array.isArray(body)) {
      res.status(400).end("Expected JSON array body");
      return;
    }
    const action = exposedActionCreators[type](
      // @ts-expect-error Some action creators don't take any arguments
      ...body,
    );
    const result = store.dispatch(action as Action);
    if (isThenable(result)) {
      result.then(
        (result: unknown) => {
          res.json(result);
        },
        (error: unknown) => {
          res.status(500).end(String(error));
        },
      );
    } else {
      res.json(result);
    }
  });
  const server = createServer(app);
  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    const unsub = listenOnStore({
      predicate: () => true,
      effect: (action, api) => {
        const state = api.getState();
        ws.send(JSON.stringify({ type: action.type, state }));
      },
    });
    ws.on("close", unsub);
  });
  console.log(
    `Redux Dev Server listening on http://localhost:${DEV_SERVER_PORT}`,
  );
  server.listen(DEV_SERVER_PORT);
  console.log("Doing preflight...");
  store.dispatch(doPreflight());
}

createReduxDevServer(store, exposedActionCreators);

function isThenable<T>(obj: unknown): obj is Promise<T> {
  return obj != null && typeof (obj as Promise<T>).then === "function";
}
