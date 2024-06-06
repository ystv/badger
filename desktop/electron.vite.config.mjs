import commonjs from "vite-plugin-commonjs";
import * as fs from "node:fs";
import { execFileSync } from "node:child_process";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { mergeConfig, defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import ignore from "rollup-plugin-ignore";

const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const gitCommit =
  process.env.GIT_REV ??
  execFileSync("git", ["rev-parse", "HEAD"]).toString().trim();
const sentryRelease =
  "badger-desktop@" + packageJSON.version + "-" + gitCommit.slice(0, 7);

const prod = process.env.ENVIRONMENT === "prod";

const visualizeBundle = process.argv.includes("--visualize-bundle");

const base = defineConfig({
  define: {
    "global.__APP_VERSION__": JSON.stringify(packageJSON.version),
    "global.__BUILD_TIME__": JSON.stringify(new Date().toISOString()),
    "global.__GIT_COMMIT__": JSON.stringify(gitCommit),
    "global.__SENTRY_RELEASE__": JSON.stringify(sentryRelease),
    "global.__ENVIRONMENT__": JSON.stringify(process.env.ENVIRONMENT)
  },
  plugins: [
    // Fix Prisma runtime trying to get bundled
    ignore(["../../client"]),
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
    plugins: [commonjs(), visualizeBundle && visualizer({
      filename: "bundle-main.html",
    })].filter(Boolean),
    resolve: {
      conditions: ["node"],
      browserField: false,
    },
  }),
  renderer: mergeConfig(base, {
    plugins: [visualizeBundle && visualizer({
      filename: "bundle-renderer.html",
    })].filter(Boolean),
    build: {
      rollupOptions: {
        input: "./src/renderer/index.html",
      },
    },
  }),
  preload: mergeConfig(base, {
    plugins: [visualizeBundle && visualizer({
      filename: "bundle-preload.html",
    })].filter(Boolean),
    build: {
      lib: {
        entry: "./src/common/preload.ts",
      },
    },
  }),
};

export default config;
