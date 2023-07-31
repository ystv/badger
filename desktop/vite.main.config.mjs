import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
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
      minify: env.NODE_ENV === "development" ? false : "esbuild",
      sourcemap: true,
    },
    esbuild: {
      minifyIdentifiers: env.NODE_ENV !== "development",
    },
  };
});
