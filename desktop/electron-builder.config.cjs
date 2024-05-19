/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");

const electronVersion = execSync("npm show electron version").toString().trim();

const dev = process.env.ENVIRONMENT === "dev";

/**
 * @type {import("electron-builder").Configuration}
 */
const config = {
  extends: [],
  appId: dev ? "ystv.badger.dev" : "ystv.badger",
  productName: dev ? "Badger Desktop (DEV)" : "Badger Desktop",
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
    "!**/node_modules/**",
    "!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}",
    "!.editorconfig",
    "!**/._*",
    "!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}",
    "!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}",
    "!**/{appveyor.yml,.travis.yml,circle.yml}",
    "!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}"
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
