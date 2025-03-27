/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
      },
      screens: {
        'xs-custom': '320px', // 320px से शुरू होगा
        'xs-max': { 'raw': '(max-width: 340px)' } // 340px से छोटा होगा
      },
    },
  },
  plugins: [],
};
