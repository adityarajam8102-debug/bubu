/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          glow: '#ff8fb1',
          deep: '#c2185b',
          soft: '#ffd6e3',
        },
        plum: {
          900: '#1c0710',
          800: '#2b0a1a',
          700: '#421127',
          600: '#5c1b3a',
        },
        cream: '#fff6f3',
        lilac: '#d9b8ff',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(255, 143, 177, 0.65)',
        'glow-lg': '0 0 80px -10px rgba(255, 143, 177, 0.75)',
        soft: '0 24px 70px -24px rgba(28, 7, 16, 0.85)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
}
