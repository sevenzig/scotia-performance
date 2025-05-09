/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        almarai: ['Almarai', 'sans-serif']
      },
      colors: {
        'scotia-blue': '#1e3a8a',
        'scotia-red': '#7f1d1d',
        'scotia-gray': '#334155',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
}; 