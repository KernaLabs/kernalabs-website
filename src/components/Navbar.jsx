import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center p-2 pr-6 h-full border-r border-gray-700">
          <img src="/TextLogoWhite.png" alt="Kernal Labs Logo" className="h-8" />
        </div>
        <div className="flex space-x-0 h-full">
          {['Platform', 'Team', 'Mission', 'Contact Us'].map((section, idx) => (
            <a
              key={idx}
              href={`#${section.toLowerCase()}`}
              className="h-full flex items-center justify-center border-l border-gray-700 px-4 py-1 text-white hover:text-red-400"
            >
              {section}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
