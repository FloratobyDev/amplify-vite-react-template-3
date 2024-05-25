/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        10: "10px",
        12: "12px",
        16: "16px",
        20: "20px",
      },
      boxShadow: {
        custom: "0 2px 2px rgba(0, 0, 0, 0.1)",
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        italic: 400,
      },
      colors: {
        primary: "#505050",
        secondary: "#D9D9D9",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      borderRadius: {
        4: "4px",
      },
    },
  },
  plugins: [],
};
