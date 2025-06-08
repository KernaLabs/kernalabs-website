import React, { useState } from 'react';

const InstitutionLogo = ({ logo, name }) => {
  const [aspectRatio, setAspectRatio] = useState(1.5);
  
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalHeight > 0) {
      setAspectRatio(naturalWidth / naturalHeight);
    }
  };
  
  // Determine size class based on aspect ratio
  let sizeClass = "h-7 max-w-[80px]"; // default for normal logos
  if (aspectRatio < 1.2) {
    // Square-ish logos (like UMC) get bigger height
    sizeClass = "h-9 max-w-[90px]";
  } else if (aspectRatio > 2.5) {
    // Wide logos (like OSU) get more horizontal space
    sizeClass = "h-7 max-w-[120px]";
  }
  
  return (
    <img
      src={logo}
      alt={name}
      className={`${sizeClass} w-auto object-contain grayscale invert opacity-90 hover:opacity-100 transition-opacity duration-200 select-none pointer-events-none`}
      onLoad={handleImageLoad}
      loading="lazy"
      draggable={false}
    />
  );
};

export default InstitutionLogo;