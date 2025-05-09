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
          800: '#997F00',
          900: '#7A6500',
        },
        'cream': {
          50: '#FFFDF5',
          100: '#FFFBE6',
          200: '#FFF4BF',
          300: '#FFED99',
          400: '#FFE04D',
          500: '#FFD700',
          600: '#E6C200',
          700: '#BF9E00',
          800: '#997F00',
          900: '#7A6500',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner-highlight': 'inset 0 2px 0 0 rgba(255, 255, 255, 0.15)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      backgroundImage: {
        'mayo-dots': 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.3) 2px, transparent 0)',
      },
    },
  },
  plugins: [],
  darkMode: false,
};
