/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        chifa: {
          rojo: "#B91C1C",
          rojoOscuro: "#7F1D1D",
          dorado: "#D4A017",
          crema: "#FFF7ED",
          oscuro: "#1F1F1F",
        },
      },

      boxShadow: {
        card: "0 20px 40px rgba(0,0,0,0.08)",
      },

      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },

  plugins: [],
};