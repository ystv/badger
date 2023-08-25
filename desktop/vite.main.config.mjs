/* eslint-disable @typescript-eslint/no-var-requires */
import { mergeConfig } from "vite";
import base from "./vite.base.config.mjs";

// https://vitejs.dev/config
export default mergeConfig(base, {
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ["module", "jsnext:main", "jsnext"],
    // Ensure that things we import from server will still work if they use Next's @-imports
    alias: {
      "@": "../server",
    },
    conditions: ["node"],
  },
  build: {
    minify: process.env.NODE_ENV === "development" ? false : "esbuild",
    sourcemap: true,
  },
  esbuild: {
    minifyIdentifiers: process.env.NODE_ENV !== "development",
  },
});
