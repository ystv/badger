import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { execFileSync } from "child_process";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require("./package.json");
const gitCommit = execFileSync("git", ["rev-parse", "HEAD"]).toString().trim();
const sentryRelease =
  "bowser-desktop@" + packageJSON.version + "-" + gitCommit.slice(0, 7);

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    sentryVitePlugin({
      org: "ystv",
      project: "bowser",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: sentryRelease,
    }),
  ],
  define: {
    "global.__APP_VERSION__": JSON.stringify(packageJSON.version),
    "global.__BUILD_TIME__": JSON.stringify(new Date().toISOString()),
    "global.__GIT_COMMIT__": JSON.stringify(gitCommit),
    "global.__SENTRY_RELEASE__": JSON.stringify(sentryRelease),
  },
});
