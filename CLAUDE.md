# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` - Run the development server on http://localhost:3000
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Build for production to the `build` folder

### Image Optimization
- `npm run optimize-images` - Process and optimize all images in public/images (creates multiple sizes + WebP/AVIF formats)
- `npm run build:with-images` - Run image optimization before building for production

### Deployment
- `npm run predeploy` - Runs build before deployment
- `npm run deploy` - Deploy to GitHub Pages (configured for https://kernalabs.ai)

## Architecture

This is a React-based marketing website for KernaLabs, built with Create React App and styled with Tailwind CSS. The site features a modern, performance-optimized single-page application with lazy loading and responsive design.

### Core Structure
- **App.js**: Root component that handles loading state, preloads critical assets, and renders Navbar and LandingPage
- **components/LandingPage.jsx**: Main landing page with hero section, therapeutic cards, team carousel, partners, and media sections
- **components/Navbar.jsx**: Navigation component with smooth scroll behavior
- **data/teamMembers.js**: Contains core team and advisor information
- **config/imageConfig.js**: Centralized image path configuration with responsive srcSet support
- **config/logoConfig.js**: Partner and media logo configurations

### Component Architecture
Key components follow a modular pattern:
- **AnimatedSection**: Wrapper for intersection-based animations
- **TeamCard/TherapeuticCard/MediaCard**: Specialized card components
- **DNACursorAnimation**: Lazy-loaded interactive DNA animation
- **Image/InstitutionLogo**: Optimized image components with lazy loading and srcSet support
- **hooks/useCarousel**: Custom hook for touch-enabled carousel functionality
- **hooks/useIntersectionAnimation**: Animation trigger based on viewport intersection

### Styling Architecture
- **Tailwind Configuration** (tailwind.config.js):
  - Custom colors: kerna-red (#EF0000), kerna-darkred (#B50000), kerna-darkblue (#0F1418), kerna-beige (#F5F1E8)
  - Font families: Inter (body), Work Sans (display)
  - Fluid typography with clamp() for responsive text scaling
  - Custom animations: fadeIn, fadeInUp, slideUp, scaleIn with staggered delays
  - Extended utilities for masks, carousel padding, and backdrop effects

### Image Optimization Strategy
- **scripts/optimize-images.js**: Sharp-based image processor that generates:
  - Multiple sizes for different device categories (team, logos, backgrounds, media)
  - Next-gen formats (WebP, AVIF) with lossless compression
  - Placeholder images for lazy loading
  - Automatic manifest generation for srcSet management

### Performance Optimizations
- Lazy loading for non-critical components and images
- Preloading of critical assets during initial load
- Responsive image serving with srcSet and sizes attributes
- CSS-based animations using GPU-accelerated transforms
- Throttled scroll and resize event handlers

### Deployment Configuration
- Hosted on GitHub Pages at https://kernalabs.ai
- CNAME file in public/ directory for custom domain
- Build output is deployed to the gh-pages branch
- Homepage configured in package.json for proper routing