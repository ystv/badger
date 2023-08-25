import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    sentryVitePlugin({
      org: "ystv",
      project: "bowser",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
});
