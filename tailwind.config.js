/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7FAFC",
        foreground: "#1E1E1E",
        highlight: "#2A6C82",
        highlightLight: "#63ACC4",
        btn: "#5CCCF1",
        btnHover: "#4DB2D4",
      },
    },
  },
};
