import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ isLoading }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Add a small delay before starting fade out for smoother transition
      const timer = setTimeout(() => {
        setShow(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!show && !isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 ${
        !isLoading && !show ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Animated Kerna Leaf Logo */}
        <div className="relative">
          <img 
            src="/images/icons/brand/KernaLeaf.svg" 
            alt="Kerna Labs" 
            className="w-24 h-24 animate-pulse"
          />
          {/* Additional glow effect */}
          <div className="absolute inset-0 bg-kerna-red/20 blur-xl animate-pulse" />
        </div>
        
        {/* Loading text with fade in animation */}
        <div className="mt-8 overflow-hidden">
          <p className="text-kerna-beige/60 text-sm font-body tracking-widest uppercase animate-fadeInUp">
            Loading
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;