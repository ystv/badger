// @ts-check

import { defineConfig, mergeConfig } from "vite";
import * as fs from "node:fs";
import { execFileSync } from "node:child_process";
import { sentryVitePlugin } from "@sentry/vite-plugin";

const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const gitCommit =
  process.env.GIT_REV ??
  execFileSync("git", ["rev-parse", "HEAD"]).toString().trim();
const sentryRelease =
  "badger-desktop@" + packageJSON.version + "-" + gitCommit.slice(0, 7);

const prod = process.env.ENVIRONMENT === "prod";

export const base = defineConfig({
  define: {
    "global.__APP_VERSION__": JSON.stringify(packageJSON.version),
    "global.__BUILD_TIME__": JSON.stringify(new Date().toISOString()),
    "global.__GIT_COMMIT__": JSON.stringify(gitCommit),
    "global.__SENTRY_RELEASE__": JSON.stringify(sentryRelease),
    "global.__ENVIRONMENT__": JSON.stringify(process.env.ENVIRONMENT),
  },
  plugins: [
    sentryVitePlugin({
      org: "ystv",
      project: "badger-desktop",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: {
        name: sentryRelease,
      },
      disable: process.env.IS_YSTV_BUILD !== "true",
    }),
  ],
  build: {
    minify: prod ? "esbuild" : false,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
      onLog(level, log, handler) {
        if (
          log.cause &&
          // @ts-expect-error - this is a private API
          log.cause.message === `Can't resolve original location of error.`
        ) {
          return;
        }
        if (
          log.cause &&
          // @ts-expect-error - this is a private API
          log.cause.message.startsWith(
            `Use of eval in "../utility/prisma/client/runtime/library.js" is strongly discouraged`,
          )
        ) {
          return;
        }
        handler(level, log);
      },
      external: [
        // Don't bundle Prisma into Desktop
        /prisma\/client\/runtime/,
      ],
    },
  },
});

export default mergeConfig(
  base,
  defineConfig({
    root: "./src/renderer",
    server: {
      proxy: {
        "/_dev": {
          target: "http://localhost:5174",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/_dev/, ""),
        },
      },
    },
  }),
);
