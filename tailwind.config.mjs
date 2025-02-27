/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lime: "#90F08C",
      },
      fontFamily: {
        dm: ["var(--font-dm)"],
        inter: ["var(--font-inter)"],
        aeonik: ["Aeonik", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
