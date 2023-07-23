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
        ],
      },
    ],
  },
};
