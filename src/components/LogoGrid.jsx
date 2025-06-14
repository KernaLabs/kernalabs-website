import React from 'react';
import InstitutionLogo from './InstitutionLogo';

const LogoGrid = ({ logos, className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap ${className}`}>
      {logos.map((logo, idx) => (
        <div key={idx} className="flex items-center">
          <InstitutionLogo 
            logo={logo.src} 
            name={logo.alt}
            size="media"
          />
        </div>
      ))}
    </div>
  );
};

export default LogoGrid;