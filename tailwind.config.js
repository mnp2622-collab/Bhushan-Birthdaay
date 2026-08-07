/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B0B0B',
        card: '#121214',
        'card-hover': '#1A1A1E',
        surface: '#18181C',
        'surface-border': 'rgba(255, 255, 255, 0.08)',
        neon: {
          DEFAULT: '#8DFF2F',
          hover: '#7CE822',
          glow: 'rgba(141, 255, 47, 0.35)',
          muted: 'rgba(141, 255, 47, 0.12)',
        },
        slate: {
          850: '#151C2C',
          900: '#0F172A',
          950: '#0B0F19',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-glow': '0 0 25px -5px rgba(141, 255, 47, 0.3)',
        'neon-sm': '0 0 12px -2px rgba(141, 255, 47, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
