/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");
const { withSentryConfig } = require("@sentry/nextjs");
const { execFileSync } = require("child_process");

const packageJSON = require("./package.json");
const gitCommit =
  process.env.GIT_REV ??
  execFileSync("/usr/bin/git", ["rev-parse", "HEAD"]).toString().trim();
const sentryRelease =
  "badger-server@" + packageJSON.version + "-" + gitCommit.slice(0, 7);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    instrumentationHook: true,
    serverComponentsExternalPackages: ["@aws-sdk/s3-request-presigner"],
  },
  transpilePackages: ["@badger/prisma"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  env: {
    NEXT_PUBLIC_VERSION: packageJSON.version,
    NEXT_PUBLIC_GIT_COMMIT: gitCommit,
    NEXT_PUBLIC_SENTRY_RELEASE: sentryRelease,
  },
  async headers() {
    return [
      {
        source: "/login",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
        ],
      },
    ];
  },
};

module.exports = withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: "ystv",
    project: "badger-server",
    authToken: process.env.SENTRY_AUTH_TOKEN,
    release: sentryRelease,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
    widenClientFileUpload: true,
    transpileClientSDK: false,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
    disableClientWebpackPlugin: process.env.IS_PRODUCTION_BUILD !== "true",
    disableServerWebpackPlugin: process.env.IS_PRODUCTION_BUILD !== "true",
  },
);
