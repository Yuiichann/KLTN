/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: 'Roboto, sans-serif',
        lexend: 'Lexend, Roboto, Arial',
        onlylexend: 'Lexend',
      },

      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
      },

      colors: {
        primary: '#009BA1',
        sidebar: '#0b2948',
        hoverSidebar: '#b6c8d9',
        whiteSmoke: '#f0f0f0',
      },

      textColor: {
        primary: '##2C2C2C',
        secondary: '#8ba1b7',
        tertiary: '#999',
      },

      backgroundColor: {
        primary: '#009BA1',
        overlay: 'rgba(0,0,0,0.2)',
      },

      container: {
        padding: {
          DEFAULT: '0.5rem',
        },
        center: true,
      },
      keyframes: {
        'top-to-bot': {
          '0%': { transform: 'translateY(-3%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },

        show: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },

      animation: {
        'top-to-bot': 'top-to-bot ease-in .3s',
        show: 'show ease-in-out .2s',
      },
    },
  },
  plugins: [require('tailwindcss-scrollbar')],
};
