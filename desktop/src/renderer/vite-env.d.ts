/* eslint-disable no-var */
/// <reference types="vite/client" />
declare module globalThis {
  var __APP_VERSION__: string;
  var __BUILD_TIME__: string;
  var __GIT_COMMIT__: string;
  var __SENTRY_RELEASE__: string;
  var __ENVIRONMENT__: string;
}
