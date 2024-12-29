/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Manrope"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        'dark-purple': 'var(--dark-purple)',
        'dark-cyan': 'var(--dark-cyan)',
        'caribbean-current': 'var(--caribbean-current)',
        'celadon': 'var(--celadon)',
        'seasalt': 'var(--seasalt)',
      },
      fontWeight: {
        thin: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      scale: {
        '80': '0.8',
      },
      transformOrigin: {
        'left': '0% 50%',
      },
    },
  },
  plugins: [],
};
