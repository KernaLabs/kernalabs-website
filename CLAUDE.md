# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` - Run the development server on http://localhost:3000
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Build for production to the `build` folder

### Deployment
- `npm run predeploy` - Runs build before deployment
- `npm run deploy` - Deploy to GitHub Pages (configured for https://kernalabs.ai)

## Architecture

This is a React-based marketing website built with Create React App and styled with Tailwind CSS.

### Core Structure
- **App.js**: Root component that renders Navbar and LandingPage
- **components/Navbar.jsx**: Navigation component
- **components/LandingPage.jsx**: Main landing page content
- **Tailwind Configuration**: Custom theme extensions including:
  - Custom colors: kerna-red (#EF0000), kerna-darkred (#B50000), kerna-darkblue (#0F1418), kerna-beige (#EDE9DF)
  - Font families: Poppins (sans), Merriweather (serif)
  - Custom backdrop blur and transition utilities

### Deployment Configuration
- Hosted on GitHub Pages at https://kernalabs.ai
- CNAME file in public/ directory for custom domain
- Build output is deployed to the gh-pages branch