/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
        'text-primary': '#2C2C2C',
        'text-secondary': '#505050',
        'text-tertiary': '#999',
        'account-page-main': '#055699',
      },

      backgroundColor: {
        primary: '#E03C31',
        secondary: '#F2F2F2',
        overlay: 'rgba(0,0,0,0.15)',
      },

      height: {
        'header-desktop': '96px',
        'header-mobile': '64px',
      },

      container: {
        padding: {
          DEFAULT: '1.5rem',
        },
        center: true,
      },
      keyframes: {
        'top-to-bot': {
          '0%': { transform: 'translateY(-3%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },

        'menuMobile-in': {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },

        show: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },

      animation: {
        'top-to-bot': 'top-to-bot ease-in .3s',
        show: 'show ease-in-out .2s',
        'memuMobile-in': 'menuMobile-in ease-in-out .2s',
      },
    },
  },
  plugins: [
    require('tailwindcss-scrollbar'),
    // require("@tailwindcss/line-clamp"),
  ],
};
