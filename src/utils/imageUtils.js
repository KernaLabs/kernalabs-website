/**
 * Generate optimized background image CSS with multiple format support
 * Uses CSS image-set for browsers that support it, with fallback
 */
export const getOptimizedBackgroundImage = (imagePath, gradient = null) => {
  // Extract base path and extension
  const lastDot = imagePath.lastIndexOf('.');
  const basePath = imagePath.substring(0, lastDot);
  
  // For backgrounds, use 1920w as default size (good for most screens)
  const defaultWidth = '1920w';
  
  // Build the optimized paths
  const avifPath = `${basePath}-${defaultWidth}.avif`;
  const webpPath = `${basePath}-${defaultWidth}.webp`;
  const fallbackPath = imagePath;
  
  // Create the CSS value
  let backgroundImage = '';
  
  if (gradient) {
    backgroundImage += `${gradient}, `;
  }
  
  // Use image-set for modern browsers (Safari 14+, Chrome 90+, Firefox 89+)
  // Fallback to WebP for older browsers that support it
  // Final fallback to original format
  backgroundImage += `
    -webkit-image-set(
      url('${avifPath}') type('image/avif'),
      url('${webpPath}') type('image/webp'),
      url('${fallbackPath}') 1x
    )
  `;
  
  // For browsers that don't support image-set, we'll use @supports in CSS
  // or the component can handle it with inline styles
  
  return {
    backgroundImage,
    // Also return individual URLs for manual fallback if needed
    avif: avifPath,
    webp: webpPath,
    fallback: fallbackPath
  };
};

/**
 * Get responsive background image style with gradient
 * Returns an object that can be spread into a style prop
 */
export const getBackgroundStyle = (imagePath, gradient = null) => {
  const { webp, fallback } = getOptimizedBackgroundImage(imagePath, gradient);
  
  // For maximum compatibility, we'll use WebP as the primary format
  // since it has broader support than AVIF
  let backgroundImage = gradient ? `${gradient}, ` : '';
  backgroundImage += `url('${webp}')`;
  
  // Return style object
  return {
    backgroundImage,
    // Fallback for browsers that don't support WebP
    // This will be overridden by the WebP version if supported
    fallbackBackgroundImage: `${gradient ? `${gradient}, ` : ''}url('${fallback}')`
  };
};