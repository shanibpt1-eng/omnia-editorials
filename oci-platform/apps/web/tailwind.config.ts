import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0D14',
        'obsidian-surface': '#111520',
        'obsidian-card': '#161B28',
        'obsidian-border': '#242C3F',
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FBF8EE',
          100: '#F7F0DC',
          200: '#EFE1B8',
          300: '#E7D195',
          400: '#DFC272',
          500: '#D4AF37',
          600: '#AA8C2C',
          700: '#806921',
          800: '#554616',
          900: '#2B230B',
        },
        luxury: {
          gold: '#D4AF37',
          'gold-light': '#F3E5AB',
          'gold-dark': '#9b7b38',
          charcoal: '#0A0D14',
          card: '#161B28',
          border: '#242C3F',
          ivory: '#f8f8f6',
          muted: '#8e92a0',
        },
      },
      fontFamily: {
        serif: ['Didot', 'Bodoni MT', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 25px rgba(212, 175, 55, 0.7))' },
        },
      },
      animation: {
        ticker: 'ticker 35s linear infinite',
        shimmer: 'shimmer 2.5s infinite linear',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('light', ['.light &', '.light&']);
    }),
  ],
};

export default config;
