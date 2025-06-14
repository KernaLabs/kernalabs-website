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

// Quality settings
export const IMAGE_QUALITY = {
  jpeg: 100,
  webp: 100,
  avif: 100,
  png: 100
};

// Supported formats in order of preference
export const IMAGE_FORMATS = ['avif', 'webp'];

// Get image type from path
export const getImageType = (src) => {
  if (src.includes('/team/')) return 'team';
  if (src.includes('/logos/media/')) return 'media';
  if (src.includes('/logos/')) return 'logo';
  if (src.includes('/backgrounds/') || src.includes('hero')) return 'hero';
  return 'default';
};

// Generate srcset string
export const generateSrcSet = (basePath, widths, format) => {
  const ext = format || basePath.split('.').pop();
  const pathWithoutExt = basePath.substring(0, basePath.lastIndexOf('.'));
  
  return widths
    .map(width => {
      if (format) {
        // For next-gen formats: name-400w.webp
        return `${pathWithoutExt}-${width}w.${format} ${width}w`;
      } else {
        // For original format: name-400w.jpg
        return `${pathWithoutExt}-${width}w.${ext} ${width}w`;
      }
    })
    .join(', ');
};

// Check if image should be prioritized
export const shouldPrioritize = (src, type) => {
  // Hero images and backgrounds always priority
  if (type === 'hero' || src.includes('BackgroundSwirls')) {
    return true;
  }
  
  // First few team members might be priority
  const priorityTeamMembers = ['Amit Deshwar', 'Melissa Moore', 'Julia Peng'];
  if (type === 'team' && priorityTeamMembers.some(name => src.includes(name))) {
    return true;
  }
  
  return false;
};