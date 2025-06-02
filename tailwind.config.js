/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "var(--gray)",
        blue: "var(--blue)",
      },
    },
  },
  plugins: [],
}
