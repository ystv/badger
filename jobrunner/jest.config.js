/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageProvider: "v8",
  transform: {
    "\\.[jt]sx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
  extensionsToTreatAsEsm: [".ts"],
};
