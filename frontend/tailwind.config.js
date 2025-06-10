/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      boxShadow: {
        'neumorph-in': 'inset 6px 6px 12px #c5cacd, inset -6px -6px 12px #fbffff',
        'neumorph-out': '6px 6px 12px #c5cacd, -6px -6px 12px #fbffff',
        'neumorph-pressed': 'inset 4px 4px 8px #c5cacd, inset -4px -4px 8px #fbffff',
      },
      colors: {
        'neumorph-bg': '#e0e5ec',
        'neumorph-input': '#e0e5ec',
      },
    },
  },
  plugins: [],
  darkMode: false,
};
