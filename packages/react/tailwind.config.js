/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        sm: '24vw',
        md: '42vw',
        lg: '56vw',
        default: '42vw',
      },
      width: {
        sm: '36vw',
        md: '54vw',
        lg: '72vw',
        default: '54vw',
      },
    },
  },
  plugins: [],
}

