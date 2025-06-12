import { useState, useRef, useEffect, useCallback } from 'react';

const useCarousel = () => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Check scroll position
  const checkScrollPosition = useCallback(() => {
    if (!carouselRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  // Scroll event handler
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition(); // Initial check

    return () => {
      carousel.removeEventListener('scroll', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  // Scroll functions
  const scrollLeftFunc = useCallback(() => {
    if (!carouselRef.current) return;
    const cardWidth = 320 + 16; // card width + gap
    
    // Responsive scroll amount based on screen width
    let scrollCount = 3; // Default for desktop
    if (window.innerWidth < 768) {
      scrollCount = 1; // Mobile: scroll 1 card at a time
    } else if (window.innerWidth < 1024) {
      scrollCount = 2; // Tablet: scroll 2 cards at a time
    }
    
    carouselRef.current.scrollBy({
      left: -cardWidth * scrollCount,
      behavior: 'smooth'
    });
  }, []);

  const scrollRightFunc = useCallback(() => {
    if (!carouselRef.current) return;
    const cardWidth = 320 + 16; // card width + gap
    
    // Responsive scroll amount based on screen width
    let scrollCount = 3; // Default for desktop
    if (window.innerWidth < 768) {
      scrollCount = 1; // Mobile: scroll 1 card at a time
    } else if (window.innerWidth < 1024) {
      scrollCount = 2; // Tablet: scroll 2 cards at a time
    }
    
    carouselRef.current.scrollBy({
      left: cardWidth * scrollCount,
      behavior: 'smooth'
    });
  }, []);

  // Mouse handlers for dragging
  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  return {
    carouselRef,
    canScrollLeft,
    canScrollRight,
    scrollLeftFunc,
    scrollRightFunc,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove
  };
};

export default useCarousel;