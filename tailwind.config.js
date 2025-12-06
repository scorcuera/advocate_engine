/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
      },
      boxShadow: {
        'warm': '0 4px 6px -1px rgba(249, 115, 22, 0.1), 0 2px 4px -1px rgba(249, 115, 22, 0.06)',
      }
    },
  },
  plugins: [],
}


