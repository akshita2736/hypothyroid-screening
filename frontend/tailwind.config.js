/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        clinical: {
          50: '#f2fbfa',
          100: '#e6f6f5',
          500: '#0f766e',
          600: '#0d6660',
          700: '#0a504b',
        },
      },
    },
  },
  plugins: [],
}
