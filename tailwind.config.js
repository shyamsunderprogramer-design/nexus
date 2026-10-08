/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50: 'var(--brand-50, #f5f3ff)',
          100: 'var(--brand-100, #ede9fe)',
          200: 'var(--brand-200, #ddd6fe)',
          300: 'var(--brand-300, #c4b5fd)',
          400: 'var(--brand-400, #a78bfa)',
          500: 'var(--brand-500, #8b5cf6)',
          600: 'var(--brand-600, #7c3aed)',
          700: 'var(--brand-700, #6d28d9)',
          800: 'var(--brand-800, #5b21b6)',
          900: 'var(--brand-900, #4c1d95)',
        },
        surface: {
          dark: '#070b12',
          light: '#f8fafc',
          card: 'rgba(15, 23, 42, 0.7)',
          cardLight: '#ffffff',
          cardHover: 'rgba(30, 41, 59, 0.8)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderLight: 'rgba(226, 232, 240, 0.8)',
        }
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px var(--brand-glow, rgba(139, 92, 246, 0.25))',
        'glow': '0 0 25px -5px var(--brand-glow, rgba(139, 92, 246, 0.35))',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
      }
    },
  },
  plugins: [],
}
