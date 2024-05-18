/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");

const electronVersion = execSync("npm show electron version").toString().trim();

/**
 * @type {import("electron-builder").Configuration}
 */
const config = {
  extends: [],
  appId: "ystv.badger",
  productName: "Badger Desktop",
  directories: {
    output: "dist",
  },
  files: [
    {
      from: "out/renderer",
      to: "out/renderer",
    },
    {
      from: "out/main",
      to: "out/main",
    },
    {
      from: "out/preload",
      to: "out/preload",
    },
    {
      from: ".",
      filter: "package.json",
    },
  ],
  electronVersion,
  win: {
    target: [
      {
        target: "nsis",
      },
      {
        target: "msiWrapped",
      },
    ],
  },
  squirrelWindows: {
    remoteReleases: true,
  },
  publish: {
    provider: "github",
    owner: "ystv",
    repo: "badger",
  },
};

module.exports = config;
