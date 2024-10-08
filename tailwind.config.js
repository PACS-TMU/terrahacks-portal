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
        btn: "#4DB2D4",
        btnHover: "#5CCCF1",
      },
    },
  },
};
