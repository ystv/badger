import commonjs from "vite-plugin-commonjs";

/**
 * @type {import('electron-vite').UserConfig}
 */
const config = {
  main: {
    plugins: [commonjs()],
  },
  renderer: {
    build: {
      rollupOptions: {
        input: "./src/renderer/index.html",
        onwarn(warning, warn) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
            return;
          }
          warn(warning);
        },
      },
    },
  },
  preload: {
    build: {
      lib: {
        entry: "./src/common/preload.ts",
      },
    },
  },
};

export default config;
