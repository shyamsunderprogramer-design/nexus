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
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        obsidian: {
          void: '#06090e',
          surface: '#0a0f1c',
          card: '#0f172a',
          elevated: '#141d33',
        },
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
        'glow': '0 0 30px -5px var(--brand-glow, rgba(139, 92, 246, 0.40))',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.40)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.40)',
        'specular': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
        'hud': '0 20px 50px -10px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
