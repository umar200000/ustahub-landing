/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6fafb',
          100: '#b3eff2',
          200: '#80e5e9',
          300: '#4ddbe0',
          400: '#26d0d7',
          500: '#02BDC6',
          600: '#02a9b2',
          700: '#018990',
          800: '#016a6f',
          900: '#014b4f',
        },
        accent: {
          50: '#fff8e6',
          100: '#ffecb3',
          200: '#ffe080',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
