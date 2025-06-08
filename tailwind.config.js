/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#9333EA',
        'kerna-red': '#EF0000',
        'kerna-darkred': '#B50000',
        'kerna-darkblue': '#0F1418',
        'kerna-beige': '#F5F1E8'
      },
      fontFamily: {
        // Primary font families
        'body': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Work Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        
        // Legacy mappings for backward compatibility
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'serif': ['Work Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        // Custom values for Work Sans display headings
        'display-tight': '-0.01em',  // Slightly tighter for Work Sans
        'display-normal': '0',       // Normal spacing
        'display-wide': '0.005em',   // Very subtle wide spacing
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundColor: {
        'white-10': 'rgba(255, 255, 255, 0.1)',
      },
      transitionProperty: {
        'transform': 'transform',
      },
      transitionTimingFunction: {
        'carousel': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '500': '500ms',
      },
      maskImage: {
        'fade-vertical': 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
        'fade-bottom': 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 75%)',
      },
      padding: {
        'carousel-left': 'max(calc((100vw - 1280px) / 2), 1rem)',
      },
      scale: {
        '200': '2',
      },
      rotate: {
        '-2': '-2deg',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'fadeInUp': 'fadeInUp 0.8s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'scaleIn': 'scaleIn 0.5s ease-out',
        'staggeredFadeIn': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        slideUp: {
          '0%': { 
            transform: 'translateY(100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        scaleIn: {
          '0%': { 
            transform: 'scale(0.95)',
            opacity: '0'
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '1'
          },
        },
      },
      transitionDelay: {
        '50': '50ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '350': '350ms',
        '400': '400ms',
        '450': '450ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
        '1000': '1000ms',
        '1100': '1100ms',
        '1200': '1200ms',
        '1300': '1300ms',
        '1400': '1400ms',
        '1500': '1500ms',
        '1600': '1600ms',
        '1700': '1700ms',
        '1800': '1800ms',
        '1900': '1900ms',
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'out-circ': 'cubic-bezier(0, 0.55, 0.45, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      fontSize: {
        // Fluid typography using clamp()
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.5rem + 1.875vw, 2.25rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.8rem + 2.25vw, 3rem)',
        'fluid-5xl': 'clamp(3rem, 2.25rem + 3.75vw, 4rem)',
        'fluid-6xl': 'clamp(3.75rem, 2.75rem + 5vw, 5rem)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.mask-fade-vertical': {
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
        },
        '.mask-fade-bottom': {
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 75%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 75%)',
        },
        '.pl-carousel': {
          paddingLeft: 'max(calc((100vw - 1280px) / 2), 1rem)',
        },
        '.pr-carousel': {
          paddingRight: 'max(calc((100vw - 1280px) / 2), 1rem)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

