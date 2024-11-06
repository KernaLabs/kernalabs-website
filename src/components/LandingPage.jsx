import React, { useState, useEffect, useRef } from 'react';
const teamMembers = [
  {
    name: 'Amit Deshwar, PhD',
    position: 'Co-founder & CTO',
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
  const [visibleCards, setVisibleCards] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type === 'mousedown' ? e.pageX : e.touches[0].pageX);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / visibleCards;
      const scrollPos = carouselRef.current.scrollLeft;
      const nearestCard = Math.round(scrollPos / cardWidth);
      carouselRef.current.scrollTo({
        left: nearestCard * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1.5);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2.5);
      } else {
        setVisibleCards(3.5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <div
      className="snap-y snap-mandatory overflow-y-scroll h-screen"
      style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/BackgroundSwirls.png')`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
    >
      {/* Section 1: Better Genetic Medicines */}
      <section id="platform" className="snap-start h-screen flex items-center relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:max-w-md md:max-w-xl lg:max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold leading-tight text-white">
              Better genetic medicines, built with AI.
            </h1>
          </div>
          <div className="sm:max-w-sm md:max-w-md lg:max-w-lg">
            <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80">
              Kerna Labs is unlocking the full potential of mRNA as the universal toolkit for genetic medicine.
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-auto ">
          <img 
            src="/hazy_droplet.svg" 
            alt="Hazy Droplet" 
            className="w-full h-full object-contain opacity-100"
          />
        </div>
      </section>

      {/* Section 2: RNA Platform */}
      <section id="rna-platform" className="snap-start h-screen flex items-center relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 h-auto">
          <img 
            src="/shiny_droplet.svg" 
            alt="Shiny Droplet" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:max-w-md md:max-w-xl lg:max-w-2xl ml-auto">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-tight text-white">
              The first platform for RNA-based therapies.
            </h2>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80">
              We leverage advanced computational techniques and high-throughput biology to fundamentally change the way we do drug discovery and development.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Potential */}
      <section id="potential" className="snap-start h-screen flex items-center relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium leading-tight tracking-tight text-white">
              Despite its potential, mRNA is held back by key bottlenecks in payload design and delivery
            </h2>
            <p className="mt-4 md:mt-6 text-xl md:text-2xl text-kerna-red">
              Kerna Labs solves these key limitations with cutting-edge payload design
            </p>
          </div>
        </div>
        <div 
          className="absolute right-0 top-0 w-2/3 h-auto"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 95%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0) 95%)',
          }}
        >
          <img 
            src="/trail.svg" 
            alt="Particle Trail" 
            className="w-full h-full object-cover"
            style={{
              transform: 'rotate(0deg) translate(20%, 10%)',
              transformOrigin: 'center'
            }}
          />
        </div>
      </section>

      {/* Section 4: MRNA Therapeutics */}
      <section id="therapeutics" className="snap-start min-h-screen flex flex-col text-white relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 flex-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium mb-8 md:mb-16">
            MRNA Therapeutics That Have
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 rounded-lg hover:border-kerna-red/50 transition-colors">
              <div className="mb-4 text-kerna-red">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-normal mb-2">High expression</h3>
              <p className="text-gray-400 text-sm sm:text-base">Tuned expression curves for any application.</p>
            </div>
            {/* Add more cards with similar structure */}
          </div>
        </div>
        
        <div className="bg-[#EDE9DF] text-black p-6 sm:p-8 md:p-12 lg:p-16">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium max-w-7xl mx-auto">
            Kerna Labs is building foundation models to programmatically develop better mRNA therapeutics
          </p>
        </div>
        
        {/* <button 
          onClick={() => document.getElementById('team').scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-kerna-red hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button> */}
      </section>

      {/* Section 5: Team */}
      <section id="team" className="snap-start min-h-screen overflow-hidden">
        <div className="py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-medium text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-white/60 mb-16">
              Built and backed by the leading minds in machine learning and mRNA
            </p>
          </div>

          <div className="relative">
            <div 
              ref={carouselRef}
              className="overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing mx-[calc((100vw-1280px)/2)]"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              onScroll={() => {
                if (!carouselRef.current) return;
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                setCanScrollLeft(scrollLeft > 10);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
              }}
              style={{
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <div className="flex gap-6">
                {teamMembers.map((member, idx) => (
                  <div 
                    key={idx}
                    className="w-[400px] flex-none"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <div className="border border-white/20 bg-white/5 backdrop-blur-sm p-8 text-center h-full">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover" 
                      />
                      <h3 className="text-2xl font-normal text-white mb-2">
                        {member.name}
                      </h3>
                      <p className="text-white/60 uppercase tracking-wider text-sm mb-6">
                        {member.position}
                      </p>
                      <div className="text-white/60 text-center space-y-2">
                        {member.description.slice(0, 5).map((desc, i) => (
                          <p key={i}>{desc}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="w-[calc((100vw-1280px)/2)] flex-none" aria-hidden="true" />
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex gap-8 mt-8">
                <button 
                  onClick={scrollLeftFunc}
                  disabled={!canScrollLeft}
                  className={`p-2 ${
                    canScrollLeft 
                      ? 'text-white hover:text-kerna-red' 
                      : 'text-white/20 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Our Mission */}
      <section id="mission" className="snap-start h-screen">
        <div className="h-full">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white px-4 sm:px-6 lg:px-8 pt-16 pb-8">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Image */}
            <div className="h-[500px]"> {/* Fixed height */}
              <img 
                src="/TeamPhoto.jpg" 
                alt="Team" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right side - Text content */}
            <div className="h-[500px] bg-white/10 backdrop-blur-sm border-t border-r border-b border-white/20 p-8 md:p-12 flex flex-col justify-center">
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Kerna Labs' mission is to build the first true platform for RNA therapeutics. The future is disease-free.
              </p>
              <p className="text-lg md:text-xl text-white/70 mb-6">
                Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin. Mi feugiat dictum mauris turpis donec egestas.
              </p>
              <p className="text-lg md:text-xl text-white/70">
                Lorem ipsum dolor sit amet consectetur. Molestie placerat justo aliquet tellus felis ornare dignissim sapien. Urna sed enim neque neque urna varius diam vitae. Tortor vel nunc quis urna metus feugiat leo proin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Join Us */}
      <section id="join-us" className="snap-start h-screen flex items-center relative">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-white">
              Join Us in Shaping the Future of Medicine
            </h2>
            <p className="mt-4 text-kerna-red text-base md:text-lg">
              Kerna Labs was founded in 2024 by Amit Deshwar, Melissa Moore, Julia Peng, and Michael Swift.
            </p>
            <p className="mt-4 text-kerna-red text-base md:text-lg">
              If you're a biologist or machine learning engineer who's excited about our mission, we'd love to hear from you.
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-auto">
          <img 
            src="/hazy_droplet.svg" 
            alt="Hazy Droplet" 
            className="w-full h-full object-contain opacity-90"
          />
        </div>
      </section>

      {/* Section 8: Get Connected */}
      <section id="contact" className="snap-start h-screen flex items-center justify-center bg-kerna-red text-white">
        <div className="text-center px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Get Connected</h2>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto">
            Learn more about how we're enabling our partners in their mRNA pipeline development. kernalabs K
          </p>
          <button className="mt-6 md:mt-8 px-4 md:px-6 py-2 md:py-3 bg-white text-kerna-red font-semibold rounded-lg text-sm md:text-base">
            Partner With Us &#8594;
          </button>
        </div>
      </section>

      <footer className="h-12 md:h-16 bg-black text-white flex items-center justify-center text-sm md:text-base">
        <p>&copy; 2024 Kerna Labs</p>
      </footer>
    </div>
  );
};

export default LandingPage;
