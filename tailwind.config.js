/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      keyframes: {
        dots: {
          '0%, 20%': {
            content: "'.'"
          },
          '40%': {
            content: "'..'"
          },
          '60%': {
            content: "'...'"
          },
          '90%, 100%': {
            content: "''"
          }
        }
      },
      animation: {
        dots: 'dots 2s linear infinite',
      },
    },
    plugins: [
    ],
    theme: {},
  }
}