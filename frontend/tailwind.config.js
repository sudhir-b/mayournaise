/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'mayo': {
          50: '#FFFEF5',
          100: '#FFFDE6',
          200: '#FFF8BF',
          300: '#FFF399',
          400: '#FFE94D',
          500: '#FFD700', // Mayo yellow
          600: '#E6C200',
          700: '#BF9E00',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
    },
  },
  plugins: [],
  darkMode: 'media',
};
