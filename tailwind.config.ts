import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#090D16',
          900: '#0F172A',
          850: '#151F32',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        cyan: {
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
      },
      boxShadow: {
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'radial-gradient-dark': 'radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.08) 0%, rgba(15, 23, 42, 0) 70%)',
        'radial-gradient-amber': 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, rgba(9, 13, 22, 0) 70%)',
      },
    },
  },
  plugins: [],
};

export default config;
