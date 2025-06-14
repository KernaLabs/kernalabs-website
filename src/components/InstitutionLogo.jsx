import React from 'react';
import { logoConfig, defaultLogoConfig } from '../config/logoConfig';
import Image from './Image';

const InstitutionLogo = ({ logo, name, size = 'default' }) => {
  // Extract filename from path
  const filename = logo.split('/').pop();
  
  // Get configuration for this specific logo
  const config = logoConfig[filename] || defaultLogoConfig;
  
  // Apply scale factor if provided (default to 1.0)
  const scale = config.scale || 1.0;
  
  // Check if logo should be inverted
  const shouldInvert = config.invert || false;
  
  // Build className with Tailwind classes
  const baseClasses = 'w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200 select-none pointer-events-none';
  
  // For media preset, use responsive Tailwind classes
  let className = baseClasses;
  let style = {};
  
  if (size === 'media') {
    // For media logos, use config values but scale them up for better visibility
    const mediaScale = 1.5; // Scale factor to make media logos more visible
    style = {
      height: `${config.height * scale * mediaScale}px`,
      maxWidth: `${config.maxWidth * scale * mediaScale}px`
    };
  } else {
    // For team and default, we need to use the config values
    style = {
      height: size === 'team' ? 'auto' : `${config.height * scale}px`,
      maxHeight: size === 'team' ? `${config.height * scale * 0.925}px` : undefined,
      maxWidth: size === 'team' 
        ? `${Math.min(config.maxWidth * scale * 0.925, 78)}px`
        : `${config.maxWidth * scale}px`
    };
  }
  
  // Add invert class if needed
  className += shouldInvert ? ' invert' : '';
  
  return (
    <Image
      src={logo}
      alt={name}
      type="logo"
      className={className}
      style={style}
      sizes="(max-width: 640px) 100px, 200px"
    />
  );
};

export default InstitutionLogo;