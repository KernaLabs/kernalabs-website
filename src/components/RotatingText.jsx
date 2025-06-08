import React, { useEffect, useState } from 'react';

const RotatingText = ({ words, interval = 2000, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 150);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={`inline transition-opacity duration-150 ${className} ${
      isAnimating ? 'opacity-0' : 'opacity-100'
    }`}>
      {words[currentIndex]}
    </span>
  );
};

export default RotatingText;