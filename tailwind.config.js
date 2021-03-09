module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    flex: {
      20: "1 1 20%",
      80: "2 2 80%",
      40: "1 1 40%",
      60: "2 2 60%",
    },

    fontSize: {
      14: "0.875rem",
      20: "1.125rem",
      24: "1.5rem",
    },
    maxWidth: {
      350: "350px",
      400: "400px",
      500: "500px",
      900: "900px",
    },

    extend: {
      width: {
        50: "50px",
      },

      height: {
        618: "618px",
      },

      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      colors: {
        azureRadiance: "#0095f6",
        alabaster: "#fafafa",
        mecury: "#e2e2e2",
        mecury2: "#e7e7e7",
        quickSilver: "#9b9b9b",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
