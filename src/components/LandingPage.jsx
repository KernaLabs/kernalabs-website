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
    const cardWidth = 240 + 12; // card width + gap
    carouselRef.current.scrollBy({
      left: -cardWidth,
      behavior: 'smooth'
    });
  };

  const scrollRightFunc = () => {
    if (!carouselRef.current) return;
    const cardWidth = 240 + 12; // card width + gap
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
    const walk = (x - startX) * 1;
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-kerna-beige">
              Better genetic medicines, built with AI.
            </h1>
            <div className="max-w-sm sm:max-w-md lg:max-w-lg">
              <p className="mt-4 md:mt-6 text-base md:text-lg text-kerna-beige">
                Kerna Labs is unlocking the full potential of mRNA as the universal toolkit for genetic medicine.
              </p>
            </div>
          </div>
        </div>
        <div 
          className="select-none absolute right-0 top-1/2 transform -translate-y-1/2 w-[120%] sm:w-[70%] md:w-[60%] lg:w-[45%] h-auto"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
          }}
        >
          <img 
            src="/hazy_droplet.svg" 
            alt="Hazy Droplet" 
            className="w-full h-full object-contain select-none"
          />
        </div>
      </section>

      <section id="platform" className="snap-start h-screen w-full flex items-center relative overflow-hidden">
        {/* Background Trail SVG */}
        <div 
          className="absolute right-0 top-1/2 w-full sm:w-4/5 md:w-3/4 h-auto transform -translate-y-1/3 md:-translate-y-1/2"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)',
          }}
        >
          <img 
            src="/trail.svg" 
            alt="Particle Trail" 
            className="w-full h-full object-scale-down scale-150 md:scale-125 select-none"
            style={{
              transform: 'rotate(0deg) translate(10%, -10%)',
              transformOrigin: 'center'
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Left side card */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-20 h-20 bg-kerna-darkred/10 rounded-full blur-2xl" />
              <div className="bg-black/30 backdrop-blur-sm backdrop-brightness-90 border border-white/10 rounded-lg p-8 relative">
                <div className="absolute -left-2 -top-2 w-16 h-1 bg-kerna-darkred" />
                <div className="absolute -left-2 -top-2 w-1 h-16 bg-kerna-darkred" />
                <h2 className="text-xl md:text-2xl font-medium leading-tight text-kerna-beige mb-6">
                  Despite its potential, mRNA is held back by key bottlenecks in payload design and delivery.
                </h2>
                <p className="text-base text-kerna-red drop-shadow-md">
                  Kerna Labs solves these key limitations with cutting-edge payload design.
                </p>
              </div>
            </div>

            {/* Right side card */}
            <div className="relative mt-12 md:mt-32">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-kerna-darkred/10 rounded-full blur-2xl" />
              <div className="bg-black/30 backdrop-blur-sm backdrop-brightness-75 border border-white/10 rounded-lg p-8 relative">
                <div className="absolute -right-2 -bottom-2 w-16 h-1 bg-kerna-darkred" />
                <div className="absolute -right-2 -bottom-2 w-1 h-16 bg-kerna-darkred" />
                <h2 className="text-xl md:text-2xl font-medium leading-tight text-kerna-beige mb-6">
                  Unlocking New Potential in RNA-Based Therapies
                </h2>
                <p className="text-base text-kerna-red drop-shadow-md">
                  We leverage advanced computational techniques and high-throughput biology to fundamentally change the way we do drug discovery and development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: MRNA Therapeutics */}
      <section id="therapeutics" className="snap-start h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal mb-6 md:mb-12 text-kerna-beige">
              {/* mRNA Therapeutics That Offer */}
              Advancing mRNA Therapeutics Through:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <div className="bg-kerna-beige/5 backdrop-blur-sm border border-kerna-beige/10 p-3 sm:p-4 rounded-lg hover:border-kerna-darkred/50 transition-colors">
                <div className="mb-3 w-5 h-5 md:w-6 md:h-6">
                  <img src="/line-graph.svg" alt="Line Graph" className="w-full h-full" />
                </div>
                <h3 className="text-kerna-beige text-base sm:text-lg md:text-xl font-normal mb-1.5">Expression Curve Tuning</h3>
                <p className="text-kerna-beige/60 text-sm">Customizable expression profiles for diverse therapeutic applications.</p>
              </div>

              <div className="bg-kerna-beige/5 backdrop-blur-sm border border-kerna-beige/10 p-3 sm:p-4 rounded-lg hover:border-kerna-darkred/50 transition-colors">
                <div className="mb-3 w-5 h-5 md:w-6 md:h-6">
                  <img src="/aim.svg" alt="Target" className="w-full h-full select-none" />
                </div>
                <h3 className="text-kerna-beige text-base sm:text-lg md:text-xl font-normal mb-1.5">Cell-Type Specific Expression</h3>
                <p className="text-kerna-beige/60 text-sm">Precision-targeted delivery for cell-specific therapeutic effects.</p>
              </div>

              <div className="bg-kerna-beige/5 backdrop-blur-sm border border-kerna-beige/10 p-3 sm:p-4 rounded-lg hover:border-kerna-darkred/50 transition-colors">
                <div className="mb-3 w-5 h-5 md:w-6 md:h-6">
                  <img src="/clock.svg" alt="Clock" className="w-full h-full select-none" />
                </div>
                <h3 className="text-kerna-beige text-base sm:text-lg md:text-xl font-normal mb-1.5">Enhanced Half-life</h3>
                <p className="text-kerna-beige/60 text-sm">Prolonged efficacy window through optimized mRNA stability.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#EDE9DF] text-black p-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto flex items-center gap-4 sm:gap-6 md:gap-8">
            <div className="w-0.5 bg-black h-10 sm:h-12 md:h-16 flex-shrink-0"></div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
              Kerna Labs is building foundation models to programmatically develop better mRNA therapeutics.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Team */}
      <section id="team" className="snap-start h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center pt-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-kerna-beige mb-2 sm:mb-3">
              Meet Our Team
            </h2>
            <p className="text-base sm:text-lg text-white/75 mb-8 sm:mb-12">
              Built and backed by the leading minds in machine learning and mRNA
            </p>
          </div>

          <div className="relative">
            <div 
              ref={carouselRef}
              className="overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              style={{ 
                userSelect: 'none',
                paddingLeft: 'calc(50% - 120px)',
              }}
            >
              <div className="flex gap-2 sm:gap-3 pb-4">
                {teamMembers.map((member, idx) => (
                  <div 
                    key={idx}
                    className="w-[180px] sm:w-[200px] md:w-[220px] flex-none"
                  >
                    <div className="border border-white/20 bg-white/5 backdrop-blur-sm p-4 sm:p-5 text-center h-[300px] sm:h-[320px] md:h-[340px]">
                      <div className="flex flex-col h-full">
                        {/* Top spacing */}
                        <div className="h-[10%]" />
                        
                        {/* Image section - fixed height */}
                        <div className="h-[45%] flex items-center justify-center">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full"
                          />
                        </div>
                        
                        {/* Text section - fixed height */}
                        <div className="h-[35%] flex flex-col items-center justify-center">
                          <h3 className="text-sm sm:text-base md:text-lg font-normal text-white mb-2">
                            {member.name}
                          </h3>
                          <p className="text-white/60 uppercase tracking-wider text-xs sm:text-sm px-2">
                            {member.position}
                          </p>
                        </div>
                        
                        {/* Bottom spacing */}
                        <div className="h-[10%]" />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="w-[calc((100vw-1280px)/2)] flex-none" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
            <div className="flex gap-8 justify-center">
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
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
            <div className="relative inline-block">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-normal text-kerna-beige">
                Our Mission
              </h2>
              <div className="absolute -left-2 -bottom-2 w-12 h-0.5 bg-kerna-red"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 lg:gap-12">
            {/* Image Container */}
            <div className="relative select-none h-[300px] md:h-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 md:hidden"></div>
              <img 
                src="/TeamPhoto.jpg" 
                alt="Team" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Text Container */}
            <div className="relative md:flex md:items-center">
              <div className="p-6 sm:p-8 md:p-12 bg-black/30 backdrop-blur-sm border border-white/10 rounded-none md:rounded-lg -mt-20 md:mt-0 relative z-20">
                <div className="absolute -left-2 -top-2 w-16 h-1 bg-kerna-darkred hidden md:block"></div>
                <div className="absolute -left-2 -top-2 w-1 h-16 bg-kerna-darkred hidden md:block"></div>
                
                <div className="max-w-xl">
                  <p className="text-base sm:text-lg md:text-xl text-kerna-beige mb-6 font-light">
                    Kerna's mission is to revolutionize genetic medicine.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-kerna-beige/70 font-light leading-relaxed">
                    We aim to transform the discovery and development of life-changing therapies by leveraging AI and high-throughput biology to decode RNA biology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Join Us */}
      <section id="contact us" className="snap-start min-h-screen flex flex-col">
        <div className="flex-1 flex items-center relative overflow-hidden py-16 sm:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-[#EDE9DF] leading-tight">
                Join Us In Shaping The Future Of Medicine
              </h1>
              <p className="mt-6 text-kerna-red text-sm md:text-base">
                Kerna Labs was founded in 2024 by Amit Deshwar, Melissa Moore, Julia Peng, and Michael Swift.
              </p>
              <p className="mt-4 text-kerna-red text-sm md:text-base">
                If you're a biologist or machine learning engineer who's excited about our mission,
              </p>
              <a 
                href="mailto:founders@kernalabs.ai"
                className="mt-6 inline-block bg-kerna-red/75 px-6 py-3 text-kerna-beige text-sm font-medium hover:bg-kerna-red/90 transition-colors"
              >
                Join Us
              </a>
            </div>
          </div>
          <div 
            className="absolute select-none right-0 top-1/2 transform -translate-y-1/2 w-[120%] sm:w-[70%] md:w-[60%] lg:w-[45%] h-auto"
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
        </div>

        <div className="bg-kerna-darkred">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col items-start">
              <h2 className="text-xl sm:text-2xl font-medium text-kerna-beige mb-4">
                Get Connected
              </h2>
              <p className="text-base sm:text-lg text-kerna-beige/90 max-w-2xl mb-6">
                Learn more about how we're enabling our partners in their mRNA pipeline development.
              </p>
              <a 
                href="mailto:founders@kernalabs.ai"
                className="bg-kerna-beige px-6 py-3 text-kerna-darkred text-sm font-medium hover:bg-kerna-beige/90 transition-colors inline-flex items-center gap-2"
              >
                Contact Us
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-black/40 backdrop-blur-sm text-white py-8">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <img src="/KernaLeaf.svg" alt="Kerna Labs" className="h-8" />
              <p className="text-kerna-beige/90 text-sm">
                © {new Date().getFullYear()} Kerna Labs. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
    </div>
  );
};

export default LandingPage;
