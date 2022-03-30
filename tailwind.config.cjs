module.exports = {
  content: ["./public/index.html", "./src/**/*.svelte"],
  theme: {
    extend: {
      screens: {
        tall: { raw: "(min-height: 500px)" },
      },
    },
  },
  plugins: [],
};
