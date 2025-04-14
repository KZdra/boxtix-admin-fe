/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        boxblue: "#007bff",
        boxwhite: "ffffff",
        boxyellow: "#fff13e", 
        gsatu:"#01336d",
        gdua:"#000b30",
        gtiga:"#000000"
      },
    },
  },
  plugins: [],
}

