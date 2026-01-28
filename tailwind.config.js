/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-dark': '#2c3e50',
        'brand-mid': '#5a6c7d',
        'brand-light': '#3498db',
        'brand-bg': '#f8f9fa',
      },
    },
  },
  plugins: [],
}
