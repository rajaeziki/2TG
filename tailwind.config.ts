import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Midnight emerald (trust, calm) + champagne gold (premium, warmth).
        ink: { 950: "#050D0C", 900: "#0A1917", 800: "#10241F", 700: "#17352E" },
        gold: { DEFAULT: "#D9B56B", light: "#F3DDA6" },
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "var(--font-cairo)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
