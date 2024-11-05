import commonjs from "vite-plugin-commonjs";
import { mergeConfig, defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { base } = require("./vite.config.mjs");

const visualizeBundle = process.env.VISUALIZE_BUNDLE === "true";

/*
 * Explanation of this gross hack:
 * We cannot allow the Prisma runtime to get bundled into the desktop build, else it will fail
 * to start. We do, however, need the TypeScript types of the Prisma models. This is normally
 * not a problem because of zod-prisma-types, which generates @badger/prisma/types, which we
 * can import (and forbid importing @badger/prisma/client).
 * However, zod-prisma-types still needs to import the actual Prisma client in one place,
 * transformJsonNull.ts, so that it can access Prisma.JsonNull/Prisma.DbNull. Luckily
 * we never use those types in Desktop.
 *
 * To fix this, we stub out this one import, which thereby ensures the Prisma client runtime
 * never gets bundled in. This is safe to do, because we will never need to interact with
 * Prisma.{Db,Json}Null in Desktop.
 */
const jsonNullStub =
  "export const transformJsonNull = v => v; export default transformJsonNull;";
const jsonNullStubPlaceholder = "\0ignore_prisma_placeholder";
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
    return name === jsonNullStubPlaceholder
      ? {
          code: jsonNullStub,
          moduleSideEffects: false,
        }
      : null;
  },
  enforce: "pre",
};

/**
 * @type {import('electron-vite').UserConfig}
 */
const config = {
  main: mergeConfig(
    base,
    defineConfig({
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
        lib: {
          entry: "./src/common/preload.ts",
        },
      },
    }),
  ),
};

export default config;
