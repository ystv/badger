// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require("./package.json").version;
const commit = (
  process.env.GIT_COMMIT ??
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("child_process").execSync("git rev-parse HEAD", { encoding: "ascii" })
).substring(0, 7);
const build = process.env.BUILD_ID;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverActions: true,
  },
  transpilePackages: ["@bowser/prisma"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  env: {
    VERSION: version,
    BUILD_ID: build,
    GIT_COMMIT: commit,
  },
  generateBuildId() {
    if (build && commit) {
      return `${version}-${build}-${commit}`;
    }
    if (build) {
      return `${version}-${build}`;
    }
    if (commit) {
      return `${version}-${commit}`;
    }
  },
};

module.exports = nextConfig;
