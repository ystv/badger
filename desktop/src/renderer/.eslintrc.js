module.exports = {
  rules: {
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "../main/ipcEventBus",
            message:
              "You can't access the main process's EventBus. Use window.EventBus instead.",
            allowTypeImports: false,
          },
          {
            name: "electron-settings",
          },
        ],
        patterns: ["../main/*"],
      },
    ],
  },
};
