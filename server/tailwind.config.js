/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../utility/components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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

        neutral: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#333333",
          950: "#262626",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
