/** @type {import('tailwindcss').Config} */
module.exports = Object.assign({}, require("bowser-server/tailwind.config"), {
  content: ["./src/renderer/**/*.{css,tsx}"],
});
