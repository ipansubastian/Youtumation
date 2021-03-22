const colors = require('tailwindcss/colors');
const path = require('path');
module.exports = {
  purge: ['./src/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'sidebar-bg': `url(${path.resolve(__dirname, 'src/assets/undraw_youtube_tutorial_2gn3.png')})`,
      }),
    },
    // colors: {
    //   red: colors.lightBlue,
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
