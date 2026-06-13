import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ml: {
          blue: "#3483FA",
          yellow: "#FFE600",
          ink: "#333333",
          muted: "#666666",
          surface: "#F5F5F5"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(20, 54, 100, 0.12)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(52, 131, 250, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(52, 131, 250, 0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
