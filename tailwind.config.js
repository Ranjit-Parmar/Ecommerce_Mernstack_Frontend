/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bg_footer: "#2C4152",
        bg_footer_top: "#FAFAFA"
      },
      backgroundImage: {
        hero : "url(/src/assets/blur1.jpg)"
      }
    },
    
  },
  plugins: [],
}

