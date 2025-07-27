/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Retro Bangladesh Fusion Color Palette
        'background': '#FEE9B2',
        'card-background': '#F8A6C8',
        'text-primary': '#1A1A1A',
        'text-secondary': '#4B2A36',
        'button-primary': '#FF5E38',
        'button-shadow': '#2E294E',
        'highlight-accent-gold': '#FFD700',
        'highlight-accent-pink': '#FF69B4',
        'highlight-accent-orange': '#F57F17',
        'highlight-accent-red': '#B71C1C',
        
        // Legacy colors for compatibility
        'vibrant-pink': '#FF69B4',
        'vibrant-yellow': '#FFD700',
        'accent-orange': '#FF5E38',
        'dark-header': '#1A1A1A',
        'light-pink': '#F8A6C8',
        'soft-pink': '#F9A8D4',
      },
      fontFamily: {
        'display': ['Luckiest Guy', 'cursive'],
        'body': ['Comfortaa', 'sans-serif'],
      },
      fontWeight: {
        'black': '900',
      },
      boxShadow: {
        'retro': '4px 4px 0px #2E294E',
        'retro-lg': '6px 6px 0px #2E294E',
        'retro-xl': '8px 8px 0px #2E294E',
        'soft-shadow': '0 20px 40px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};