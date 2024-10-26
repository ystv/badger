module.exports = {
  rules: {
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "electron-settings",
          },
          {
            name: "react-redux",
            importNames: ["useSelector"],
            message: "Use typed hook `useAppSelector` instead.",
          },
          {
            name: "react-redux",
            importNames: ["useDispatch"],
            message: "Use state.ts dispatch export.",
          },
        ],
        patterns: [
          {
            group: ["../main/*"],
            allowTypeImports: true,
          },
        ],
      },
    ],
  },
};
