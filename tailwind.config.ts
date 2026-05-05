import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-quicksand)", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#0f172a", // slate-900 for modern elegant look
          hover: "#1e293b",
        },
        navy: "#0f172a",
        success: "#10b981", // emerald-500
        destructive: "#ef4444", // red-500
        warning: "#f59e0b", // amber-500
        info: "#3b82f6", // blue-500
        subtle: "#f8fafc", // slate-50
        border: "#e2e8f0", // slate-200
        text: "#0f172a",
        muted: "#64748b", // slate-500
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(15, 23, 42, 0.05)",
        glass: "0 8px 32px 0 rgba(15, 23, 42, 0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
