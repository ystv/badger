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

/*
 * Explanation of this gross hack:
 * We cannot allow the Prisma runtime to get bundled into the desktop build, else it will fail
 * to start. We do, however, need the TypeScript types of the Prisma models. This is normally
 * not a problem because of zod-prisma-types, which generates @badger/prisma/types, which we
 * can import (and forbid importing @badger/prisma/client).
 * However, zod-prisma-types still needs to import the actual Prisma client in one place,
 * transformJsonNull.ts, so that it can access Prisma.JsonNull/Prisma.DbNull.
 * 
 * To fix this, we stub out this one import, which thereby ensures the Prisma client runtime
 * never gets bundled in. This is safe to do, because we will never need to interact with
 * Prisma.{Db,Json}Null in Desktop.
 */
const jsonNullStub = "export const transformJsonNull = v => v; export default transformJsonNull;"
const jsonNullStubPlaceholder = "\0ignore_prisma_placeholder"
/** @type {import("vite").Plugin} */
const IgnorePrismaJsonNullPlugin = {
  name: "ignorePrismaJsonNull",
  resolveId(importee) {
    if (importee.includes("transformJsonNull")) {
      return jsonNullStubPlaceholder;
    }
    return null;
  },
  load(name) {
    return name === jsonNullStubPlaceholder ? {
      code: jsonNullStub,
      moduleSideEffects: false,
    } : null;
  },
  enforce: "pre"
};

const base = defineConfig({
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
      external: [
        // Don't bundle Prisma into Desktop
        /prisma\/client\/runtime/,
      ],
    },
  },
});

/**
 * @type {import('electron-vite').UserConfig}
 */
const config = {
  main: mergeConfig(base, defineConfig({
    plugins: [
      IgnorePrismaJsonNullPlugin,
      commonjs(),
      visualizeBundle &&
      visualizer({
        filename: "bundle-main.html",
      }),
    ].filter(Boolean),
    resolve: {
      conditions: ["node"],
      browserField: false,
    },
    build: {
      sourcemap: true,
    }
  })),
  renderer: mergeConfig(base, defineConfig({
    plugins: [
      visualizeBundle &&
      visualizer({
        filename: "bundle-renderer.html",
      }),
    ].filter(Boolean),
    build: {
      rollupOptions: {
        input: "./src/renderer/index.html",
      },
    },
  })),
  preload: mergeConfig(base, defineConfig({
    plugins: [
      visualizeBundle &&
      visualizer({
        filename: "bundle-preload.html",
      }),
    ].filter(Boolean),
    build: {
      lib: {
        entry: "./src/common/preload.ts",
      },
    },
  })),
};

export default config;
