// Image optimization configuration
export const IMAGE_SIZES = {
  // Team photos - rendered as ~80px avatars. `widths` mirrors the ladder in
  // scripts/optimize-images.js; the actual candidates come from the manifest.
  team: {
    widths: [400, 800],
    sizes: '80px'
  },

  // Institution/partner logos
  logo: {
    widths: [200, 400],
    sizes: '(max-width: 640px) 100px, 200px'
  },

  // Hero/background images
  hero: {
    widths: [1280, 1920],
    sizes: '100vw'
  },

  // Media/press logos
  media: {
    widths: [200, 400],
    sizes: '(max-width: 640px) 150px, (max-width: 1024px) 200px, 300px'
  },

  // Default sizes for other images
  default: {
    widths: [320, 640, 1280],
    sizes: '100vw'
  }
};


// Get image type from path
export const getImageType = (src) => {
  if (src.includes('/team/')) return 'team';
  if (src.includes('/logos/media/')) return 'media';
  if (src.includes('/logos/')) return 'logo';
  if (src.includes('/backgrounds/') || src.includes('hero')) return 'hero';
  return 'default';
};

