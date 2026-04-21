/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        // Inter is the preferred font. Load it via <link> in _document or a CDN stylesheet.
        // The system-font fallbacks (SF Pro, Segoe UI, Roboto) ensure a premium look
        // even when Inter is not available.
        sans: [
          'Inter',
          'ui-sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
          "'SF Pro Display'",
          "'Segoe UI'",
          'Roboto',
          'sans-serif'
        ]
      },
      colors: {
        primary: {
          DEFAULT: '#1A365D',
          light: '#3B6EAF',
          dark: '#0B253E'
        },
        secondary: {
          DEFAULT: '#3C6E91'
        },
        background: {
          DEFAULT: '#070C18',
          card: '#0D1424',
          elevated: '#131F35',
          light: '#1E2D45'
        },
        accent: {
          DEFAULT: '#E8EDF5',
          muted: '#64748B'
        },
        blue: {
          DEFAULT: '#4A90D9',
          bright: '#60A5FA',
          dark: '#2563EB'
        },
        success: {
          DEFAULT: '#22C55E'
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)',
        'glow': '0 0 20px rgba(74,144,217,0.15)',
        'glow-sm': '0 0 10px rgba(74,144,217,0.1)'
      }
    }
  },
  darkMode: 'class',
  plugins: []
};