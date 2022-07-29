/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'base-50': 'var(--base-color-50)',
        'base-100': 'var(--base-color-100)',
        'base-200': 'var(--base-color-200)',
        'base-300': 'var(--base-color-300)',
        'base-400': 'var(--base-color-400)',
        'base-500': 'var(--base-color-500)',
        'base-600': 'var(--base-color-600)',
        'base-700': 'var(--base-color-700)',
        'base-800': 'var(--base-color-800)',
        'base-900': 'var(--base-color-900)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    ({ addVariant }) => {
      addVariant('collapsed', '.collapsed &')
      addVariant('selected', '.selected &')
      addVariant('used', '.used &')
    },
  ],
}
