import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Legacy colors for backwards compatibility
        black: "#000000",
        divine: {
          DEFAULT: "#E2E8F0",
        },
        mint: "#E2E8F0",
        forest: {
          DEFAULT: "hsl(var(--background))",
          light: "hsl(var(--card))",
        },
      },
      fontFamily: {
        sans: ["Inter var", "system-ui", "sans-serif"],
      },
      transitionDuration: {
        '240': '240ms',
        '280': '280ms',
        '400': '400ms',
        '450': '450ms',
        '500': '500ms',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" }
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-out": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)"
          },
          "100%": {
            opacity: "0",
            transform: "translateY(10px)"
          }
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1"
          }
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "slide-in-top": {
          "0%": { 
            transform: "translateY(-50px)",
            opacity: "0"
          },
          "100%": { 
            transform: "translateY(0)",
            opacity: "1"
          }
        },
        "pulse": {
          "0%, 100%": {
            opacity: "1"
          },
          "50%": {
            opacity: "0.5"
          }
        },
        "glow": {
          "0%": {
            boxShadow: "0 0 5px rgba(155, 135, 245, 0.5)"
          },
          "50%": {
            boxShadow: "0 0 20px rgba(155, 135, 245, 0.8)"
          },
          "100%": {
            boxShadow: "0 0 5px rgba(155, 135, 245, 0.5)"
          }
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)"
          },
          "50%": {
            transform: "translateY(-10px)"
          }
        },
        "breathe": {
          "0%, 100%": {
            transform: "scale(1)"
          },
          "50%": {
            transform: "scale(1.05)"
          }
        },
        "ripple": {
          "0%": {
            transform: "scale(0)",
            opacity: "1"
          },
          "100%": {
            transform: "scale(5)",
            opacity: "0"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "slide-in-top": "slide-in-top 0.3s both",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "breathe": "breathe 3s ease-in-out infinite",
        "ripple": "ripple 1s linear"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
