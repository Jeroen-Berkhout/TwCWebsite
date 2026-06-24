import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        teal: "#0F766E",
        cream: "#F8FAFC"
      }
    }
  },
  plugins: []
};

export default config;