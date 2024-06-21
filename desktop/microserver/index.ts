/* eslint-disable no-console */

import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as path from "node:path";
import { MICRO_SERVER_PORT, proc, t } from "./lib";
import { readdirSync } from "node:fs";
import defaultResponses from "./scenarios/default/responses";
import { get, set } from "lodash";
import SuperJSON from "superjson";
import { json } from "body-parser";
import rewrite from "express-urlrewrite";

const app = express();

app.use(json());

app.use(rewrite("/api/trpc/*", "/default/api/trpc/$1"));

const scenarioRouters: Record<string, ReturnType<(typeof t)["router"]>> = {};
for (const scenario of readdirSync(path.join(__dirname, "scenarios"))) {
  console.log(`Building router for ${scenario}`);
  const scenarioResponses = require(
    `./scenarios/${scenario}/responses`,
  ).default;
  const responses = {};
  for (const endpoint of Object.keys(scenarioResponses)) {
    set(responses, endpoint, scenarioResponses[endpoint]);
  }
  for (const endpoint of Object.keys(defaultResponses)) {
    if (!get(responses, endpoint)) {
      set(responses, endpoint, (defaultResponses as any)[endpoint]);
    }
  }
  scenarioRouters[scenario] = t.router(responses);
}

app.use("/:scenario/api/trpc", async (req, res, next) => {
  const bearerToken = req.header("authorization")?.split(" ")[1];
  // if (bearerToken !== "microserver") {
  //   res.status(401).send("Unauthorized");
  //   return;
  // }

  const scenarioName = req.params.scenario;
  const scenarioRouter = scenarioRouters[scenarioName];
  if (!scenarioRouter) {
    res.status(404).send("Scenario not found");
    return;
  }
  req.url.replace(`/${scenarioName}`, "");
  trpcExpress.createExpressMiddleware({
    router: scenarioRouter,
    createContext: () => ({}),
  })(req, res, next);
});

app.use("/testMedia", express.static(path.join(__dirname, "testMedia")));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(`This is the Badger Desktop MicroServer.
Use it for testing or developing Badger Desktop.

Configure your Badger Desktop with the following details:
- Server address: http://localhost:${MICRO_SERVER_PORT}
- Server password: microserver

There is nothing more to see here.`);
});

app.listen(MICRO_SERVER_PORT, () => {
  console.log("MicroServer running.");
  console.log("Configure your Badger Desktop with the following details:");
  console.log("\tServer address: http://localhost:" + MICRO_SERVER_PORT);
  console.log("\tServer password: microserver");
  console.log();
});
