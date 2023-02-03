module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui'],
      },
      colors: {
        'french-blue': '#0076ba',
        'sapph-blue': '#12618E',
        'azure-blue': '#E1F7FE',
        'light-gray': '#CFCFCF',
        'dark-gray': '#2b2b2b',
        'pallete-orange': '#E49D23',
      },
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
}
