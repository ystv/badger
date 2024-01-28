/** @type {import("@electron-forge/shared-types/dist/index").ForgeConfig} */
module.exports = {
  packagerConfig: {
    icon: `./src/icon/${
      process.platform === "win32"
        ? "win/icon"
        : process.platform === "darwin"
          ? "mac/icon"
          : "png/64x64.png"
    }`,
    prune: true,
  },
  rebuildConfig: {},
  makers: [
    // {
    //   name: "@electron-forge/maker-squirrel",
    //   config: {
    //     authors: "YSTV",
    //   },
    //   platforms: ["win32"],
    // },
    {
      name: "@electron-forge/maker-wix",
      config: {
        manufacturer: "YSTV",
        upgradeCode: "f54b983c-0fbb-4f7c-983d-6682a973c28f",
        icon: "./src/icon/win/icon.ico",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    // {
    //   name: '@electron-forge/maker-deb',
    //   config: {},
    // },
    // {
    //   name: '@electron-forge/maker-rpm',
    //   config: {},
    // },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "ystv",
          name: "bowser",
        },
        prerelease: true,
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-vite",
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: "src/main/main.ts",
            config: "vite.main.config.mjs",
          },
          {
            entry: "src/common/preload.ts",
            config: "vite.preload.config.mjs",
          },
        ],
        renderer: [
          {
            name: "main_window",
            config: "vite.renderer.config.mjs",
          },
        ],
      },
    },
  ],
};
