/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        'primary': {
          DEFAULT: '#FF6B6B', // A vibrant, inviting coral/red
          '50': '#FFEDED',
          '100': '#FFE0E0',
          '200': '#FFC4C4',
          '300': '#FFA8A8',
          '400': '#FF8C8C',
          '500': '#FF6B6B',
          '600': '#E65F5F',
          '700': '#CC5353',
          '800': '#B34747',
          '900': '#993B3B',
          '950': '#662727',
        },
        'secondary': {
          DEFAULT: '#4ECDC4', // A fresh, calm teal
          '50': '#E0F8F7',
          '100': '#C7F2F0',
          '200': '#9EE9E5',
          '300': '#76E0DB',
          '400': '#4ECDC4',
          '500': '#3CA9A2',
          '600': '#2B857F',
          '700': '#1A615C',
          '800': '#0A3D39',
          '900': '#001917',
          '950': '#000D0C',
        },
        'accent': {
          DEFAULT: '#FFD166', // A bright, cheerful yellow
          '50': '#FFF9ED',
          '100': '#FFF4D6',
          '200': '#FFE9AD',
          '300': '#FFDD85',
          '400': '#FFD166',
          '500': '#E6BC5C',
          '600': '#CCAA52',
          '700': '#B39848',
          '800': '#99863E',
          '900': '#807434',
          '950': '#534C22',
        },
        // Background and text colors
        'background-light': '#FFFBF7', // A soft, off-white, almost creamy
        'text-dark': '#333333',       // A deep charcoal for readability
        'text-light': '#666666',       // A softer gray for secondary text

        // Status colors
        'success': '#28A745',         // Standard green for success messages
        'error': '#DC3545',           // Standard red for error messages
        'warning': '#FFC107',         // Standard yellow for warnings
        'info': '#17A2B8',            // Standard blue for informational messages
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define Inter font
      },
    },
  },
  plugins: [],
}
