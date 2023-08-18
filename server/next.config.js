// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

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
};

module.exports = nextConfig;
