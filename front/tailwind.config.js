/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
       chifa: {
        rojo: "#B91C1C",
        dorado: "#D4A017",
        oscuro: "#1F1F1F",
        crema: "#FFF7ED",
      },
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Cardo', 'serif'],
      },
    
    },
  },
  plugins: [],
}
