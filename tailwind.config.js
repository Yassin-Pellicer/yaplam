// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // adjust to match your file paths
  theme: {
    extend: {
      animation: {
        carousel: 'carousel 40s linear infinite',
      },
      keyframes: {
        carousel: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // scroll halfway (because of duplication)
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
