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
          low: "rgb(226 232 240)",
          medium: "rgb(100 116 139)",
          high: "rgb(15 23 42)",
        },
        secondary: {
          // purple
          low: "rgb(165 180 252)",
          high: "rgb(79 70 229)",
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
