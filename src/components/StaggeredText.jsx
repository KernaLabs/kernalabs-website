import React, { useEffect, useState, useMemo } from 'react';

const StaggeredText = ({ 
  text, 
  className = '', 
  delay = 50, 
  startDelay = 0, 
  ready = true,
  animateOnView = false,
  threshold = 0.1 
}) => {
  const [visibleWords, setVisibleWords] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInView, setIsInView] = useState(!animateOnView);
  
  const words = useMemo(() => text.split(' '), [text]);

  // Intersection observer for animate on view
  useEffect(() => {
    if (!animateOnView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (!hasAnimated) {
              setHasAnimated(true);
            }
          } else if (!hasAnimated) {
            setIsInView(false);
          }
        });
      },
      { threshold }
    );

    const element = document.getElementById(`staggered-${text.substring(0, 10)}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [animateOnView, hasAnimated, text, threshold]);

  useEffect(() => {
    if (!ready || !isInView) {
      setVisibleWords(0);
      return;
    }

    const initialTimer = setTimeout(() => {
      words.forEach((_, index) => {
        setTimeout(() => {
          setVisibleWords(index + 1);
        }, index * delay);
      });
    }, startDelay);

    return () => {
      clearTimeout(initialTimer);
    };
  }, [ready, isInView, delay, startDelay, words]);

  return (
    <span 
      id={`staggered-${text.substring(0, 10)}`}
      className={`inline ${className}`}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`inline-block transition-all duration-300 ease-out ${
            index < visibleWords 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2'
          }`}
          style={{ 
            transitionDelay: `${index * 20}ms`,
            willChange: 'transform, opacity'
          }}
        >
          {word}
          {index < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
};

export default StaggeredText;