/* eslint-disable @typescript-eslint/no-var-requires */
import { mergeConfig, defineConfig } from "vite";
import base from "./vite.base.config.mjs";
import cjsPlugin from "vite-plugin-commonjs";

// https://vitejs.dev/config
export default mergeConfig(
  base,
  defineConfig({
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
    plugins: [
      ...base.plugins,
      new cjsPlugin({
        dynamic: true,
      }),
    ],
  }),
);
