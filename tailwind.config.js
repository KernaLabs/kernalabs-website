/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#9333EA',
        'kerna-red': '#EF0000',
        'kerna-darkred': '#B50000',
        'kerna-darkblue': '#0F1418',
        'kerna-beige': '#EDE9DF'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundColor: {
        'white-10': 'rgba(255, 255, 255, 0.1)',
      },
      transitionProperty: {
        'transform': 'transform',
      },
      transitionTimingFunction: {
        'carousel': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '500': '500ms',
      },
    },
  },
  plugins: [],
}

