/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = Object.assign({}, require("bowser-server/tailwind.config"), {
  content: ["./src/renderer/**/*.{css,tsx}"],
});
