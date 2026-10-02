/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        }
      },
      boxShadow: {
        card: '0 12px 35px -15px rgba(15, 23, 42, 0.18)',
        glow: '0 15px 45px -15px rgba(37, 99, 235, 0.45)'
      },
      keyframes: {
        fadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(12px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        pulseSoft: {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.65'
          }
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.45s ease-out both',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
