module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: [
      "src/**/*.js",
      "src/**/*.jsx",
      "src/**/*.tsx",
      "public/**/*.html",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        20: "1 1 20%",
        35: "1 1 35%",
        30: "1 1 30%",
        40: "1 1 40%",
        50: "1 1 50%",
        60: "2 2 60%",
        80: "2 2 80%",
      },

      fontSize: {
        10: "0.625rem",
        12: "0.75rem",
        14: "0.875rem",
        20: "1.125rem",
        24: "1.5rem",
        38: "2.375rem",
        55: "3.125rem",
      },
      maxWidth: {
        350: "350px",
        400: "400px",
        500: "500px",
        600: "600px",
        900: "900px",
      },
      inset: { "95%": "95%" },
      width: {
        50: "50px",
        80: "80px",
        100: "100px",
      },
      lineHeight: {
        50: "50px",
      },

      height: {
        618: "618px",
        600: "600px",
        200: "200px",
        275: "275px",
        300: "300px",
        100: "100px",
        80: "80px",
        54: "54px",
        30: "30px",
        35: "35px",
        "60vh": "60vh",
        "90%": "90%",
      },

      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      colors: {
        red: "red",
        green: "green",
        azureRadiance: "#0095f6",
        alabaster: "#fafafa",
        mecury: "#e2e2e2",
        mecury2: "#e7e7e7",
        quickSilver: "#9b9b9b",
        quickSilver2: "#868686",
        quickSilver3: "#8e8e8e",
        creamish: "#fae7e6",
        dark: "#333333",
        lynxWhite: "#f7f7f7",
        modalbg: "rgba(0, 0, 0, 0.3)",
      },
      inset: {
        "69%": "69%",
        "65%": "65%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
