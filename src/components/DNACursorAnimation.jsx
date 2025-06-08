import React, { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';

// Constants
const EDGE_FADE_DISTANCE = 60;
const DYNAMIC_LETTER_RATIO = 0.15; // Reduced for performance
const RANDOMIZE_RADIUS = 80;
const GROW_BUFFER = 30;

// Memoized letter component
const DNALetter = memo(({ 
  x, 
  y, 
  index, 
  baseSize, 
  growSize, 
  growDistance, 
  colorPalette, 
  bases, 
  animationDuration, 
  letterClassName, 
  isDynamic, 
  fixedBase,
  containerWidth,
  containerHeight,
  globalMousePos,
  time
}) => {
  const [currentBase, setCurrentBase] = useState(fixedBase);
  
  // Calculate distance from mouse
  const dx = globalMousePos.x - x;
  const dy = globalMousePos.y - y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Subtle ambient animation
  const ambientOffset = Math.sin((x / 200 + time / 3000) * Math.PI) * 0.05;
  const ambientOpacity = 0.3 + ambientOffset;
  
  // Update base if dynamic and mouse is close
  useEffect(() => {
    if (isDynamic && distance < RANDOMIZE_RADIUS) {
      setCurrentBase(bases[Math.floor(Math.random() * bases.length)]);
    }
  }, [distance, isDynamic, bases]);
  
  // Calculate visual properties
  const growFactor = distance < growDistance ? 1 - distance / growDistance : 0;
  const scale = 1 + growFactor * ((growSize - baseSize) / baseSize);
  
  // Edge opacity fade
  const minEdgeDistance = Math.min(x, containerWidth - x, y, containerHeight - y);
  const edgeFade = minEdgeDistance < EDGE_FADE_DISTANCE ? minEdgeDistance / EDGE_FADE_DISTANCE : 1;
  
  // Combine ambient and hover opacity
  const hoverOpacity = 0.4 * growFactor;
  const opacity = (ambientOpacity + hoverOpacity) * edgeFade;
  
  const isHighlight = growFactor > 0.7;
  const color = isHighlight ? '#EF0000' : colorPalette[index % colorPalette.length];
  
  return (
    <div
      className={`dna-letter absolute font-bold font-mono select-none pointer-events-none ${letterClassName}`}
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        fontSize: `${baseSize}px`,
        color,
        opacity,
        transition: growFactor > 0 ? `transform ${animationDuration}s ease-out, opacity ${animationDuration}s ease-out` : 'none',
        textShadow: isHighlight ? `0 0 5px #EF0000` : 'none',
        contain: 'layout style paint'
      }}
    >
      {currentBase}
    </div>
  );
}, (prevProps, nextProps) => {
  // Re-render if dimensions change
  if (prevProps.containerWidth !== nextProps.containerWidth || 
      prevProps.containerHeight !== nextProps.containerHeight ||
      prevProps.x !== nextProps.x || 
      prevProps.y !== nextProps.y) {
    return false;
  }
  
  // Re-render if time changes significantly for ambient animation
  const timeDiff = Math.abs(prevProps.time - nextProps.time);
  if (timeDiff > 200) {
    return false;
  }
  
  // Only re-render if mouse position changes AND is close enough
  const prevDistance = Math.sqrt(
    Math.pow(prevProps.globalMousePos.x - prevProps.x, 2) + 
    Math.pow(prevProps.globalMousePos.y - prevProps.y, 2)
  );
  const nextDistance = Math.sqrt(
    Math.pow(nextProps.globalMousePos.x - nextProps.x, 2) + 
    Math.pow(nextProps.globalMousePos.y - nextProps.y, 2)
  );
  
  // Skip render if mouse is far away from this letter
  if (prevDistance > nextProps.growDistance + GROW_BUFFER && 
      nextDistance > nextProps.growDistance + GROW_BUFFER) {
    return true; // Skip render
  }
  
  return false; // Re-render
});

DNALetter.displayName = 'DNALetter';

const DNACursorAnimation = ({
  baseSize = 12,
  growSize = 20,
  growDistance = 180,
  gapX = 40,
  gapY = 40,
  colorPalette = ['#666666', '#777777', '#888888', '#999999'],
  bases = ['A', 'C', 'G', 'U'],
  animationDuration = 0.3,
  containerClassName = '',
  letterClassName = ''
}) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [time, setTime] = useState(0);
  const animationFrameRef = useRef();

  // Update container dimensions and check visibility
  useEffect(() => {
    let resizeTimer;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    // Debounced resize handler to avoid too many re-renders
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateDimensions();
        // Force mouse position reset to trigger re-render of all letters
        setMousePos({ x: -1000, y: -1000 });
      }, 100);
    };

    // Use IntersectionObserver for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    updateDimensions();
    window.addEventListener('resize', handleResize);
    
    // Subtle ambient animation
    let lastTime = 0;
    const animate = (timestamp) => {
      if (timestamp - lastTime >= 200) { // Update every 200ms for subtle effect
        setTime(timestamp);
        lastTime = timestamp;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      clearTimeout(resizeTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  // Handle touch movement
  const handleTouchMove = useCallback((e) => {
    if (!containerRef.current || !e.touches[0]) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    });
  }, []);

  // Handle mouse/touch leave
  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: -1000, y: -1000 });
  }, []);

  // Generate dynamic letter indices and fixed bases
  const { dynamicIndices, fixedBases } = useMemo(() => {
    // Add a small buffer to ensure we generate enough letters
    const cols = Math.ceil(dimensions.width / gapX) + 3;
    const rows = Math.ceil(dimensions.height / gapY) + 3;
    const totalLetters = cols * rows;
    const dynamicCount = Math.floor(totalLetters * DYNAMIC_LETTER_RATIO);
    const indices = new Set();
    const fixedBasesMap = new Map();
    
    // Select random indices for dynamic letters
    while (indices.size < dynamicCount) {
      indices.add(Math.floor(Math.random() * totalLetters));
    }
    
    // Assign fixed bases for static letters
    for (let i = 0; i < totalLetters; i++) {
      if (!indices.has(i)) {
        fixedBasesMap.set(i, bases[i % bases.length]);
      }
    }
    
    return { dynamicIndices: indices, fixedBases: fixedBasesMap };
  }, [dimensions.width, dimensions.height, gapX, gapY, bases]);

  // Pre-calculate grid positions
  const gridPositions = useMemo(() => {
    const positions = [];
    const cols = Math.ceil(dimensions.width / gapX) + 3;
    const rows = Math.ceil(dimensions.height / gapY) + 3;
    const startX = -gapX * 1.5;
    const startY = -gapY * 1.5;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
        positions.push({
          index,
          x: startX + col * gapX,
          y: startY + row * gapY,
          key: `${dimensions.width}-${dimensions.height}-${row}-${col}`
        });
      }
    }
    return positions;
  }, [dimensions.width, dimensions.height, gapX, gapY]);
  
  // Render letters
  const letters = useMemo(() => {
    return gridPositions.map(pos => (
      <DNALetter
        key={pos.key}
        x={pos.x}
        y={pos.y}
        index={pos.index}
        baseSize={baseSize}
        growSize={growSize}
        growDistance={growDistance}
        colorPalette={colorPalette}
        bases={bases}
        animationDuration={animationDuration}
        letterClassName={letterClassName}
        isDynamic={dynamicIndices.has(pos.index)}
        fixedBase={fixedBases.get(pos.index) || bases[0]}
        containerWidth={dimensions.width}
        containerHeight={dimensions.height}
        globalMousePos={mousePos}
        time={time}
      />
    ));
  }, [gridPositions, baseSize, growSize, growDistance, colorPalette, bases, animationDuration, letterClassName, dynamicIndices, fixedBases, dimensions.width, dimensions.height, mousePos, time]);

  return (
    <div
      ref={containerRef}
      className={`dna-cursor-container relative w-full h-full overflow-hidden cursor-pointer ${containerClassName}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
    >
      {dimensions.width > 0 && dimensions.height > 0 && isVisible && letters}
    </div>
  );
};

export default DNACursorAnimation;