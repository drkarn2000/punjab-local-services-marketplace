import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#0a2463",
          950: "#081b33",
        },
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans", "Noto Sans Gurmukhi", "Noto Sans Devanagari", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 12px 28px -4px rgba(29, 78, 216, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
