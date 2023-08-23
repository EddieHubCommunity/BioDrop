/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          // slate
          low: "#f6f7f8",
          "low-medium": "#939da8",
          "low-high": "#8894a1",
          "medium-low": "#627180",
          medium: "#122640",
          high: "#0b1726",
        },
        secondary: {
          // purple
          low: "#80cdd6",
          "low-high": "#38a1ad",
          "medium-low": "#2A7D86",
          medium: "#226168",
          high: "#164145",
          "high-high": "#0b2023",
        },
        tertiary: {
          // orange
          low: "#f49fa4",
          medium: "#ed616b",
          high: "#770d14",
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
