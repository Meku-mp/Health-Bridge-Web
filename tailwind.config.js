/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['"Lexend"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        'midxl': '1400px',  // Adding an extra small screen size
      },
    },
    backgroundImage: {
      'chat-person-back': 'linear-gradient(72.47deg, #123258 22.16%, #1C3BA4 76.47%)',
    },
  },
  plugins: [],
};
