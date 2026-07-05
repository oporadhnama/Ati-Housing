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
          navy: "#192B45",
          gold: {
            DEFAULT: "#B8975A",
            light: "#D4B07A",
            dark: "#8C6E3C",
          },
        },
        surface: {
          cream: "#F7F4EE",
          white: "#FFFFFF",
          dark: "#111827",
        },
        text: {
          primary: "#1C1C1E",
          muted: "#6B7280",
        },
        border: {
          subtle: "rgba(184, 151, 90, 0.18)",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        bangla: ["var(--font-hind-siliguri)", "sans-serif"],
      },
      borderRadius: {
        sm: "2px",
        md: "4px",
        none: "0px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
