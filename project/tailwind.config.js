/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        fontFamily: {
          'rosarivo': ['Rosarivo', 'serif']
        },
        keyframes: {
          fadeInOut: {
            '0%, 100%': {opacity: '0'},
            '20%, 80': {opacity: '1'},
          },
          fadeIn: {
            '0%': {opacity: '0'},
            '100%': {opacity: '1'},
          },
        },
        Animation: {
          fadeInOut: 'fadeInOut 3s ease-in-out forwards',
          fadeIn: 'fadeIn 2s ease-in-out forwards',
        },
      },
    },
    plugins: [],
  }