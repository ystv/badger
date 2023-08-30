import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { execFileSync } from "child_process";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require("./package.json");
const gitCommit =
  process.env.GIT_REV ??
  execFileSync("git", ["rev-parse", "HEAD"]).toString().trim();
const sentryRelease =
  "bowser-desktop@" + packageJSON.version + "-" + gitCommit.slice(0, 7);

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    sentryVitePlugin({
      org: "ystv",
      project: "bowser-desktop",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: {
        name: sentryRelease,
      },
    }),
  ],
  define: {
    "global.__APP_VERSION__": JSON.stringify(packageJSON.version),
    "global.__BUILD_TIME__": JSON.stringify(new Date().toISOString()),
    "global.__GIT_COMMIT__": JSON.stringify(gitCommit),
    "global.__SENTRY_RELEASE__": JSON.stringify(sentryRelease),
  },
  build: {
    rollupOptions: {
      // This shouldn't even be making it into the build if tree shaking is working properly
      external: ["@aws-sdk/client-s3"],
    },
  },
});
