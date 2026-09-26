/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./**/*.html",
    "./**/*.js",
    "!./node_modules/**",
    "!./karya/**",
    "!./mpi/**",
    "!./learn/**",
    "!./algo/**",
    "!./intel_fti/**"
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Quicksand', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
