/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ['"Bricolage Grotesque"', 'sans-serif'],
      },
      colors: {
        primary: "#1E3A8A", 
        secondary: "#3B82F6", 
        accent: "#E0F2FE",    
      },
    },
  },
  plugins: [],
}
