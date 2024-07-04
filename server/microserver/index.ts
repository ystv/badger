/* eslint-disable no-console */

/**
 * This is the Badger Testing MicroServer.
 *
 * It is a Node/Express HTTP server that serves API responses that match Badger Server's API, with hard-coded data.
 * Intended for use for testing Badger Desktop (through the "standalone" Playwright suite), but could also be used
 * for local development of Desktop without needing to run the full Badger Server.
 *
 * The test data is in the `scenarios` directory. Each one is expected to have a `responses.ts` file that exports
 * an object called `responses` with tRPC procedures. If a procedure is not defined in a scenario, it will fall back
 * to the `default` scenario. Use `default` as a reference when writing new scenarios. (You can also import the
 * data `default` uses from `scenarios/default/responses.ts` - just make sure to not mutate it!)
 *
 * NB: to define a nested router's procedure, you need to use dotted object syntax, e.g. to define `shows.listUpcoming`,
 * you would write `"shows.listUpcoming": proc.query(async () => { ... })`. This is because the recursive objects
 * get a little too gnarly for TypeScript to infer the types correctly.
 *
 * If possible, write a test for your scenario. This should run against real Server, set up the same data that your
 * scenario uses (through the Server UI), and then assert that your mock responses match the real ones from Server.
 * This will ensure that our mocks match the real data.
 *
 * You can also take advantage of TypeScript: import the real AppRouter type from `@/app/api/_router` and use
 * `satisfies` to ensure that your mock responses match the real ones. Again, see `default` for an example.
 */

import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as path from "node:path";
import { MICRO_SERVER_AUTH_SHARED_SECRET, MICRO_SERVER_PORT, t } from "./lib";
import { readdirSync } from "node:fs";
import defaultResponses from "./scenarios/default/responses";
import { get, set } from "lodash";
import { json } from "body-parser";
import rewrite from "express-urlrewrite";

const app = express();

app.use(json());

app.use(rewrite("/api/trpc/*", "/default/api/trpc/$1"));

/**
 * Given an object where the values are either tRPC procedures or objects themselves with tRPC procedures,
 * convert it into a tRPC router.
 * (Essentially poor-man's-https://github.com/trpc/trpc/pull/3744 until tRPC 11 is released)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function routerize(obj: Record<string, any>) {
  for (const k of Object.keys(obj)) {
    if (typeof obj[k] === "object" && !("_def" in obj[k])) {
      obj[k] = routerize(obj[k]);
    }
  }
  return t.router(obj);
}

const scenarioRouters: Record<string, ReturnType<(typeof t)["router"]>> = {};
for (const scenario of readdirSync(path.join(__dirname, "scenarios"))) {
  console.log(`Building router for ${scenario}`);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const scenarioResponses = require(
    `./scenarios/${scenario}/responses`,
  ).default;
  const responses = {};
  for (const endpoint of Object.keys(scenarioResponses)) {
    set(responses, endpoint, scenarioResponses[endpoint]);
  }
  for (const endpoint of Object.keys(defaultResponses)) {
    if (!get(responses, endpoint)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(responses, endpoint, (defaultResponses as any)[endpoint]);
    }
  }

  scenarioRouters[scenario] = routerize(responses);
}

app.use("/:scenario/api/trpc", async (req, res, next) => {
  const bearerToken = req.header("authorization")?.split(" ")[1];
  if (bearerToken !== MICRO_SERVER_AUTH_SHARED_SECRET) {
    res.status(401).send("Unauthorized");
    return;
  }

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
- Server password: ${MICRO_SERVER_AUTH_SHARED_SECRET}

There is nothing more to see here.`);
});

app.listen(MICRO_SERVER_PORT, () => {
  console.log("MicroServer running.");
  console.log("Configure your Badger Desktop with the following details:");
  console.log("\tServer address: http://localhost:" + MICRO_SERVER_PORT);
  console.log("\tServer password: " + MICRO_SERVER_AUTH_SHARED_SECRET);
  console.log();
});
