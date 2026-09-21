/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          950: '#140409',
          900: '#230711',
          800: '#3D0C1D',
          700: '#5C122C',
          600: '#851A3F',
        },
        rose: {
          50: '#FDF7F8',
          100: '#FBECEE',
          200: '#F6D9DD',
          300: '#EEBAC2',
          400: '#DE8E9D',
          500: '#C96076',
        },
        ivory: {
          50: '#FFFFFD',
          100: '#FDFBF7',
          200: '#FAF5EC',
          300: '#F4EBDA',
        },
        gold: {
          300: '#F7E7B4',
          400: '#EED688',
          500: '#D4AF37',
          600: '#AA8820',
        },
        charcoal: {
          900: '#0B090A',
          800: '#161416',
          700: '#232023',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        handwriting: ['"Dancing Script"', '"Caveat"', 'cursive'],
        editorial: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(-1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
      }
    },
  },
  plugins: [],
}
