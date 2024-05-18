import commonjs from "vite-plugin-commonjs";
import * as fs from "node:fs";
import { execFileSync } from "node:child_process";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { mergeConfig, defineConfig } from "vite";

const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const gitCommit =
  process.env.GIT_REV ??
  execFileSync("git", ["rev-parse", "HEAD"]).toString().trim();
const sentryRelease =
  "badger-desktop@" + packageJSON.version + "-" + gitCommit.slice(0, 7);

const base = defineConfig({
  define: {
    "global.__APP_VERSION__": JSON.stringify(packageJSON.version),
    "global.__BUILD_TIME__": JSON.stringify(new Date().toISOString()),
    "global.__GIT_COMMIT__": JSON.stringify(gitCommit),
    "global.__SENTRY_RELEASE__": JSON.stringify(sentryRelease),
  },
  plugins: [
    sentryVitePlugin({
      org: "ystv",
      project: "badger-desktop",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: {
        name: sentryRelease,
      },
    }),
  ],
  build: {
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
          log.cause.message === `Can't resolve original location of error.`
        ) {
          return;
        }
        if (
          log.cause &&
          log.cause.message.startsWith(
            `Use of eval in "../utility/prisma/client/runtime/library.js" is strongly discouraged`,
          )
        ) {
          return;
        }
        handler(level, log);
      },
    },
  },
});

/**
 * @type {import('electron-vite').UserConfig}
 */
const config = {
  main: mergeConfig(base, {
    plugins: [commonjs()],
    resolve: {
      conditions: ["node"],
      browserField: false,
    },
  }),
  renderer: mergeConfig(base, {
    build: {
      rollupOptions: {
        input: "./src/renderer/index.html",
      },
    },
  }),
  preload: mergeConfig(base, {
    build: {
      lib: {
        entry: "./src/common/preload.ts",
      },
    },
  }),
};

export default config;
