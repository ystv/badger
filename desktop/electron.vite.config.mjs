import commonjs from "vite-plugin-commonjs";
import * as fs from "node:fs";
import { execFileSync } from "node:child_process";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { mergeConfig, defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import ignore from "rollup-plugin-ignore";
import { electronToChromium } from "electron-to-chromium";

export default defineConfig(({ mode }) => {
  const packageJSON = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
  const gitCommit =
    process.env.GIT_REV ??
    execFileSync("git", ["rev-parse", "HEAD"]).toString().trim();
  const sentryRelease =
    "badger-desktop@" + packageJSON.version + "-" + gitCommit.slice(0, 7);

  const prod = mode === "production";

  const visualizeBundle = process.argv.includes("--visualize-bundle");

  const electronVersion = packageJSON.devDependencies.electron.replace("^", "");
  const chromeVersion = electronToChromium(electronVersion);
  let chromeMajor;
  if (chromeVersion) {
    chromeMajor = parseInt(chromeVersion.split(".")[0]);
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      `Failed to find Chrome version for Electron ${electronVersion}.`,
    );
    // eslint-disable-next-line no-console
    console.warn(
      `Please update the electron-to-chromium package to get the latest mappings.`,
    );
    // eslint-disable-next-line no-console
    console.warn(`Assuming Chromium 126 for Electron v31.1.0`);
    chromeMajor = 126;
  }

  const base = defineConfig({
    define: {
      "global.__APP_VERSION__": JSON.stringify(packageJSON.version),
      "global.__BUILD_TIME__": JSON.stringify(new Date().toISOString()),
      "global.__GIT_COMMIT__": JSON.stringify(gitCommit),
      "global.__SENTRY_RELEASE__": JSON.stringify(sentryRelease),
      "global.__ENVIRONMENT__": JSON.stringify(
        process.env.ENVIRONMENT ?? "(no ENVIRONMENT set)",
      ),
      // write-file-atomic uses __filename which doesn't work in ESM, so we hack it
      __filename: JSON.stringify("__filename"),
    },
    plugins: [
      // Fix Prisma runtime trying to get bundled
      ignore(["../../client", "@prisma/engines"]),
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
      minify: mode === "development" ? false : "esbuild",
      manifest: true,
      rollupOptions: {
        output: {
          format: "es",
        },
        onwarn(warning, warn) {
          // Suppress module level directive warnings - these are all "use client" which is fine
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
            return;
          }
          // Suppress eval warning from Prisma
          if (
            warning.message.includes(
              `Use of eval in "../utility/prisma/client/runtime/library.js" is strongly discouraged`,
            )
          ) {
            return;
          }
          warn(warning);
        },
        onLog(level, log, handler) {
          // Something odd about Prisma triggers this
          if (
            log.cause &&
            log.cause.message === `Can't resolve original location of error.`
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
    main: mergeConfig(
      base,
      defineConfig({
        plugins: [
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
          target: "node20", // Electron 31
          sourcemap: true,
          rollupOptions: {
            logLevel: "debug",
          },
        },
      }),
    ),
    renderer: mergeConfig(
      base,
      defineConfig({
        plugins: [
          visualizeBundle &&
            visualizer({
              filename: "bundle-renderer.html",
            }),
        ].filter(Boolean),
        build: {
          target: `chrome${chromeMajor}`,
          rollupOptions: {
            input: "./src/renderer/index.html",
          },
        },
      }),
    ),
    preload: mergeConfig(
      base,
      defineConfig({
        plugins: [
          visualizeBundle &&
            visualizer({
              filename: "bundle-preload.html",
            }),
        ].filter(Boolean),
        build: {
          target: `node20`,
          lib: {
            entry: "./src/common/preload.ts",
          },
          rollupOptions: {
            output: {
              // Sandboxed preload script don't support ESM yet
              format: "cjs",
            },
          },
        },
      }),
    ),
  };

  return config;
});
