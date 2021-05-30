module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        facebook: "#4267b2",
      },
    },
  },
  variants: {
    extend: { display: ["group-hover"] },
  },
  plugins: [],
};
