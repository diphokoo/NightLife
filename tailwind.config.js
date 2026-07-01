/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme backgrounds
        dark: {
          bg: '#0B0F19',
          card: '#121826',
          nav: '#111827',
          sidebar: '#0F172A',
        },
        // Accent palette
        pink: { DEFAULT: '#FF4D6D', 500: '#FF4D6D' },
        cyan: { DEFAULT: '#00D4FF', 500: '#00D4FF' },
        purple: { DEFAULT: '#7C5CFF', 500: '#7C5CFF' },
        green: { DEFAULT: '#22C55E', 500: '#22C55E' },
        orange: { DEFAULT: '#F59E0B', 500: '#F59E0B' },
        danger: { DEFAULT: '#EF4444', 500: '#EF4444' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['38px', { lineHeight: '1.15', fontWeight: '700' }],
        'h3': ['30px', { lineHeight: '1.2', fontWeight: '600' }],
        'h4': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'caption': ['14px', { lineHeight: '1.5' }],
        'small': ['12px', { lineHeight: '1.4' }],
      },
      maxWidth: { content: '1600px' },
      borderRadius: {
        card: '16px',
        'card-lg': '20px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.5)',
        glow: '0 0 30px rgba(255,77,109,0.3)',
        'glow-cyan': '0 0 30px rgba(0,212,255,0.3)',
        'glow-purple': '0 0 30px rgba(124,92,255,0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0B0F19 0%, #1a0a2e 50%, #0B0F19 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      spacing: {
        '18': '72px',
        '22': '88px',
      },
    },
  },
  plugins: [],
};
