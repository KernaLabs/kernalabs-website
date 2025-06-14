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
    // console.log('[App] useEffect running');
    // Simulate minimum loading time for better UX
    const minimumLoadTime = 1500;
    const startTime = Date.now();

    // Preload critical assets
    const preloadAssets = async () => {
      const criticalAssets = [
        '/icons/KernaLeaf.svg',
        '/BackgroundSwirls.png',
        '/TextLogoWhite.png'
      ];

      try {
        await Promise.all(
          criticalAssets.map(src => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = src;
            });
          })
        );
      } catch (error) {
        console.error('Error preloading assets:', error);
      }

      // Ensure minimum load time
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);
      
      setTimeout(() => {
        // console.log('[App] Setting contentReady to true');
        setContentReady(true);
        setTimeout(() => {
          // console.log('[App] Setting isLoading to false');
          setIsLoading(false);
        }, 100);
      }, remainingTime);
    };

    preloadAssets();
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
