/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig, mergeConfig } from "vite";
import {
  getBuildConfig,
  getBuildDefine,
  external,
  pluginHotRestart,
} from "./vite.base.config.mjs";
import commonJS from "vite-plugin-commonjs";

// https://vitejs.dev/config
export default defineConfig((env) => {
  /** @type {import('vite').ConfigEnv<'build'>} */
  const forgeEnv = env;
  const { forgeConfigSelf } = forgeEnv;
  const define = getBuildDefine(forgeEnv);
  const config = {
    build: {
      lib: {
        entry: forgeConfigSelf.entry,
        fileName: "[name].js",
        formats: ["cjs"],
      },
      rollupOptions: {
        external,
        output: {
          format: "cjs",
          // It should not be split chunks.
          inlineDynamicImports: true,
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
        },
      },
    },
    plugins: [pluginHotRestart("restart"), commonJS()],
    define,
    resolve: {
      // Load the Node.js entry.
      mainFields: ["module", "jsnext:main", "jsnext"],
      // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
      browserField: false,
      // Ensure that things we import from server will still work if they use Next's @-imports
      alias: {
        "@": "../server",
      },
      conditions: ["node"],
    },
  };
  return mergeConfig(getBuildConfig(forgeEnv), config);
});
