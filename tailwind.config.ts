import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm light palette: cream surfaces, deep forest-green text, antique gold accents.
        cream: { DEFAULT: "#FAF6EE", 100: "#F3ECDD", 200: "#E9DFC8" },
        ink: { 950: "#0D2B24", 900: "#133A31", 800: "#1B4A3F", 700: "#2A6355" },
        forest: "#0F5A48",
        gold: { DEFAULT: "#A67C2E", light: "#E2C27A" },
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
