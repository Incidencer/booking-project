/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        dark: '#1a202C'
      },
      textColor: {
        dark: '#ffffff'
      }
    },
    container: {
      padding: {
        md: '10rem',
      }
    }
  },
  plugins: [],
}

