export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
}