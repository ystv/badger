/* eslint-disable @typescript-eslint/no-var-requires */
import * as esbuild from "esbuild";
import { sentryEsbuildPlugin } from "@sentry/esbuild-plugin";
import packageJSON from "./package.json" assert { type: "json" };
import { execFileSync } from "child_process";
import { copyFile } from "fs/promises";
import * as glob from "glob";
import path from "path";

const gitCommit =
  process.env.GIT_REV ??
  execFileSync("/usr/bin/git", ["rev-parse", "HEAD"]).toString().trim();

const sentryRelease =
  "bowser-jobrunner@" + packageJSON.version + "-" + gitCommit.slice(0, 7);

await esbuild.build({
  bundle: true,
  entryPoints: ["./src/index.ts"],
  outfile: "./dist/index.cjs",
  sourcemap: true,
  platform: "node",
  target: "node18",
  define: {
    __APP_VERSION__: JSON.stringify(packageJSON.version),
    __GIT_COMMIT__: JSON.stringify(gitCommit),
    __SENTRY_RELEASE__: JSON.stringify(sentryRelease),
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [
    sentryEsbuildPlugin({
      org: "ystv",
      project: "bowser-jobrunner",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: {
        name: sentryRelease,
      },
      disable: process.env.IS_PRODUCTION_BUILD !== "true",
    }),
  ],
});

// Ensure Prisma still works
await copyFile("../utility/prisma/schema.prisma", "dist/schema.prisma");
const enginesPath = glob.globSync("../utility/prisma/client/*.node");
if (enginesPath.length !== 1) {
  throw new Error("Expected exactly one Prisma engine binary");
}
await copyFile(enginesPath[0], "dist/" + path.basename(enginesPath[0]));
