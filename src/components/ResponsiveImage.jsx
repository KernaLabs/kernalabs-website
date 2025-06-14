import React, { useState } from 'react';

const ResponsiveImage = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  loading = 'lazy',
  priority = false,
  placeholder = 'blur',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate image paths for different formats
  const getImagePath = (path, format) => {
    const lastDot = path.lastIndexOf('.');
    const basePath = path.substring(0, lastDot);
    return `${basePath}.${format}`;
  };

  // Generate srcset for responsive images
  const generateSrcSet = (baseSrc, widths, format) => {
    const lastDot = baseSrc.lastIndexOf('.');
    const basePath = baseSrc.substring(0, lastDot);
    const originalExt = baseSrc.substring(lastDot + 1);
    
    // For next-gen formats, use the format extension
    // For original format, keep the original extension
    const ext = format || originalExt;
    
    return widths
      .map(width => {
        if (format) {
          // For WebP/AVIF, the pattern is name-400w.webp
          return `${basePath}-${width}w.${format} ${width}w`;
        } else {
          // For original format, the pattern is name-400w.jpg
          return `${basePath}-${width}w.${originalExt} ${width}w`;
        }
      })
      .join(', ');
  };

  // Default widths for responsive images
  const defaultWidths = [320, 640, 768, 1024, 1280, 1920];
  
  // Check if optimized versions exist
  const webpSrc = getImagePath(src, 'webp');
  const avifSrc = getImagePath(src, 'avif');

  // Handle image load
  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  // Handle image error
  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  // Blur placeholder styles
  const placeholderStyles = placeholder === 'blur' && !isLoaded ? {
    filter: 'blur(20px)',
    transform: 'scale(1.1)',
  } : {};

  // Container styles for aspect ratio preservation
  const containerClassName = `relative overflow-hidden ${className}`;
  
  return (
    <div className={containerClassName}>
      {!hasError && (
        <picture>
          {/* AVIF format (best compression) */}
          <source
            type="image/avif"
            srcSet={generateSrcSet(src, defaultWidths, 'avif')}
            sizes={sizes}
          />
          
          {/* WebP format (good compression, wide support) */}
          <source
            type="image/webp"
            srcSet={generateSrcSet(src, defaultWidths, 'webp')}
            sizes={sizes}
          />
          
          {/* Original format fallback */}
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : loading}
            onLoad={handleLoad}
            onError={handleError}
            className={`transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              ...placeholderStyles,
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
            {...props}
          />
        </picture>
      )}
      
      {hasError && (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
          <span>Image failed to load</span>
        </div>
      )}
      
      {/* Low quality placeholder */}
      {placeholder === 'blur' && !isLoaded && !hasError && (
        <img
          src={`${src.substring(0, src.lastIndexOf('.'))}-placeholder.jpg`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
        />
      )}
    </div>
  );
};

export default ResponsiveImage;