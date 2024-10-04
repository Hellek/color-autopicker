const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './public/index.html',
    './src/**/*.tsx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      colors: {
        black: '#333333',
      },
    },
    fontFamily: {
      sans: ['"Roboto"', 'sans-serif'],
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.flex-center': {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      })
    }),
  ],
}
