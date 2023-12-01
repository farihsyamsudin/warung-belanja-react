const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "fredoka" : ['Fredoka'],
        "pt-sans" : ['PT Sans'],
        "oswald" : ['Oswald'],
      }
    },
  },
  plugins: [],
})