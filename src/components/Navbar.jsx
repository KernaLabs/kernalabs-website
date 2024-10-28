import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="#home" className="text-xl font-bold text-primary">CompanyLogo</a>
          </div>
          <div className="flex space-x-4">
            <a href="#platform" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Platform</a>
            <a href="#about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">About Us</a>
            <a href="#careers" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Careers</a>
            <a href="#contact" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;