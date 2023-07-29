module.exports = {
  rules: {
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "../main",
            message: "Don't import from the main proccess",
            allowTypeImports: true,
          },
          {
            name: "../main/ipcEventBus",
            message:
              "You can't access the main process's EventBus. Use window.EventBus instead.",
            allowTypeImports: false,
          },
        ],
      },
    ],
  },
};
