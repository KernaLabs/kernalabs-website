// Image optimization configuration
export const IMAGE_SIZES = {
  // Team photos - from mobile to 4K displays
  team: {
    widths: [400, 800, 1200, 1600, 2400, 3200],
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 400px'
  },
  
  // Institution/partner logos
  logo: {
    widths: [100, 200, 300, 400, 600, 800],
    sizes: '(max-width: 640px) 100px, 200px'
  },
  
  // Hero/background images - up to 5K displays
  hero: {
    widths: [1920, 2560, 3840, 5120],
    sizes: '100vw'
  },
  
  // Media/press logos
  media: {
    widths: [200, 400, 600, 800, 1200],
    sizes: '(max-width: 640px) 150px, (max-width: 1024px) 200px, 300px'
  },
  
  // Default sizes for other images
  default: {
    widths: [320, 640, 960, 1280, 1920, 2560, 3840],
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

