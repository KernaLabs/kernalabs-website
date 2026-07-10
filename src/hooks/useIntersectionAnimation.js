import { useEffect, useRef, useState } from 'react';

// Reveal-once visibility hook: flips to visible the first time the element
// enters the viewport, then stops observing. Content is never re-hidden on
// exit — re-hiding depended on a reliable re-entry callback, which Safari does
// not deliver after trackpad pinch-zoom (it intersects against the layout
// viewport, not the visual one), leaving already-seen sections blank. One-shot
// reveals also avoid observer/state churn on every scroll frame.
const useIntersectionAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '-50px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible };
};

export default useIntersectionAnimation;
