import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    // Trigger load animations
    const timer = setTimeout(() => setIsLoaded(true), 100);

    let observer = null;
    
    // Set up scroll detection for the custom scrolling container
    const setupScrollDetection = () => {
      const scrollContainer = document.getElementById('landing-page-container');
      const sentinel = document.getElementById('navbar-scroll-sentinel');
      
      if (scrollContainer && sentinel) {
        // Force initial transparent state
        setScrolled(false);
        
        // Set up Intersection Observer with the scroll container as root
        observer = new IntersectionObserver(
          ([entry]) => {
            // When the sentinel is intersecting (at top), navbar should be transparent
            // When the sentinel is not intersecting (scrolled past), navbar should be opaque
            setScrolled(!entry.isIntersecting);
          },
          {
            root: scrollContainer,
            threshold: 0,
            rootMargin: '50px 0px 0px 0px' // Trigger when 50px from top
          }
        );

        observer.observe(sentinel);
      }
    };

    // Small delay to ensure DOM is ready
    const setupTimer = setTimeout(setupScrollDetection, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(setupTimer);
      if (observer) {
        observer.disconnect();
      }
    };
    
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Platform', action: '#therapeutics' },
    { label: 'Team', action: '#team' },
    { label: 'Media', action: '#media' },
    { label: 'Contact Us', action: '#contact', isButton: true }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 pointer-events-auto transition-all duration-500 ${
      scrolled 
        ? 'bg-black/80 backdrop-blur-md border-b border-gray-700/50' 
        : 'bg-transparent border-b border-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14 sm:h-16 md:h-20 lg:h-24">
        {/* Logo with animation */}
        <div className={`flex items-center p-2 pr-4 sm:pr-6 md:pr-8 h-full border-r border-gray-700 transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}>
          <img src="/TextLogoWhite.png" alt="Kerna Labs Logo" className="h-8 sm:h-10 md:h-12" />
        </div>

        {/* Desktop Menu with staggered animations */}
        <div className="hidden md:flex space-x-0 h-full">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.action}
              onClick={(e) => handleNavClick(e, item.action.slice(1))}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`h-full flex items-center justify-center ${item.isButton ? '' : 'border-l border-gray-700'} font-body font-medium text-base tracking-normal px-3 sm:px-4 md:px-6 lg:px-8 py-1 transition-all duration-500 ${
                item.isButton 
                  ? 'bg-kerna-red text-white hover:bg-kerna-darkred ml-4' 
                  : 'text-white hover:text-kerna-red'
              } ${
                isLoaded 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 -translate-y-2'
              } ${
                !item.isButton && hoveredIndex !== null && hoveredIndex !== idx 
                  ? 'opacity-50' 
                  : ''
              }`}
              style={{
                transitionDelay: isLoaded ? `${idx * 100}ms` : '0ms'
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button with animation */}
        <button
          className={`md:hidden p-2 text-white hover:text-kerna-red transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6 sm:h-8 sm:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu with staggered animations */}
      <div
        className={`md:hidden absolute w-full bg-black/90 backdrop-blur-sm border-b border-gray-700 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={item.action}
            onClick={(e) => handleNavClick(e, item.action.slice(1))}
            className={`block px-6 py-4 font-body font-medium text-base tracking-normal transition-all duration-300 ${
              item.isButton 
                ? 'bg-kerna-red text-white hover:bg-kerna-darkred mx-4 my-2 text-center' 
                : 'text-white hover:text-kerna-red border-t border-gray-700/50'
            } ${
              isMenuOpen 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-4'
            }`}
            style={{
              transitionDelay: isMenuOpen ? `${idx * 50}ms` : '0ms'
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
