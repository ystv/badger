import { builtinModules } from "node:module";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { execFileSync } from "child_process";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("./package.json");

export const builtins = [
  "electron",
  ...builtinModules.map((m) => [m, `node:${m}`]).flat(),
];

export const external = [
  ...builtins,
  "../../client/index.js",
  ...Object.keys(pkg.dependencies || {}),
];

const gitCommit =
  process.env.GIT_REV ??
  execFileSync("git", ["rev-parse", "HEAD"]).toString().trim();
const sentryRelease =
  "badger-desktop@" + pkg.version + "-" + gitCommit.slice(0, 7);

/** @type {(env: import('vite').ConfigEnv<'build'>) => import('vite').UserConfig} */
export const getBuildConfig = (env) => {
  const { root, mode, command } = env;

  return {
    root,
    mode,
    build: {
      // Prevent multiple builds from interfering with each other.
      emptyOutDir: false,
      // 🚧 Multiple builds may conflict.
      outDir: ".vite/build",
      watch: command === "serve" ? {} : null,
      minify:
        process.env.NODE_ENV === "development" || command !== "build"
          ? false
          : "esbuild",
      sourcemap: true,
    },
    clearScreen: false,
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
    esbuild: {
      minifyIdentifiers: process.env.NODE_ENV !== "development",
    },
  };
};

/** @type {(names: string[]) => { [name: string]: VitePluginRuntimeKeys } }} */
export const getDefineKeys = (names) => {
  /** @type {{ [name: string]: VitePluginRuntimeKeys }} */
  const define = {};

  return names.reduce((acc, name) => {
    const NAME = name.toUpperCase();
    /** @type {VitePluginRuntimeKeys} */
    const keys = {
      VITE_DEV_SERVER_URL: `${NAME}_VITE_DEV_SERVER_URL`,
      VITE_NAME: `${NAME}_VITE_NAME`,
      "global.__APP_VERSION__": JSON.stringify(pkg.version),
      "global.__BUILD_TIME__": JSON.stringify(new Date().toISOString()),
      "global.__GIT_COMMIT__": JSON.stringify(gitCommit),
      "global.__SENTRY_RELEASE__": JSON.stringify(sentryRelease),
    };

    return { ...acc, [name]: keys };
  }, define);
};

/** @type {(env: import('vite').ConfigEnv<'build'>) => Record<string, any>} */
export const getBuildDefine = (env) => {
  const { command, forgeConfig } = env;
  const names = forgeConfig.renderer
    .filter(({ name }) => name != null)
    .map(({ name }) => name);
  const defineKeys = getDefineKeys(names);
  const define = Object.entries(defineKeys).reduce((acc, [name, keys]) => {
    const { VITE_DEV_SERVER_URL, VITE_NAME } = keys;
    const def = {
      [VITE_DEV_SERVER_URL]:
        command === "serve"
          ? JSON.stringify(process.env[VITE_DEV_SERVER_URL])
          : undefined,
      [VITE_NAME]: JSON.stringify(name),
    };
    return { ...acc, ...def };
  }, {});

  return define;
};

/** @type {(name: string) => import('vite').Plugin} */
export const pluginExposeRenderer = (name) => {
  const { VITE_DEV_SERVER_URL } = getDefineKeys([name])[name];

  return {
    name: "@electron-forge/plugin-vite:expose-renderer",
    configureServer(server) {
      process.viteDevServers ??= {};
      // Expose server for preload scripts hot reload.
      process.viteDevServers[name] = server;

      server.httpServer?.once("listening", () => {
        /** @type {import('node:net').AddressInfo} */
        const addressInfo = server.httpServer?.address();
        // Expose env constant for main process use.
        process.env[VITE_DEV_SERVER_URL] =
          `http://localhost:${addressInfo?.port}`;
      });
    },
  };
};

/** @type {(command: 'reload' | 'restart') => import('vite').Plugin} */
export const pluginHotRestart = (command) => {
  return {
    name: "@electron-forge/plugin-vite:hot-restart",
    closeBundle() {
      if (command === "reload") {
        for (const server of Object.values(process.viteDevServers)) {
          // Preload scripts hot reload.
          server.ws.send({ type: "full-reload" });
        }
      } else {
        // Main process hot restart.
        // https://github.com/electron/forge/blob/v7.2.0/packages/api/core/src/api/start.ts#L216-L223
        process.stdin.emit("data", "rs");
      }
    },
  };
};
