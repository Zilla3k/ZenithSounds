/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        c_black: '#0b0a09',
        c_blue300: '#303d59',
        c_blue700: '#32508e',
        c_red700: '#dd3028',
        c_yellow50: '#ece2bd',
      },
    },
  },
  plugins: [],
};
