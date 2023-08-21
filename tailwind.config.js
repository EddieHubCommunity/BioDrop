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
          low: "rgb(249 250 251)",
          "low-medium": "rgb(143 151 166)",
          "low-high": "rgb(121 129 140)",
          "medium-low": "rgb(111 118 128)",
          medium: "rgb(35,48,66)",
          high: "rgb(17 24 39)",
        },
        secondary: {
          // purple
          low: "rgb(165 180 252)",
          "low-high": "rgb(110 115 243)",
          "medium-low": "rgb(99 102 241)",
          medium: "rgb(79 70 229)",
          high: "rgb(67 56 202)",
          "high-high": "rgb(61 50 179)",
        },
        tertiary: {
          // orange
          low: "rgb(253 186 116)",
          medium: "rgb(234 88 12)",
          high: "rgb(148 50 18)",
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
