/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        craft: {
          paper: '#FAF6F0',
          'paper-dark': '#F2ECE4',
          card: '#FFFFFF',
          'card-warm': '#F5EFEB',
          terracotta: '#9E5A44',
          'terracotta-dark': '#7F4330',
          'terracotta-light': '#FDF3EE',
          forest: '#3B5B43',
          'forest-light': '#EBF2EC',
          'forest-dark': '#2B4332',
          amber: '#D99636',
          'amber-light': '#FEF7EC',
          cream: '#FFFBF5',
          ink: '#2C2825',
          'ink-light': '#635B54',
          'ink-muted': '#8E857C',
          border: '#E8DFD5',
          'border-dark': '#CFC2B4',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
      },
      boxShadow: {
        'craft': '0 4px 20px -2px rgba(44, 40, 37, 0.06), 0 2px 6px -1px rgba(44, 40, 37, 0.04)',
        'craft-hover': '0 10px 25px -3px rgba(44, 40, 37, 0.1), 0 4px 10px -2px rgba(44, 40, 37, 0.06)',
        'craft-polaroid': '0 6px 16px rgba(44, 40, 37, 0.08), 0 1px 3px rgba(44, 40, 37, 0.04)',
        'craft-stamp': 'inset 0 0 0 1px rgba(158, 90, 68, 0.2), 0 2px 4px rgba(158, 90, 68, 0.08)',
      },
      borderRadius: {
        'hand': '18px',
        'badge': '10px',
      }
    },
  },
  plugins: [],
}
