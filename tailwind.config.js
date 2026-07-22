/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#06B6D4',
        surface: 'rgba(255,255,255,0.08)',
        border: 'rgba(255,255,255,0.15)',
        background: '#0F172A',
        muted: '#94A3B8',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(99,102,241,0.25)',
      },
    },
  },
  plugins: [],
};
