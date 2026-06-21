/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'impulso-dark': '#021648',     
        'impulso-navy': '#0A1931',     
        'impulso-orange': '#fe7008',   
        'impulso-mineral': '#11141a',  
      },
      fontFamily: {
        outfit: ['outfit-c', 'sans-serif'],
        raleway: ['raleway-c', 'sans-serif'],
      }
    },
  },
  plugins: [],
}