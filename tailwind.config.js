/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        soil: '#8b5e34',
        leaf: '#65a30d',
        skywash: '#e0f2fe',
      },
      boxShadow: {
        soft: '0 14px 35px rgba(21, 128, 61, 0.12)',
      },
    },
  },
  plugins: [],
};
