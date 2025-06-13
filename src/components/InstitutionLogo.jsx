import React from 'react';
import { logoConfig, defaultLogoConfig } from '../config/logoConfig';

const InstitutionLogo = ({ logo, name, size = 'default' }) => {
  // Extract filename from path
  const filename = logo.split('/').pop();
  
  // Get configuration for this specific logo
  const config = logoConfig[filename] || defaultLogoConfig;
  
  // Apply scale factor if provided (default to 1.0)
  const scale = config.scale || 1.0;
  
  // Check if logo should be inverted
  const shouldInvert = config.invert || false;
  
  // Size presets for different contexts
  const sizePresets = {
    default: {
      height: `${config.height * scale}px`,
      maxWidth: `${config.maxWidth * scale}px`
    },
    media: {
      height: '40px',
      maxWidth: '200px'
    },
    team: {
      height: 'auto',
      maxHeight: '36px',
      width: 'auto',
      minWidth: '60px',
      maxWidth: '90px',
      objectFit: 'contain'
    }
  };
  
  // Get the appropriate style based on size prop
  const logoStyle = sizePresets[size] || sizePresets.default;
  
  // Build className with conditional invert
  const className = `w-auto object-contain ${shouldInvert ? 'invert' : ''} opacity-90 hover:opacity-100 transition-opacity duration-200 select-none pointer-events-none`;
  
  return (
    <img
      src={logo}
      alt={name}
      className={className}
      style={logoStyle}
      loading="lazy"
      draggable={false}
    />
  );
};

export default InstitutionLogo;