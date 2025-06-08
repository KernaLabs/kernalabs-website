import React from 'react';
import useIntersectionAnimation from '../hooks/useIntersectionAnimation';

const AnimatedSection = ({ 
  children, 
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  className = '',
  once = false,
  rootMargin = '-20px',
  duration = 500,
  ...props 
}) => {
  const { ref, isVisible, scrollDirection, hasAnimated } = useIntersectionAnimation({ 
    threshold, 
    once,
    rootMargin 
  });

  // Map duration to valid Tailwind classes
  const getDurationClass = (ms) => {
    if (ms <= 300) return 'duration-300';
    if (ms <= 500) return 'duration-500';
    if (ms <= 700) return 'duration-700';
    if (ms <= 1000) return 'duration-1000';
    return 'duration-1000';
  };

  const durationClass = getDurationClass(duration);

  const animationClasses = {
    fadeIn: `transition-opacity ${durationClass}`,
    fadeInUp: `transition-all ${durationClass}`,
    slideUp: `transition-all ${durationClass}`,
    scaleIn: `transition-all ${durationClass}`,
    slideInLeft: `transition-all ${durationClass}`,
    slideInRight: `transition-all ${durationClass}`,
  };

  const hiddenClasses = {
    fadeIn: 'opacity-0',
    fadeInUp: 'opacity-0 translate-y-4',
    slideUp: 'opacity-0 translate-y-8',
    scaleIn: 'opacity-0 scale-95',
    slideInLeft: 'opacity-0 -translate-x-4',
    slideInRight: 'opacity-0 translate-x-4',
  };

  const visibleClasses = {
    fadeIn: 'opacity-100',
    fadeInUp: 'opacity-100 translate-y-0',
    slideUp: 'opacity-100 translate-y-0',
    scaleIn: 'opacity-100 scale-100',
    slideInLeft: 'opacity-100 translate-x-0',
    slideInRight: 'opacity-100 translate-x-0',
  };

  const baseClasses = animationClasses[animation] || animationClasses.fadeInUp;
  
  // Show animation state when visible AND (scrolling down OR already animated)
  const shouldShowAnimated = isVisible && (hasAnimated || scrollDirection === 'down');
  
  const stateClasses = shouldShowAnimated
    ? visibleClasses[animation] || visibleClasses.fadeInUp
    : hiddenClasses[animation] || hiddenClasses.fadeInUp;

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${stateClasses} ${className} will-change-transform`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;