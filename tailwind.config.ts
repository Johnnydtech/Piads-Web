import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Poppins", "system-ui", "sans-serif"],
        logo: ["var(--font-logo)", "Pacifico", "cursive"],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        // Juuno-inspired brand colors
        blue: "#4856c4",
        teal: "#0b9ba5",
        coral: "#ffc9d0",
        orange: "#ffc886",
        cyan: "#d4f4f9",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInScale: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInFromLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInFromRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "cloud-drift": {
          "0%": { transform: "translateX(-10px)", opacity: "0.4" },
          "50%": { opacity: "0.6" },
          "100%": { transform: "translateX(60px)", opacity: "0.4" },
        },
        "cloud-drift-slow": {
          "0%": { transform: "translateX(-5px)", opacity: "0.3" },
          "50%": { opacity: "0.5" },
          "100%": { transform: "translateX(50px)", opacity: "0.3" },
        },
        rain: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "20%": { opacity: "0.8" },
          "100%": { transform: "translateY(60px)", opacity: "0" },
        },
        snow: {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "0" },
          "20%": { opacity: "0.9" },
          "100%": { transform: "translateY(60px) rotate(180deg)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
        float: "float 3s ease-in-out infinite",
        fadeIn: "fadeIn 0.5s ease-out",
        fadeInScale: "fadeInScale 0.5s ease-out",
        slideInFromLeft: "slideInFromLeft 0.5s ease-out",
        slideInFromRight: "slideInFromRight 0.5s ease-out",
        "spin-slow": "spin-slow 10s linear infinite",
        "cloud-drift": "cloud-drift 4s ease-in-out infinite",
        "cloud-drift-slow": "cloud-drift-slow 6s ease-in-out infinite",
        rain: "rain 0.7s linear infinite",
        snow: "snow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [animatePlugin],
};
export default config;
