module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '950px'},
      // => @media (max-width: 1023px) { ... } agebul

      'md': {'max': '700px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '550px'},
      // => @media (max-width: 639px) { ... }
    }
  },
    extend: {},

  plugins: [],
}
