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
  // Mobile state
  const [isMobile, setIsMobile] = useState(false);

  // Team carousel (section 5) states
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Therapeutics carousel (section 4) states
  const [canScrollLeftTherapeutics, setCanScrollLeftTherapeutics] = useState(false);
  const [canScrollRightTherapeutics, setCanScrollRightTherapeutics] = useState(true);
  const therapeuticsCarouselRef = useRef(null);
  const [isDraggingTherapeutics, setIsDraggingTherapeutics] = useState(false);
  const [startXTherapeutics, setStartXTherapeutics] = useState(0);
  const [scrollLeftTherapeutics, setScrollLeftTherapeutics] = useState(0);

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

  // Therapeutics carousel scroll handlers
  const scrollLeftTherapeuticsFunc = () => {
    if (!therapeuticsCarouselRef.current) return;
    const cardWidth = 400; // card width
    therapeuticsCarouselRef.current.scrollBy({
      left: -cardWidth,
      behavior: 'smooth'
    });
  };

  const scrollRightTherapeuticsFunc = () => {
    if (!therapeuticsCarouselRef.current) return;
    const cardWidth = 400; // card width
    therapeuticsCarouselRef.current.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    });
  };

  // Therapeutics carousel drag handlers
  const handleMouseDownTherapeutics = (e) => {
    setIsDraggingTherapeutics(true);
    setStartXTherapeutics(e.pageX - therapeuticsCarouselRef.current.offsetLeft);
    setScrollLeftTherapeutics(therapeuticsCarouselRef.current.scrollLeft);
  };

  const handleMouseLeaveTherapeutics = () => {
    setIsDraggingTherapeutics(false);
  };

  const handleMouseUpTherapeutics = () => {
    setIsDraggingTherapeutics(false);
  };

  const handleMouseMoveTherapeutics = (e) => {
    if (!isDraggingTherapeutics) return;
    e.preventDefault();
    const x = e.pageX - therapeuticsCarouselRef.current.offsetLeft;
    const walk = (x - startXTherapeutics) * 1;
    therapeuticsCarouselRef.current.scrollLeft = scrollLeftTherapeutics - walk;
  };

  // Therapeutics scroll check effect
  useEffect(() => {
    const handleScrollTherapeutics = () => {
      if (!therapeuticsCarouselRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = therapeuticsCarouselRef.current;
      setCanScrollLeftTherapeutics(scrollLeft > 10);
      setCanScrollRightTherapeutics(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const carousel = therapeuticsCarouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScrollTherapeutics);
      // Initial check
      handleScrollTherapeutics();
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScrollTherapeutics);
      }
    };
  }, []);

  // Mobile check effect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  return (
    <div
      className="fixed inset-0 w-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, 
          rgba(0, 0, 0, 0.85) 0%, 
          rgba(14, 23, 43, 0.3) 25%,
          rgba(14, 23, 43, 0.3) 75%,
          rgba(0, 0, 0, 0.85) 100%
        ), url('/BackgroundSwirls.png')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center bottom', 
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
          className="absolute right-0 top-1/2 md:top-2/3 w-[150%] sm:w-4/5 md:w-5/6 h-auto transform -translate-y-1/3 md:-translate-y-1/2"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 75%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 75%)',
          }}
        >
          <img 
            src="/trail.svg" 
            alt="Particle Trail" 
            className="w-full h-full object-scale-down scale-200 sm:scale-150 md:scale-125 select-none"
            style={{
              transform: 'rotate(-2deg) translate(30%, -10%)',
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
            <div className="flex items-start">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-kerna-beige w-1/2">
                mRNA Therapeutics<br />That Have
              </h2>
            </div>
          </div>

          <div className="relative mt-8">
            {/* Carousel */}
            <div 
              ref={therapeuticsCarouselRef}
              className={`overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing ${isMobile ? '' : 'absolute right-0 w-[calc(100%-250px)]'}`}
              onMouseDown={handleMouseDownTherapeutics}
              onMouseLeave={handleMouseLeaveTherapeutics}
              onMouseUp={handleMouseUpTherapeutics}
              onMouseMove={handleMouseMoveTherapeutics}
              style={{ 
                userSelect: 'none',
                paddingLeft: isMobile ? 'calc(50% - 120px)' : 'calc(50% - 250px)',
              }}
            >
              <div className="flex gap-0 pb-4 md:pb-0">
                <div className="flex-none w-[400px] bg-kerna-beige/5 backdrop-blur-sm border border-kerna-beige/10">
                  <div className="p-8">
                    <div className="mb-4 w-8 h-8">
                      <img src="/line-graph.svg" alt="Line Graph" className="w-full h-full" />
                    </div>
                    <h3 className="text-kerna-beige text-xl font-normal mb-4">Expression Curve Tuning</h3>
                    <p className="text-kerna-beige/60">Customizable expression profiles for diverse therapeutic applications.</p>
                  </div>
                </div>

                <div className="flex-none w-[400px] bg-kerna-beige/5 backdrop-blur-sm border border-kerna-beige/10">
                  <div className="p-8">
                    <div className="mb-4 w-8 h-8">
                      <img src="/aim.svg" alt="Target" className="w-full h-full" />
                    </div>
                    <h3 className="text-kerna-beige text-xl font-normal mb-4">Cell-Type Specific Expression</h3>
                    <p className="text-kerna-beige/60">Precision-targeted delivery for cell-specific therapeutic effects.</p>
                  </div>
                </div>

                <div className="flex-none w-[400px] bg-kerna-beige/5 backdrop-blur-sm border border-kerna-beige/10">
                  <div className="p-8">
                    <div className="mb-4 w-8 h-8">
                      <img src="/clock.svg" alt="Clock" className="w-full h-full" />
                    </div>
                    <h3 className="text-kerna-beige text-xl font-normal mb-4">Enhanced Half-life</h3>
                    <p className="text-kerna-beige/60">Prolonged efficacy window through optimized mRNA stability.</p>
                  </div>
                </div>
                
                <div className="w-[calc((100vw-1280px)/2)] flex-none" aria-hidden="true" />
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative pointer-events-none">
              <div className={`flex gap-8 pointer-events-auto ${isMobile ? 'justify-center mt-8' : 'justify-start mt-[120px]'}`}>
                <div className="select-none w-[72px] h-[72px] flex items-center justify-center">
                  <button 
                    onClick={scrollLeftTherapeuticsFunc}
                    disabled={!canScrollLeftTherapeutics}
                    className="w-[72px] h-[72px] transition-none rotate-180 disabled:transform-none disabled:w-[52px] disabled:h-[52px] flex items-center justify-center"
                  >
                    <img 
                      src={canScrollLeftTherapeutics ? '/Arrow.svg' : '/DisabledArrow.svg'} 
                      alt="Previous" 
                      className="w-full h-full"
                    />
                  </button>
                </div>
                <div className="w-[72px] h-[72px] flex items-center justify-center">
                  <button 
                    onClick={scrollRightTherapeuticsFunc}
                    disabled={!canScrollRightTherapeutics}
                    className="w-[72px] h-[72px] transition-none disabled:rotate-180 transform-none disabled:w-[52px] disabled:h-[52px] flex items-center justify-center"
                  >
                    <img 
                      src={canScrollRightTherapeutics ? '/Arrow.svg' : '/DisabledArrow.svg'} 
                      alt="Next" 
                      className="w-full h-full"
                    />
                  </button>
                </div>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-kerna-beige mb-2 sm:mb-3">
              Meet Our Team
            </h2>
            <p className="text-base sm:text-lg text-kerna-beige/90 mb-8 sm:mb-12">
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
              <div className="flex gap-0 pb-4">
                {teamMembers.map((member, idx) => (
                  <div 
                    key={idx}
                    className="w-[220px] sm:w-[240px] md:w-[260px] flex-none"
                  >
                    <div className="border border-white/20 bg-white/5 backdrop-blur-sm h-[300px] sm:h-[320px] md:h-[340px]">
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
                          <h3 className="text-sm sm:text-base md:text-md font-normal text-kerna-beige mb-2">
                            {member.name}
                          </h3>
                          <p className="text-kerna-beige/60 uppercase tracking-wider text-xs sm:text-sm md:text-md px-2">
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

          {/* Team Section Navigation */}
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
            <div className="flex gap-8 justify-center">
              <div className="w-[72px] h-[72px] flex items-center justify-center">
                <button 
                  onClick={scrollLeftFunc}
                  disabled={!canScrollLeft}
                  className="w-[72px] h-[72px] transition-none rotate-180 disabled:transform-none disabled:w-[52px] disabled:h-[52px] flex items-center justify-center"
                >
                  <img 
                    src={canScrollLeft ? '/Arrow.svg' : '/DisabledArrow.svg'} 
                    alt="Previous" 
                    className="w-full h-full"
                  />
                </button>
              </div>
              <div className="w-[72px] h-[72px] flex items-center justify-center">
                <button 
                  onClick={scrollRightFunc}
                  disabled={!canScrollRight}
                  className="w-[72px] h-[72px] transition-none disabled:rotate-180 transform-none disabled:w-[52px] disabled:h-[52px] flex items-center justify-center"
                >
                  <img 
                    src={canScrollRight ? '/Arrow.svg' : '/DisabledArrow.svg'} 
                    alt="Next" 
                    className="w-full h-full disabled:rotate-180 rotate-0"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Our Mission */}
      <section id="mission" className="snap-start h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          {/* Heading - stays left-aligned */}
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
            <div className="relative inline-block">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-normal text-kerna-beige">
                Our Mission
              </h2>
              <div className="absolute -left-2 -bottom-2 w-12 h-0.5 bg-kerna-red"></div>
            </div>
          </div>
          
          {/* Content container - stretches but with max width */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-2xl mx-auto"> {/* Added max-width constraint */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 lg:gap-12">
                {/* Image Container */}
                <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 md:hidden"></div>
                  <img 
                    src="/TeamPhoto.jpg" 
                    alt="Team" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Text Container */}
                <div className="relative md:flex md:items-center">
                  <div className="p-6 sm:p-8 md:p-12 bg-black/30 backdrop-blur-sm border border-white/10 rounded-none md:rounded-lg -mt-20 md:mt-0 relative z-20 w-full h-full flex flex-col justify-center min-h-[250px] sm:min-h-[200px]">
                    <div className="absolute -left-2 -top-2 w-16 h-1 bg-kerna-red hidden md:block"></div>
                    <div className="absolute -left-2 -top-2 w-1 h-16 bg-kerna-red hidden md:block"></div>
                    
                    <div>
                      <p className="text-base sm:text-lg md:text-xl text-kerna-beige mb-6 font-light text-center">
                        Kerna's mission is to revolutionize genetic medicine.
                      </p>
                      <p className="text-sm sm:text-base text-kerna-beige/70 font-light leading-relaxed text-center">
                        We aim to transform the discovery and development of life-changing therapies by leveraging AI and high-throughput biology to decode RNA biology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="bg-kerna-red snap-start min-h-[40vh] items-center relative">
        <div className="absolute left-0 top-0 w-1 h-16 bg-kerna-blue"></div>
        
        {/* White vertical line */}
        
        <div className="container mx-auto px-4 h-full">
          <div className="relative h-full flex flex-col justify-between sm:justify-start py-16 ml-12 lg:ml-24">
            <div className="absolute left-[-2rem] lg:left-[-3rem] top-[calc(16px+2.5rem)] w-0.5 h-[calc(40vh-16px-2.5rem)] bg-kerna-beige"></div>

            <div>
              <h2 className="text-4xl sm:text-5xl text-kerna-beige mb-8">
                Get Connected
              </h2>
              <p className="text-xl text-kerna-beige/90 mb-12">
                Learn more about how we're enabling our partners in their mRNA pipeline development.
              </p>
            </div>
            
            <a 
              href="mailto:founders@kernalabs.ai" 
              className="hidden sm:inline-flex items-center gap-3 bg-kerna-beige/90 hover:bg-kerna-beige transition-colors px-8 py-4 text-kerna-red w-fit mt-auto mb-0"
            >
              Contact Us
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.172 11L10.808 5.63605L12.222 4.22205L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z" fill="currentColor"/>
              </svg>
            </a>

            {/* Mobile button */}
            <a 
              href="mailto:founders@kernalabs.ai" target="_blank" rel="noreferrer"
              className="sm:hidden inline-flex items-center gap-3 bg-kerna-beige/90 hover:bg-kerna-beige transition-colors px-8 py-4 text-kerna-red w-fit mt-8"
            >
              Contact Us
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.172 11L10.808 5.63605L12.222 4.22205L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="h-[30vh] relative flex flex-col"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(14, 23, 43, 0.3)), url('/BackgroundSwirls.png')`, 
          backgroundSize: 'cover', 
          backgroundAttachment: 'fixed' 
        }}
      >
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between container mx-auto px-4">
          {/* Left side - Leaf logo and social links */}
          <div className="flex flex-col items-center my-8">
            <img src="/KernaLeaf.svg" alt="Kerna Leaf" className="w-24 h-auto mb-6 select-none" />
            <div className="flex justify-center gap-6">
              <a href="https://twitter.com/KernaLabs" target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center bg-kerna-beige/90 hover:bg-kerna-beige/100 rounded-full transition-colors">
                <img src="/XIcon.svg" alt="Twitter/X" className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/company/kernalabs" target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center bg-kerna-beige/90 hover:bg-kerna-beige/100 rounded-full transition-colors">
                <img src="/LinkedInIcon.svg" alt="LinkedIn" className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right side - Text logo and copyright */}
          <div className="text-center lg:text-right lg:w-[70%]">
            <img src="/TextOnlyLogo.svg" alt="Kerna Labs" className="mx-auto lg:ml-auto lg:mr-0 mb-4 w-full max-w-md lg:max-w-none h-auto opacity-10 select-none" />
            <p className="text-kerna-beige text-sm">
              © 2024 Kerna Labs
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
