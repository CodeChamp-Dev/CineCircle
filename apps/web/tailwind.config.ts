import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/ui/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f8ff",
          100: "#e6f1ff",
          200: "#bfdeff",
          300: "#99caff",
          400: "#4da3ff",
          500: "#007dff",
          600: "#006fe6",
          700: "#0059b3",
          800: "#004080",
          900: "#00264d",
        },
      },
      fontFamily: {
        sans: ["system-ui", "Inter", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
