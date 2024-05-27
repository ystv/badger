/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");

const electronVersion = execSync("npm show electron version").toString().trim();

const dev = process.env.ENVIRONMENT === "dev";
const ystv = process.env.IS_YSTV_BUILD === "true";

let appId = ystv ? "ystv.badger" : "ystv.badger.public";
if (dev) {
  appId += ".dev";
}

/**
 * @type {import("electron-builder").Configuration}
 */
const config = {
  extends: [],
  appId,
  productName: dev ? "Badger Desktop (DEV)" : "Badger Desktop",
  artifactName: ystv
    ? "${productName}-ystv-${version}.${ext}"
    : "${productName}-${version}.${ext}",
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
    "!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}",
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
