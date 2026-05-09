import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#111111",
          600: "#555555",
          400: "#999999",
          200: "#e5e5e5",
          100: "#f5f5f5",
          50: "#fafafa",
        },
        paper: "#fcfcfc",
        accent: "#2563eb",
        alert: "#dc2626",
        safe: "#16a34a",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        "paper-sm": "0 1px 2px -1px rgb(0 0 0 / 0.05), 0 1px 3px 0 rgb(0 0 0 / 0.05)",
        "paper-md": "0 4px 6px -1px rgb(0 0 0 / 0.02), 0 2px 4px -1px rgb(0 0 0 / 0.02)",
        "paper-lg": "0 10px 15px -3px rgb(0 0 0 / 0.04), 0 4px 6px -2px rgb(0 0 0 / 0.02)",
        "paper-floating": "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 10px 10px -5px rgb(0 0 0 / 0.02)",
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
        "soft-gradient": "radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.03) 0%, transparent 50%), radial-gradient(circle at 0% 0%, rgba(220, 38, 38, 0.02) 0%, transparent 50%)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUpFade 0.4s ease-out forwards",
        "enter-spring": "enterSpring 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15) forwards",
        "exit-float": "exitFloat 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "progress-stripe": "progressStripe 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideUpFade: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        enterSpring: {
          "0%": { opacity: "0", transform: "translateY(-20px) scale(0.9)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        exitFloat: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
        progressStripe: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% 100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
