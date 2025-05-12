module.exports = {
  content: [
    "./client/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',  // Warm Orange
        secondary: '#2EC4B6', // Teal
        accent: '#FDCA40',   // Sunny Yellow
        background: '#F7F7F2', // Off-white
        darkText: '#222222',  // Dark Gray
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}