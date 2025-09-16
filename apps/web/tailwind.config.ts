import type { Config } from "tailwindcss";
import { tailwindPreset } from "@cinecircle/config";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  presets: [tailwindPreset as any],
  theme: { extend: {} },
  plugins: [],
};

export default config;
