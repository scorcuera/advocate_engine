/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta premium oscura
        dark: {
          950: '#0a0d14',
          900: '#0f1419',
          850: '#141922',
          800: '#1a1f2e',
          750: '#1f2937',
          700: '#252d3d',
          600: '#2d3748',
          500: '#374151',
        },
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          teal: {
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
          },
          purple: {
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7e22ce',
          },
          gold: {
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
          }
        }
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #1f2937 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(31, 41, 55, 0.6), rgba(26, 31, 46, 0.8))',
        'gradient-shine': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },
      boxShadow: {
        'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.15)',
        'premium-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'glow-primary': '0 0 15px rgba(99, 102, 241, 0.2)',
        'glow-teal': '0 0 15px rgba(20, 184, 166, 0.2)',
        'glow-purple': '0 0 15px rgba(168, 85, 247, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}


