import { useEffect, useRef, useState, useMemo } from 'react';
import { throttle } from '../utils/throttle';

const useIntersectionAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);

  // Throttled scroll handler for better performance
  const handleScroll = useMemo(() => 
    throttle(() => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    }, 50), 
  []);

  // Track scroll direction
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observerOptions = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '-50px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Only mark as animated when scrolling down
          if (scrollDirection === 'down' && !hasAnimated) {
            setHasAnimated(true);
          }
        } else {
          setIsVisible(false);
          // Reset animation state when element is out of view and scrolling down
          if (scrollDirection === 'down') {
            setHasAnimated(false);
          }
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [scrollDirection, hasAnimated, options.threshold, options.rootMargin]);

  return { ref, isVisible, hasAnimated, scrollDirection };
};

export default useIntersectionAnimation;