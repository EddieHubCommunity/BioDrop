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
        dark: "#000000",
        "dark-2": "#121212",
        primary: {
          // blue
          low: "#f6f7f8",
          "low-medium": "#939da8",
          "low-high": "#8894a1",
          "medium-low": "#627180",
          medium: "#122640",
          high: "#122640",
        },
        secondary: {
          // coral
          low: "#80cdd6",
          "low-high": "#38a1ad",
          "medium-low": "#2A7D86",
          medium: "#38a1ad",
          high: "#164145",
          "high-high": "#0b2023",
        },
        tertiary: {
          // teal
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
