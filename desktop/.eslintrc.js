module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: [`bowser-server/app(?!/api)`],
          },
          {
            group: [`bowser-server/app`],
            message: "You probably wanted 'import type'.",
            allowTypeImports: true,
          },
          {
            group: ["@"],
            message:
              "Next's @-prefixed imports won't work. Import from bowser-server instead.",
            allowTypeImports: true,
          },
        ],
      },
    ],
  },
};
