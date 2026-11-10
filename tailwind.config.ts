import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F1522",
        chalk: "#F3F4F1",
        mist: "#E6E9EB",
        wash: "#9DB2CB",
        stitch: "#C98A2B",
        denim: {
          DEFAULT: "#1B2A4A",
          deep: "#121C33",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        stitch: {
          from: { clipPath: "inset(0 100% 0 0)" },
          to: { clipPath: "inset(0 0 0 0)" },
        },
        pop: {
          "0%": { transform: "scale(0.6)" },
          "60%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        rise: "rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        stitch: "stitch 1.6s 0.3s cubic-bezier(0.6, 0, 0.2, 1) both",
        pop: "pop 0.3s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
