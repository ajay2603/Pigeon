/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "lef-rit": {
          from: {
            transform: "translateX(-50px)",
            opacity: 0,
          },
          to: {
            transform: "translateX(0px)",
            opacity: 1,
          },
        },
        "rit-lef": {
          from: {
            transform: "translateX(50px)",
            opacity: 0,
          },
          to: {
            transform: "translateX(0px)",
            opacity: 1,
          },
        },
        "top-dow": {
          from: {
            transform: "translateY(50px)",
            opacity: 0,
          },
          to: {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
        "dow-top": {
          from: {
            transform: "translateY(-50px)",
            opacity: 0,
          },
          to: {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
      },
      animation: {
        "lef-rit": "lef-rit 1s ease-in-out",
        "rit-lef": "rit-lef 1s ease-in-out",
        "top-dow": "top-dow 1s ease-in-out",
        "dow-top": "dow-top 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
