import { createTheme } from "@shadcn/ui/theme"; // Fix this import path to match your actual theme utility location

export const luxuryTheme = createTheme({
  cssVariables: {
    "--gold-light": "#F5E7A3",
    "--gold": "#D4AF37",
    "--gold-dark": "#B38728",
    "--black-light": "#2A2A2A",
    "--black": "#0A0A0A",
    "--black-dark": "#000000",
    "--cream-light": "#FFFFFF",
    "--cream": "#F5F5F5",
    "--cream-dark": "#E5E5E5",
    "--royal-light": "#6B2E7A",
    "--royal": "#4A154B",
    "--royal-dark": "#2E0D2F",
  },
  fontFamily: {
    display: "'Playfair Display', serif",
    sans: "'Montserrat', sans-serif",
    accent: "'Cormorant Garamond', serif",
  },
  animation: {
    'fade-in': 'fadeIn 1s ease-in-out',
    'slide-up': 'slideUp 0.8s ease-out',
    'slide-right': 'slideRight 0.8s ease-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    slideUp: {
      '0%': { transform: 'translateY(20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideRight: {
      '0%': { transform: 'translateX(-20px)', opacity: '0' },
      '100%': { transform: 'translateX(0)', opacity: '1' },
    },
  },
  boxShadow: {
    luxury: '0 4px 20px rgba(0, 0, 0, 0.08)',
    'luxury-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
  },
});
