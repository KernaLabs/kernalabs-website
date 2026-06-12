import React, { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';

// Lazy load the landing page for better initial load performance
const LandingPage = lazy(() => import('./components/LandingPage'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  // console.log('[App] Component rendered');

  useEffect(() => {
    // Reveal content as soon as React has mounted. We intentionally do NOT block
    // on downloading the background/hero images — gating the first paint on a
    // multi-hundred-KB background is what tanked LCP/Speed Index. The brand
    // loading screen still shows briefly for polish, but it never waits on the
    // network, so the hero (the LCP element) can paint almost immediately.
    const minimumLoadTime = 400;

    // Play the hero entrance animations on the next frame.
    const raf = requestAnimationFrame(() => setContentReady(true));

    // Fade the loading screen out after a short, fixed delay.
    const timer = setTimeout(() => setIsLoading(false), minimumLoadTime);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="font-sans">
      <LoadingScreen isLoading={isLoading} />
      <div className={`transition-opacity duration-500 ${!contentReady ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <Suspense fallback={null}>
          <LandingPage contentReady={contentReady} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
