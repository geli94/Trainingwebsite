/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A365D', // dark blue base
          light: '#274472',
          dark: '#0B253E'
        },
        secondary: {
          DEFAULT: '#3C6E91'
        },
        background: {
          DEFAULT: '#0F172A', // deep dark background for app
          card: '#1E293B',
          light: '#334155'
        },
        accent: {
          DEFAULT: '#F3F4F6' // light gray for text and icons
        }
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  darkMode: 'class',
  plugins: []
};