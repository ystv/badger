/* eslint-disable @typescript-eslint/no-var-requires */
const { sentryEsbuildPlugin } = require("@sentry/esbuild-plugin");

const packageJSON = require("./package.json");
const gitCommit = require("child_process")
  .execFileSync("git", ["rev-parse", "HEAD"])
  .toString()
  .trim();
const sentryRelease =
  "bowser-jobrunner@" + packageJSON.version + "-" + gitCommit.slice(0, 7);

require("esbuild").build({
  bundle: true,
  entryPoints: ["./src/index.ts"],
  outfile: "./dist/index.cjs",
  sourcemap: true,
  platform: "node",
  target: "node18",
  define: {
    __APP_VERSION__: JSON.stringify(packageJSON.version),
    __GIT_COMMIT__: JSON.stringify(gitCommit),
    __SENTRY_RELEASE__: JSON.stringify(sentryRelease),
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [
    sentryEsbuildPlugin({
      org: "ystv",
      project: "bowser",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: sentryRelease,
      disable: process.env.IS_PRODUCTION_BUILD !== "true",
    }),
  ],
});
