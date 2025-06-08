import React, { useState, useEffect, useRef } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  style = {},
  loading = 'lazy',
  onLoad,
  draggable = true,
  ...props 
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current || loading !== 'lazy') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        rootMargin: '50px',
        threshold: 0.01 
      }
    );

    const element = imgRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [loading]);

  const handleLoad = (e) => {
    setHasLoaded(true);
    if (onLoad) onLoad(e);
  };

  return (
    <>
      {/* Placeholder div to maintain layout */}
      {!hasLoaded && (
        <div 
          className={`${className} bg-gray-800 animate-pulse`}
          style={style}
        />
      )}
      
      <img
        ref={imgRef}
        src={loading === 'lazy' && !isInView ? undefined : src}
        alt={alt}
        className={`${className} ${hasLoaded ? '' : 'opacity-0 absolute'} transition-opacity duration-300 ease-in-out`}
        style={style}
        onLoad={handleLoad}
        loading={loading === 'lazy' ? undefined : loading}
        draggable={draggable}
        {...props}
      />
    </>
  );
};

export default OptimizedImage;