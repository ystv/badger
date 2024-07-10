// @ts-check
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
    serverComponentsExternalPackages: [
      "@aws-sdk/s3-request-presigner",
      "@sentry/node",
      "@sentry/nextjs",
    ],
  },
  transpilePackages: ["@badger/prisma"],
  serverExternalPackages: [
    "@aws-sdk/s3-request-presigner",
    "@sentry/node",
    "@sentry/nextjs",
  ],
  eslint: {
    // eslint is run as a separate step as part of the PR workflow
    // and we don't want to block tests on a lint failure that'll
    // already be caught
    ignoreDuringBuilds: process.env.E2E_TEST === "true",
  },
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

if (process.env.IS_PRODUCTION_BUILD !== "true") {
  module.exports = nextConfig;
} else {
  module.exports = withSentryConfig(nextConfig, {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Suppresses source map uploading logs during build
    silent: true,

    org: "ystv",
    project: "badger-server",
    authToken: process.env.SENTRY_AUTH_TOKEN,
    release: {
      name: sentryRelease,
    },

    // For all available options, see:
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  });
}
