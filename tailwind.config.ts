import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
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
        border: "var(--border)",
        luxury: {
          charcoal: "#121316",
          onyx: "#1a1b1f",
          surface: "#22242a",
          muted: "#8c8e96",
          platinum: "#e2e4e9",
          ivory: "#f8f9fa",
          gold: "#c5a880",
          "gold-light": "#dfc7a5",
          "gold-dark": "#9b7f58",
          emerald: "#10b981",
          ruby: "#ef4444",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        arabic: ["Cairo", "Amiri", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
