/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // yoga: "url('src/assets/yoga.jpg')",
      },
    },
    colors: {
      orange: "#D1410C",
      white: "#ffffff",
      transparent: "transparent",
      black: "#000000",
      darkblue: "#1E0A3C",
      blue: "#3659E3",
      buttonBlue: "#3D64FF",
      grey: "#6F7287",
      offwhite: "#f9f9f9",
    },
  },
  plugins: [],
};
