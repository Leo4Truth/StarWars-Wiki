import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'starwars-black': '#0a0a0f',
        'starwars-blue': '#0d1b2a',
        'starwars-gold': '#ffd700',
        'starwars-yellow': '#f0c000',
        'starwars-white': '#f0f0f0',
        'starwars-gray': '#a0a0a0',
        'era-prequel': '#e74c3c',
        'era-original': '#3498db',
        'era-sequel': '#9b59b6',
        'era-anthology': '#2ecc71',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;