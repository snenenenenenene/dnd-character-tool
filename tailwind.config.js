/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#000",
          secondary: "#fff",
          tertiary: "#c4c4c4",
          text: "#FFFFFF",
          accent: "#4444a0",
        },
        dark: {
          primary: "#0C2340",
          secondary: "#663300",
          tertiary: "#BF9B30",
          text: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
