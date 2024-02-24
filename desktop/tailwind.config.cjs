/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = Object.assign({}, require("badger-server/tailwind.config"), {
  content: ["./src/renderer/**/*.{css,tsx}", "../utility/components/*.tsx"],
});
