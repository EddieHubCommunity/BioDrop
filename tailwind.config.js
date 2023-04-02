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
          medium: "#233042",
          high: "rgb(17 24 39)",
        },
        secondary: {
          // purple
          low: "rgb(165 180 252)",
          medium: "rgb(79 70 229)",
          high: "rgb(67 56 202)",
        },
        tertiary: {
          // orange
          low: "rgb(253 186 116)",
          high: "rgb(234 88 12)",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
