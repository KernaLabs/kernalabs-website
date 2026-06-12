# Kerna Labs — Marketing Website

The marketing site for [Kerna Labs](https://kernalabs.ai), a company building
frontier AI models for mRNA therapeutics. It's a single-page React application
with a performance-optimized image pipeline, responsive layouts, and lightweight
interactive animations.

## Tech Stack

- **React 18** (Create React App / `react-scripts`)
- **Tailwind CSS** for styling
- **sharp** for build-time responsive image generation (WebP/AVIF variants)

## Getting Started

```bash
npm install      # install dependencies
npm start        # run the dev server at http://localhost:3000
```

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the development server with hot reload |
| `npm test` | Run the test suite in watch mode |
| `npm run build` | Build the production bundle into `build/` |
| `npm run optimize-images` | Generate responsive image variants and refresh `src/config/imageManifest.json` |
| `npm run build:with-images` | Optimize images, then build for production |
| `npm run deploy` | Publish `build/` to GitHub Pages |

When you add or change imagery, run `npm run optimize-images` and commit both the
source images and the generated variants. See `scripts/optimize-images.js` for the
size ladders and encoding settings.

## Project Structure

```
public/             Static assets and images (source + generated variants)
src/
  components/       UI components (landing page, navbar, cards, animations)
  hooks/            Reusable hooks (carousel, intersection animations)
  config/           Image size config + generated image manifest
  data/             Team and content data
  utils/            Helpers (image styles, throttling)
scripts/            Build tooling (image optimizer)
```

## Deployment

Production and staging are deployed automatically by **Netlify**:

- `master` → production ([kernalabs.ai](https://kernalabs.ai))
- `staging` → staging preview

A `gh-pages` deploy path also exists via `npm run deploy`.

Cache headers and security headers are configured in `public/_headers`.
