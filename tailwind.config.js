/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
    },
  },
  important: true,
  plugins: [require('prettier-plugin-tailwindcss')],
}
