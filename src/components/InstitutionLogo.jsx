import React, { useState } from 'react';

const InstitutionLogo = ({ logo, name, size = 1.0, groupScale = 1.0 }) => {
  const [aspectRatio, setAspectRatio] = useState(1.5);
  
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalHeight > 0) {
      setAspectRatio(naturalWidth / naturalHeight);
    }
  };
  
  // Calculate final size multiplier
  const finalScale = size * groupScale;
  
  // Determine base sizes based on aspect ratio
  let baseHeight = 28; // 7 * 4 (h-7 in pixels)
  let baseMaxWidth = 80;
  
  if (aspectRatio < 1.2) {
    // Square-ish logos (like UMC) get bigger height
    baseHeight = 36; // 9 * 4 (h-9 in pixels)
    baseMaxWidth = 90;
  } else if (aspectRatio > 4) {
    // Wide logos (like OSU) get more horizontal space
    baseHeight = 28;
    baseMaxWidth = 120;
  }
  
  // Apply scaling
  const finalHeight = Math.round(baseHeight * finalScale);
  const finalMaxWidth = Math.round(baseMaxWidth * finalScale);
  
  // Create inline style for precise sizing
  const logoStyle = {
    height: `${finalHeight}px`,
    maxWidth: `${finalMaxWidth}px`
  };
  
  return (
    <img
      src={logo}
      alt={name}
      className="w-auto object-contain grayscale brightness-0 invert opacity-90 hover:opacity-100 transition-opacity duration-200 select-none pointer-events-none"
      style={logoStyle}
      onLoad={handleImageLoad}
      loading="lazy"
      draggable={false}
    />
  );
};

export default InstitutionLogo;