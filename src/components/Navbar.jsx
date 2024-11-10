import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12">
        <div className="flex items-center p-2 pr-6 h-full border-r border-gray-700">
          <img src="/TextLogoWhite.png" alt="Kerna Labs Logo" className="h-8" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-0 h-full">
          {['Platform', 'Team', 'Mission', 'Contact Us'].map((section, idx) => (
            <a
              key={idx}
              href={`#${section.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, section.toLowerCase())}
              className="h-full flex items-center justify-center border-l text-sm border-gray-700 px-4 py-1 text-white hover:text-red-400"
            >
              {section}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white hover:text-red-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6"
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-black/90 backdrop-blur-sm border-b border-gray-700 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {['Platform', 'Team', 'Mission', 'Contact Us'].map((section, idx) => (
          <a
            key={idx}
            href={`#${section.toLowerCase()}`}
            onClick={(e) => handleNavClick(e, section.toLowerCase())}
            className="block px-4 py-3 text-white hover:text-red-400 border-t border-gray-700/50"
          >
            {section}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
