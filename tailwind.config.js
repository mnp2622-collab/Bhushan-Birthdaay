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
        background: '#111111',
        card: '#161616',
        'card-hover': '#1F1F1F',
        surface: '#1C1C1C',
        'surface-border': 'rgba(255, 255, 255, 0.08)',
        'light-gray': '#F5F5F5',
        primary: {
          DEFAULT: '#E50914',
          hover: '#C10712',
          glow: 'rgba(229, 9, 20, 0.35)',
          muted: 'rgba(229, 9, 20, 0.12)',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        sans: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'red-glow': '0 0 25px -5px rgba(229, 9, 20, 0.4)',
        'red-sm': '0 0 12px -2px rgba(229, 9, 20, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
