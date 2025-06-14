import React from 'react';

const LogoGrid = ({ logos, className = '' }) => {
  const logoImageClass = 'h-5 sm:h-7 md:h-9 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity';
  
  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap ${className}`}>
      {logos.map((logo, idx) => (
        <img 
          key={idx}
          src={logo.src} 
          alt={logo.alt} 
          className={logoImageClass}
        />
      ))}
    </div>
  );
};

export default LogoGrid;