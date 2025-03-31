export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        'dock-bg': 'rgba(28, 28, 28, 0.7)',
        'hover-bg': 'rgba(255, 255, 255, 0.1)',
        'glass-bg': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'glass-highlight': 'rgba(255, 255, 255, 0.15)',
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