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
    require('@tailwindcss/forms'),
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        scotia: {
          "primary": "#1e3a8a",
          "secondary": "#7f1d1d",
          "accent": "#3d5a80",
          "neutral": "#334155",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        }
      },
      "light",
      "dark"
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
  }
}; 