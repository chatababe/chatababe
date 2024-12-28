import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#FFFFFF', // Light mode background
          2: '#2563eb', // Blue
          3: '#3b82f6', // light blue
          4: '#1A1A1A', // Dark text
          5: '#0D1117', // Dark mode background
          6: '#1E1E1E',
        },
        s: {
          1: '#FF4500', // Red-orange for errors
          2: '#FFA500', // light Orange
          3: '#ea580c', // dark orange
        },
        n: {
          1: '#201A1A', // Dark neutral for foreground
          2: '#4D4545', // Medium gray
          3: '#7E7575', // Soft gray
          4: '#D0C4C4', // Light gray
          5: '#FFFFFF', // White for background
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily:{
        poppins: ["Poppins","sans-serif"],
        lobster:["Lobster", "sans-serif"]
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
