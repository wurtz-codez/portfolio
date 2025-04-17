/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        'dock-bg': 'rgba(28, 28, 28, 0.7)',
        'hover-bg': 'rgba(255, 255, 255, 0.1)',
        'glass-bg': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'glass-highlight': 'rgba(255, 255, 255, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'pulse': 'pulse 3s ease-in-out infinite',
        'rotate': 'rotate 10s linear infinite',
        'gradient': 'gradientAnimation 15s ease infinite',
        'border-flow': 'border-flow 4s linear infinite',
        'text-gradient': 'text-gradient 8s linear infinite',
      },
      backdropBlur: {
        'xs': '2px',
        'md': '10px',
        'xl': '20px',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      keyframes: {
        'border-flow': {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 0%' },
        },
        'text-gradient': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}