import React from 'react';

const MediaCard = ({ href, logo, date, title, description, isPublication }) => {
  return (
    <a 
      href={href}
      target="_blank" 
      rel="noopener noreferrer"
      className={`group block relative ${isPublication ? 'bg-gradient-to-br from-black/10 to-black/20 border-white/5 hover:border-white/15' : 'bg-gradient-to-br from-kerna-beige/5 to-kerna-beige/10 border-kerna-beige/10 hover:border-kerna-beige/20'} backdrop-blur-md border transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1`}
    >
      <div className="absolute top-8 right-8 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <img 
          src="/icons/Arrow.svg" 
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="p-10 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <div className="flex-shrink-0 lg:w-48">
            <div className="h-12 mb-3 flex items-center">
              <img 
                src={logo}
                alt=""
                className="h-10 w-auto object-contain opacity-90 grayscale invert brightness-110 contrast-125 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-125"
              />
            </div>
            <span className={`inline-block px-3 py-1 text-xs font-body font-medium uppercase tracking-wider rounded-full ${
              isPublication 
                ? 'bg-white/10 text-white/80' 
                : 'bg-kerna-red/20 text-kerna-red'
            }`}>
              {isPublication ? 'Publication' : 'News'}
            </span>
          </div>
          <div className="flex-grow">
            <p className="text-kerna-beige/60 text-fluid-sm font-body mb-3">{date}</p>
            <h3 className="text-kerna-beige text-fluid-xl lg:text-fluid-2xl font-display font-medium mb-4 leading-tight">
              {title}
            </h3>
            <p className="text-kerna-beige/70 text-fluid-base font-body leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default MediaCard;