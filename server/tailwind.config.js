/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Plugins
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    colors: {
      light: "#fbfbfb",
      "mid-light": "#ddd",
      "mid-dark": "#444",
      dark: "#333333",
      "primary-2": "#74b5ff",
      primary: "#227ee4",
      "primary-4": "#2847cd",
      "success-2": "#81e654",
      success: "#2fc930",
      "success-4": "#2a8323",
      "warning-2": "#fd7f3e",
      warning: "#f4650e",
      "warning-4": "#dd4602",
      "danger-2": "#eb4141",
      danger: "#e80708",
      "danger-4": "#b20000",

      purple: "#9946d1",
      "purple-2": "#c577f5",
      "purple-4": "#7722a6",
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("flowbite"),
    require("@headlessui/tailwindcss"),
  ],
};
