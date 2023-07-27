module.exports = {
  rules: {
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@"],
            message:
              "@-imports will break the desktop build. Use relative imports instead.",
          },
        ],
      },
    ],
  },
};
