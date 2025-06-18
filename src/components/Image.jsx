import React, { useState, useEffect, useRef } from 'react';
import { IMAGE_SIZES, getImageType } from '../config/imageConfig';
import imageManifest from '../config/imageManifest.json';

const Image = ({ 
  src, 
  alt, 
  type,
  priority,
  className = '',
  onLoad,
  width,
  height,
  sizes,
  loading,
  style,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  
  // Determine image type if not provided
  const imageType = type || getImageType(src);
  const config = IMAGE_SIZES[imageType] || IMAGE_SIZES.default;
  
  // Determine if image should be prioritized
  const isPriority = priority !== undefined ? priority : false;
  
  // Use provided sizes or default from config
  const imageSizes = sizes || config.sizes;
  
  // Extract base path and extension
  const lastDot = src.lastIndexOf('.');
  const basePath = src.substring(0, lastDot);
  const originalExt = src.substring(lastDot + 1);
  
  // Get manifest entry for this image
  const manifestKey = src.startsWith('/') ? src.substring(1) : src;
  const manifestEntry = imageManifest[manifestKey.replace(/^images\//, '')];
  
  // Extract available widths from manifest variants
  const availableWidths = [];
  if (manifestEntry && manifestEntry.variants) {
    const widthSet = new Set();
    manifestEntry.variants.forEach(variant => {
      const match = variant.match(/-(\d+)w\./);
      if (match) {
        widthSet.add(parseInt(match[1]));
      }
    });
    availableWidths.push(...Array.from(widthSet).sort((a, b) => a - b));
  }
  
  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (isPriority || loading === 'eager') {
      setIsInView(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [isPriority, loading]);
  
  const handleLoad = (e) => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.(e);
  };
  
  const handleError = (e) => {
    // If an optimized version fails, we'll fall back to the original
    if (e.target.src !== src) {
      e.target.src = src;
    } else {
      setHasError(true);
    }
  };
  
  // Generate srcset for responsive images
  const generateResponsiveSrcSet = (format) => {
    const ext = format || originalExt;
    
    return availableWidths
      .map(width => {
        if (format) {
          // For next-gen formats: name-400w.webp
          return `${basePath}-${width}w.${format} ${width}w`;
        } else {
          // For original format: name-400w.jpg
          return `${basePath}-${width}w.${ext} ${width}w`;
        }
      })
      .join(', ');
  };
  
  // Merge provided styles with defaults
  const imgStyle = {
    // Prevent layout shift
    aspectRatio: width && height ? `${width}/${height}` : undefined,
    // Apply any additional styles (objectFit can be overridden via style prop if needed)
    ...style
  };
  
  return (
    <picture ref={imgRef}>
      {/* Only load sources when in view */}
      {isInView && !hasError && (
        <>
          {/* Try AVIF first (best compression) */}
          <source 
            type="image/avif" 
            srcSet={generateResponsiveSrcSet('avif')}
            sizes={imageSizes}
            onError={(e) => e.target.remove()} // Remove if not available
          />
          
          {/* Try WebP next */}
          <source 
            type="image/webp" 
            srcSet={generateResponsiveSrcSet('webp')}
            sizes={imageSizes}
            onError={(e) => e.target.remove()} // Remove if not available
          />
          
          {/* Try optimized original format */}
          <source
            type={`image/${originalExt === 'jpg' ? 'jpeg' : originalExt}`}
            srcSet={generateResponsiveSrcSet()}
            sizes={imageSizes}
            onError={(e) => e.target.remove()} // Remove if not available
          />
        </>
      )}
      
      {/* Fallback to original image */}
      <img
        src={availableWidths.length > 0 && !hasError ? `${basePath}-${availableWidths[0]}w.${originalExt}` : src}
        alt={alt}
        width={width}
        height={height}
        loading={isPriority ? 'eager' : 'lazy'}
        fetchpriority={isPriority ? 'high' : 'auto'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={imgStyle}
        srcSet={isInView && !hasError ? generateResponsiveSrcSet() : undefined}
        sizes={isInView && !hasError ? imageSizes : undefined}
        className={`object-contain ${className} ${!isLoaded && !hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...props}
      />
    </picture>
  );
};

export default Image;