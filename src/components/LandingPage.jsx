import React, { useState, useEffect, useRef } from 'react';
const teamMembers = [
  {
    name: 'Amit Deshwar, PhD',
    position: 'Co-founder',
    image: '/Amit Deshwar.jpg',
    description: [
      'Former Founding Scientist & Head of Platform @ Deep Genomics',
      '10+ years of experience in ML for RNA biology',
      'AI Scientific Advisory Board @ Deep Genomics, Aperture Tx, Synkrino Biotherapeutics',
      'PhD Machine Learning @ University of Toronto',
    ],
  },
  {
    name: 'Melissa J. Moore, PhD',
    position: 'Co-founder',
    image: '/Melissa Moore.jpg',
    description: [
      'CSO Emerita @ Moderna',
      'Led development of platform behind Covid-19 vaccine',
      'PI @ Howard Hughes Medical Institute',
      'PI @ UMass Medical',
      'Director @ RNA Therapeutics Institute',
      'National Academy of Sciences',
      'PhD Biological Chemistry @ MIT',
    ],
  },
  {
    name: 'Julia Peng',
    position: 'Co-founder & CEO',
    image: '/Julia Peng.jpg',
    description: [
      'Prev Go-to-Market @ Confluent',
      '8+ years in deeptech partnerships, GTM, B2B sales',
      'Prev founder of biomaterials company developing novel drug delivery devices',
      'BSc Economics @ The Wharton School',
    ],
  },
  {
    name: 'Michael Swift, PhD',
    position: 'Founding Scientist',
    image: '/Michael Swift.jpg',
    description: [
      'High-throughput biology, single-cell and multi-omics expertise',
      '10+ years in RNA biology',
      'Research Fellow @ Longitude Capital',
      'Researcher @ miRagen Therapeutics',
      'PhD Systems Biology @ Stanford University',
    ],
  },
  {
    name: 'Aryan Misra',
    position: 'Machine Learning Engineer',
    image: '/Aryan Misra.jpg',
    description: [
      'Generative AI, deep probabilistic modelling, Bayesian active learning, systems design',
      '12+ years in engineering and machine learning',
      'Founding Engineer @ Bitswap',
      'BSc Mathematics, BSc Statistics @ University of Toronto',
    ],
  },
  {
    name: 'Oliver Chang, PhD',
    position: 'RNA Biologist',
    image: '/Oliver Chang.jpg',
    description: [
      '7+ years of R&D experience in mammalian cell engineering and synthetic biology',
      'Expert in CRISPR, optogenetics, and biomolecular condensates',
      'Developed scalable image analysis pipelines for HPC systems',
      'PhD in Chemistry @ Princeton University',
      'Published 4 papers in high-impact journals, including Cell and Nature Cell Biology',
      'Spearheaded a genome organization platform integrating CRISPR, optogenetics, and genomic imaging',
    ],
  },
];
const LandingPage = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollLeftFunc = () => {
    if (!carouselRef.current) return;
    const cardWidth = 400 + 24; // card width + gap
    carouselRef.current.scrollBy({
      left: -cardWidth,
      behavior: 'smooth'
    });
  };

  const scrollRightFunc = () => {
    if (!carouselRef.current) return;
    const cardWidth = 400 + 24; // card width + gap
    carouselRef.current.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
      setCanScrollLeft(false);
      setCanScrollRight(true);
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="fixed inset-0 w-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(14, 23, 43, 0.3)), url('/BackgroundSwirls.png')`, 
        backgroundSize: 'cover', 
        backgroundAttachment: 'fixed' 
      }}
    >
      {/* Section 1: Better Genetic Medicines */}
      <section id="main" className="snap-start min-h-screen w-full flex items-center relative px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="sm:max-w-md md:max-w-xl lg:max-w-2xl relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
              Better genetic medicines, built with AI.
            </h1>
            <div className="max-w-sm sm:max-w-md lg:max-w-lg">
              <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg text-white/80">
                Kerna Labs is unlocking the full potential of mRNA as the universal toolkit for genetic medicine.
              </p>
            </div>
          </div>
        </div>
        <div 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[120%] sm:w-[70%] md:w-[60%] lg:w-[45%] h-auto"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
          }}
        >
          <img 
            src="/hazy_droplet.svg" 
            alt="Hazy Droplet" 
            className="w-full h-full object-contain"
          />
        </div>
      </section>

      {/* Section 2: RNA Platform */}
      <section id="platform" className="snap-start h-screen w-full flex items-center relative overflow-hidden debug-green">
        <div 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[130%] sm:w-[80%] md:w-[65%] lg:w-[55%] h-auto"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
          }}
        >
          <img 
            src="/shiny_droplet.svg" 
            alt="Shiny Droplet" 
            className="w-full h-full object-contain opacity-90"
          />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="sm:max-w-md md:max-w-xl lg:max-w-2xl ml-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-white">
              Unlocking New Potential in RNA-Based Therapies
            </h2>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80">
              We leverage advanced computational techniques and high-throughput biology to fundamentally change the way we do drug discovery and development.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Potential */}
      <section id="potential" className="snap-start h-screen flex items-center relative">
        <div 
          className="absolute right-0 top-1/2 w-2/3 h-auto transform -translate-y-1/3 md:-translate-y-1/2"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 85%)',
          }}
        >
          <img 
            src="/trail.svg" 
            alt="Particle Trail" 
            className="w-full h-full object-cover"
            style={{
              transform: 'rotate(0deg) translate(20%, -10%)',
              transformOrigin: 'center'
            }}
          />
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-tight tracking-tight text-white">
              Despite its potential, mRNA is held back by key bottlenecks in payload design and delivery
            </h2>
            <p className="mt-4 md:mt-6 text-xl md:text-2xl text-kerna-red">
              Kerna Labs solves these key limitations with cutting-edge payload design
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: MRNA Therapeutics */}
      <section id="therapeutics" className="snap-start h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium mb-8 md:mb-16 text-white">
              MRNA Therapeutics That Have
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 rounded-lg hover:border-kerna-red/50 transition-colors">
                <div className="mb-4 text-kerna-red w-6 h-6 md:w-8 md:h-8">
                  <img src="/line-graph.svg" alt="Line Graph" className="w-full h-full" />
                </div>
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-normal mb-2">Expression Curve Tuning</h3>
                <p className="text-gray-400 text-sm sm:text-base">Tuned expression curves for any application.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 rounded-lg hover:border-kerna-red/50 transition-colors">
                <div className="mb-4 text-kerna-red w-6 h-6 md:w-8 md:h-8">
                  <img src="/aim.svg" alt="Target" className="w-full h-full" />
                </div>
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-normal mb-2">Cell-Type Specific Expression</h3>
                <p className="text-gray-400 text-sm sm:text-base">Targeted delivery to specific cell types for precise therapeutic effects.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 rounded-lg hover:border-kerna-red/50 transition-colors">
                <div className="mb-4 text-kerna-red w-6 h-6 md:w-8 md:h-8">
                  <img src="/clock.svg" alt="Clock" className="w-full h-full" />
                </div>
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-normal mb-2">Improved Half-life</h3>
                <p className="text-gray-400 text-sm sm:text-base">Extended duration of therapeutic effect through optimized stability.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#EDE9DF] text-black p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="max-w-7xl mx-auto flex items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            <div className="w-1 bg-black h-12 sm:h-16 md:h-20 lg:h-24 flex-shrink-0"></div>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
              Kerna Labs is building foundation models to programmatically develop better mRNA therapeutics
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Team */}
      <section id="team" className="snap-start h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-2 sm:mb-3">
              Meet Our Team
            </h2>
            <p className="text-base sm:text-lg text-white/60 mb-8 sm:mb-12">
              Built and backed by the leading minds in machine learning and mRNA
            </p>
          </div>

          <div className="relative">
            <div 
              ref={carouselRef}
              className="overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing mx-4 sm:mx-[calc((100vw-1280px)/2)]"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              style={{ userSelect: 'none' }}
            >
              <div className="flex gap-3 sm:gap-4 pb-4">
                {teamMembers.map((member, idx) => (
                  <div 
                    key={idx}
                    className="w-[260px] sm:w-[300px] md:w-[350px] flex-none"
                  >
                    <div className="border border-white/20 bg-white/5 backdrop-blur-sm p-4 sm:p-6 text-center">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-3" 
                      />
                      <h3 className="text-base sm:text-lg font-normal text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-white/60 uppercase tracking-wider text-xs">
                        {member.position}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="hidden sm:block w-[calc((100vw-1280px)/2)] flex-none" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
            <div className="flex gap-8">
              <button 
                onClick={scrollLeftFunc}
                disabled={!canScrollLeft}
                className={`p-2 ${
                  canScrollLeft 
                    ? 'text-white hover:text-kerna-red' 
                    : 'text-white/20 cursor-not-allowed'
                }`}
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7 7l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={scrollRightFunc}
                disabled={!canScrollRight}
                className={`p-2 ${
                  canScrollRight 
                    ? 'text-white hover:text-kerna-red' 
                    : 'text-white/20 cursor-not-allowed'
                }`}
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Our Mission */}
      <section id="mission" className="snap-start h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-medium text-white mb-8 sm:mb-12">
              Our Mission
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-[300px] md:h-full">
              <img 
                src="/TeamPhoto.jpg" 
                alt="Team" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 sm:p-8 md:p-12 bg-white/10 backdrop-blur-sm border-t md:border-l md:border-t-0 border-white/20">
              <div className="max-w-xl mx-auto">
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8">
                  Kerna Labs' mission is to build the first true platform for RNA therapeutics. The future is disease-free.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-white/70 mb-4 sm:mb-6">
                  Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-white/70">
                  Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Join Us */}
      <section id="contact" className="snap-start min-h-screen flex flex-col">
        <div className="flex-1 flex items-center relative overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-tight">
                Join Us In Shaping The Future Of Medicine
              </h1>
              <p className="mt-6 text-kerna-red text-xl md:text-2xl">
                Kerna Labs was founded in 2024 by Amit Deshwar, Melissa Moore, Julia Peng, and Michael Swift.
              </p>
              <p className="mt-4 text-kerna-red text-xl md:text-2xl">
                If you're a biologist or machine learning engineer who's excited about our mission
              </p>
            </div>
          </div>
          <div 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[600px] h-[600px]"
            style={{
              maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0) 100%)',
            }}
          >
            <img 
              src="/hazy_droplet.svg" 
              alt="Hazy Droplet" 
              className="w-full h-full object-contain opacity-90"
            />
          </div>
        </div>

        <div className="bg-kerna-red">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="flex flex-col items-start">
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-medium text-white mb-6">
                Get Connected
              </h2>
              <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mb-8">
                Learn more about how we're enabling our partners in their mRNA pipeline development.
              </p>
              <a 
                href="mailto:founders@kernalabs.ai"
                className="bg-white px-8 py-4 text-kerna-red font-medium text-lg hover:bg-white/90 transition-colors inline-flex items-center gap-2"
              >
                Contact Us
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <footer className="bg-black/40 backdrop-blur-sm text-white py-8">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <img src="/logo.svg" alt="Kerna Labs" className="h-8" />
              <div className="flex items-center gap-8">
                <a href="/blog" className="text-white/80 hover:text-white">Blog</a>
                <a href="/contact" className="text-white/80 hover:text-white">Contact</a>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <a href="#" className="text-white/60 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* Discord icon path */}
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* Twitter/X icon path */}
                </svg>
              </a>
              <a href="#" className="text-white/60 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  {/* Telegram icon path */}
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default LandingPage;
