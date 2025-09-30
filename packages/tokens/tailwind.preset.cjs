/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        cosmic: {
          primary: '#6C5CE7',
          primaryForeground: '#ffffff',
          secondary: '#00D1B2',
          muted: '#A3AED0',
          background: {
            DEFAULT: '#0B1020',
            light: '#ffffff',
          },
          surface: {
            DEFAULT: '#0F1629',
            light: '#f8fafc',
          },
          border: {
            DEFAULT: '#1F2A44',
            light: '#e2e8f0',
          },
        },
      },
      borderRadius: {
        lg: '14px',
        md: '10px',
        sm: '8px',
      },
      spacing: {
        18: '4.5rem',
      },
      zIndex: {
        60: '60',
        70: '70',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  // Support pour le mode sombre
  darkMode: 'class',
};

