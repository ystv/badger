import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { execFileSync } from "child_process";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require("./package.json");

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    sentryVitePlugin({
      org: "ystv",
      project: "bowser",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  define: {
    "global.__APP_VERSION__": JSON.stringify(packageJSON.version),
    "global.__BUILD_TIME__": JSON.stringify(new Date().toISOString()),
    "global.__GIT_COMMIT__": JSON.stringify(
      execFileSync("git", ["rev-parse", "HEAD"]).toString().trim(),
    ),
  },
});
