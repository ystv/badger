/* eslint-disable */
const nextJest = require("next/jest");

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest.default({ dir: "./" });

// Any custom config you want to pass to Jest
/** @type {import("jest").Config} */
const customJestConfig = {
  testPathIgnorePatterns: [
    "<rootDir>/e2e",
    process.env.TEST_INTEGRATION !== "true" && ".test.integration",
  ].filter(Boolean),
  moduleNameMapper: {
    "^@/(.+)$": "<rootDir>/$1",
    // HACK
    "../../client": "<rootDir>/../utility/prisma/client",
  },
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
