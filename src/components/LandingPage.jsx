import React, { lazy, Suspense } from 'react';
import MediaCard from './MediaCard';
import AnimatedSection from './AnimatedSection';
import StaggeredText from './StaggeredText';
import RotatingText from './RotatingText';
import TherapeuticCard from './TherapeuticCard';
import TeamCard from './TeamCard';
import LogoGrid from './LogoGrid';
import useCarousel from '../hooks/useCarousel';
import { coreTeam, advisors } from '../data/teamMembers';

// Lazy load the DNA animation
const DNACursorAnimation = lazy(() => import('./DNACursorAnimation'));

// Constants for repeated classes
const CLASSES = {
  container: 'container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
  sectionHeading: 'text-fluid-2xl sm:text-fluid-3xl lg:text-fluid-4xl font-display font-semibold tracking-display-normal text-kerna-beige mb-4',
  sectionDescription: 'text-fluid-lg font-body text-kerna-beige/60 max-w-2xl',
  card: 'relative h-full bg-gradient-to-br from-kerna-beige/5 to-kerna-beige/10 backdrop-blur-md border border-kerna-beige/10 hover:border-kerna-beige/20 hover:from-kerna-beige/10 hover:to-kerna-beige/15 transition-all duration-300 group shadow-lg hover:shadow-xl',
  logoImage: 'h-6 sm:h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity',
  carouselArrow: 'pointer-events-auto w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 rounded-full transition-all'
};

// Therapeutic cards data
const therapeuticCards = [
  {
    icon: '/icons/line-graph.svg',
    title: 'Expression Curve Tuning',
    description: 'Customizable expression profiles for diverse therapeutic applications.'
  },
  {
    icon: '/icons/aim.svg',
    title: 'Cell-Type Specific Expression',
    description: 'Precision-targeted delivery for cell-specific therapeutic effects.'
  },
  {
    icon: '/icons/clock.svg',
    title: 'Enhanced Half-life',
    description: 'Prolonged efficacy window through optimized mRNA stability.'
  }
];

// Journal logos data
const journalLogos = [
  { src: '/logos/cell-logo.png', alt: 'Cell' },
  { src: '/logos/nature-text-logo.png', alt: 'Nature' },
  { src: '/logos/science-logo.png', alt: 'Science' },
  { src: '/logos/pnas-logo.png', alt: 'PNAS' },
  { src: '/logos/csh-text-logo.png', alt: 'CSH' },
  // { src: '/logos/naturedd-text-logo.png', alt: 'Nature DD' },
  // { src: '/logos/naturebiotech-text-logo.png', alt: 'Nature Biotech' },
];

// Partner logos data
const partnerLogos = [
  { src: '/logos/gradient-logo.png', alt: 'Gradient Ventures' },
  { src: '/logos/humba-logo.png', alt: 'Humba Ventures' },
  { src: '/logos/tau-logo.png', alt: 'Tau Ventures' },
  { src: '/logos/pioneer-logo.png', alt: 'Pioneer Fund' }
];

// Media articles data
const mediaArticles = [
  {
    href: 'https://www.asbmb.org/asbmb-today/careers/040225/melissa-moore-to-speak-at-asbmb-2025',
    logo: '/logos/asbmb-text-logo.png',
    date: 'April 2, 2025',
    title: 'Melissa Moore to speak at ASBMB 2025',
    description: 'Renowned RNA biochemist Melissa Moore will take center stage at ASBMB\'s 2025 Annual Meeting.',
    isPublication: false
  },
  {
    href: 'https://endpoints.news/modernas-former-top-scientist-moore-has-a-new-mrna-startup/',
    logo: '/logos/endpoint-text-logo.png',
    date: 'January 10, 2025',
    title: 'Exclusive: Moderna\'s former top scientist has a new startup using AI to improve mRNA therapies',
    description: 'Kerna Labs was founded in 2024 by industry veterans Amit Deshwar, Melissa J. Moore, and Julia Peng.',
    isPublication: false
  },
  // {
  //   href: 'https://genome.cshlp.org/content/34/3/394.short',
  //   logo: '/logos/csh-text-logo.png',
  //   date: 'March 20, 2024',
  //   title: 'Translation dependent and independent mRNA decay occur through mutually exclusive pathways defined by ribosome density during T cell activation',
  //   description: 'A breakthrough in RNA language modeling, enabling unprecedented understanding and design of RNA sequences.',
  //   isPublication: true
  // },
  // {
  //   href: 'https://www.nature.com/articles/s41573-023-00827-x',
  //   logo: '/logos/naturerdd-text-logo.png',
  //   date: 'November 29, 2023',
  //   title: 'Tailor made: the art of therapeutic mRNA design',
  //   description: 'Comprehensive analysis of regulatory elements and their role in muscle development and function.',
  //   isPublication: true
  // },
  // {
  //   href: 'https://www.nature.com/articles/s41587-022-01525-6',
  //   logo: '/logos/naturebiotech-text-logo.png',
  //   date: 'November 10, 2022',
  //   title: 'An engineered T7 RNA polymerase that produces mRNA free of immunostimulatory byproducts',
  //   description: 'A breakthrough in mRNA production, enabling safer and more effective therapies.',
  //   isPublication: true
  // }
];

const LandingPage = ({ contentReady = true }) => {
  // Team carousels
  const teamCarousel = useCarousel();
  const advisorsCarousel = useCarousel();
  
  console.log('[LandingPage] Component rendered');
  
  return (
    <div
      id="landing-page-container"
      className="fixed inset-0 w-screen overflow-y-scroll overflow-x-hidden bg-black"
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
      {/* Sentinel element for navbar scroll detection */}
      <div id="navbar-scroll-sentinel" className="w-full h-1" style={{ position: 'absolute', top: 0, left: 0 }} />
      
      {/* Section 1: Better Genetic Medicines */}
      <section id="main" className="min-h-screen w-full flex items-center relative py-24 sm:py-32 lg:py-40">
        {/* DNA Cursor Animation - absolute positioned to cover the section */}
        <div className="absolute inset-0 overflow-hidden">
          <Suspense fallback={<div className="w-full h-full" />}>
            <DNACursorAnimation 
              baseSize={12}
              growSize={20}
              growDistance={180}
              gapX={40}
              gapY={40}
              colorPalette={['#666666', '#777777', '#888888', '#999999']}
              animationDuration={0.2}
              containerClassName="w-full h-full"
            />
          </Suspense>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-20 pointer-events-none px-4 sm:px-6 lg:px-8">
          <div className="w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
            <h1 className="font-display font-bold tracking-display-tight leading-tight text-kerna-beige">
              {/* First line - responsive sizing */}
              <span className="block text-fluid-3xl sm:text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl">
                <StaggeredText 
                  text="Better genetic medicines," 
                  delay={60}
                  startDelay={150}
                  ready={contentReady}
                />
              </span>
              
              {/* Second line - same size as first line */}
              <div className="block text-fluid-3xl sm:text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl mt-1 sm:mt-2">
                <RotatingText 
                  words={['built', 'designed', 'engineered']} 
                  interval={3000}
                  className="text-kerna-red inline align-baseline"
                />
                <span className="inline align-baseline ml-2 sm:ml-3 whitespace-nowrap">
                  <StaggeredText 
                    text="with AI." 
                    delay={60}
                    startDelay={600}
                    ready={contentReady}
                    className="inline"
                  />
                </span>
              </div>
            </h1>
            <div className="w-full sm:max-w-md lg:max-w-lg mt-4 md:mt-6">
              <p className={`text-fluid-base sm:text-fluid-lg md:text-fluid-xl font-body text-kerna-beige/90 transition-all duration-500 delay-700 ${
                contentReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Kerna Labs is unlocking the full potential of mRNA as the universal toolkit for genetic medicine.
              </p>
            </div>
          </div>
        </div>
        <div 
          className="select-none absolute right-0 top-1/2 transform -translate-y-1/2 w-[120%] sm:w-[70%] md:w-[60%] lg:w-[45%] h-auto mask-fade-vertical"
        >
          {/* <img 
            src="/hazy_droplet.svg" 
            alt="Hazy Droplet" 
            className="w-full h-full object-contain select-none"
          /> */}
        </div>
      </section>

      {/* <section id="platform" className="snap-start h-screen w-full flex items-center relative overflow-hidden">
        <div 
          className="absolute right-0 top-1/2 md:top-2/3 w-[150%] sm:w-4/5 md:w-5/6 h-auto transform -translate-y-1/3 md:-translate-y-1/2 mask-fade-bottom"
        >
          <img 
            src="/trail.svg" 
            alt="Particle Trail" 
            className="w-full h-full object-scale-down scale-200 sm:scale-150 md:scale-125 select-none -rotate-2 translate-x-[30%] -translate-y-[10%] origin-center"
          />
        </div>

        <div className="{CLASSES.container} relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-20 h-20 bg-kerna-darkred/10 rounded-full blur-2xl" />
              <div className="bg-black/30 backdrop-blur-sm backdrop-brightness-90 border border-white/10 rounded-none p-8 relative">
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

            <div className="relative mt-12 md:mt-32">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-kerna-darkred/10 rounded-full blur-2xl" />
              <div className="bg-black/30 backdrop-blur-sm backdrop-brightness-75 border border-white/10 rounded-none p-8 relative">
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
      </section> */}

      {/* Section 4: MRNA Therapeutics + Banner */}
      <div>
        {/* MRNA Therapeutics */}
        <section id="therapeutics" className="py-20 sm:py-28 lg:py-36">
          <div className={CLASSES.container}>
            <AnimatedSection animation="fadeInUp" className="mb-12">
              <h2 className={CLASSES.sectionHeading}>
                A Foundation Model for mRNA Therapeutics
              </h2>
              <p className={CLASSES.sectionDescription}>
                We leverage AI and high-throughput biology to decode RNA biology.
              </p>
            </AnimatedSection>
          </div>

          <div className={CLASSES.container}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full">
              {therapeuticCards.map((card, idx) => (
                <TherapeuticCard
                  key={idx}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  delay={idx * 100}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Therapeutics Banner */}
        <AnimatedSection animation="fadeIn" threshold={0.1}>
          <div className="bg-kerna-beige">
            <div className={CLASSES.container}>
              <div className="flex items-center py-8 sm:py-10 lg:py-12">
                <AnimatedSection animation="slideInLeft" className="w-1 h-16 bg-kerna-darkred mr-6 flex-shrink-0"></AnimatedSection>
                <AnimatedSection animation="fadeInUp" delay={100}>
                  <p className="text-fluid-sm sm:text-fluid-base md:text-fluid-lg lg:text-fluid-xl text-kerna-darkblue font-display font-medium leading-snug">
                    Our platform designs mRNA sequences that drive magnitude higher protein output with unprecedented cell-type precision.
                  </p>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Section 5: Team + Advisors + Banners */}
      <div>
        {/* Core Team */}
        <section id="team" className="pt-20 pb-8 sm:pt-28 sm:pb-10 lg:pt-36 lg:pb-12">
          <div className={CLASSES.container}>
            <AnimatedSection animation="fadeInUp" className="mb-12">
              <h2 className={CLASSES.sectionHeading}>
                Meet Our Team
              </h2>
              <p className={CLASSES.sectionDescription}>
                Built and backed by the leading minds in machine learning and mRNA.
              </p>
            </AnimatedSection>
          </div>

          <div className="relative">
            <div 
              ref={teamCarousel.carouselRef}
              className="overflow-x-auto overflow-y-hidden hide-scrollbar no-select cursor-grab active:cursor-grabbing pl-carousel pr-4"
              onMouseDown={teamCarousel.handleMouseDown}
              onMouseLeave={teamCarousel.handleMouseLeave}
              onMouseUp={teamCarousel.handleMouseUp}
              onMouseMove={teamCarousel.handleMouseMove}
            >
              <div className="flex gap-4 pb-2">
                {coreTeam.map((member, idx) => (
                  <TeamCard
                    key={idx}
                    member={member}
                    delay={idx * 30}
                  />
                ))}
                <div className="w-[calc((100vw-1280px)/2)] flex-none" aria-hidden="true" />
              </div>
            </div>

            {/* Navigation arrows - positioned absolutely */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className={CLASSES.container}>
                <div className="flex justify-between">
                  <button 
                    onClick={teamCarousel.scrollLeftFunc}
                    disabled={!teamCarousel.canScrollLeft}
                    className={`${CLASSES.carouselArrow} ${
                      teamCarousel.canScrollLeft ? 'opacity-100 hover:bg-black/70' : 'opacity-30 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-6 h-6 text-white rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button 
                    onClick={teamCarousel.scrollRightFunc}
                    disabled={!teamCarousel.canScrollRight}
                    className={`${CLASSES.carouselArrow} ${
                      teamCarousel.canScrollRight ? 'opacity-100 hover:bg-black/70' : 'opacity-30 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advisors */}
        <section id="advisors" className="pt-4 pb-20 sm:pt-6 sm:pb-28 lg:pt-8 lg:pb-36">
          <div className={CLASSES.container}>
            <AnimatedSection animation="fadeInUp" className="mb-12">
              <div className="flex items-center gap-4">
                <div className="hidden sm:block h-px bg-kerna-beige/20 w-16 lg:w-24"></div>
                <p className="text-fluid-base sm:text-fluid-lg lg:text-fluid-xl font-display font-medium text-kerna-beige/70 tracking-wide uppercase">
                  Advised by the top scientific minds in genetic medicine
                </p>
                <div className="hidden sm:block h-px bg-kerna-beige/20 flex-1"></div>
              </div>
            </AnimatedSection>
          </div>

          <div className="relative">
            <div 
              ref={advisorsCarousel.carouselRef}
              className="overflow-x-auto overflow-y-hidden hide-scrollbar no-select cursor-grab active:cursor-grabbing pl-carousel pr-4"
              onMouseDown={advisorsCarousel.handleMouseDown}
              onMouseLeave={advisorsCarousel.handleMouseLeave}
              onMouseUp={advisorsCarousel.handleMouseUp}
              onMouseMove={advisorsCarousel.handleMouseMove}
            >
              <div className="flex gap-4 pb-2">
                {advisors.map((member, idx) => (
                  <TeamCard
                    key={idx}
                    member={member}
                    delay={idx * 30}
                  />
                ))}
                <div className="w-[calc((100vw-1280px)/2)] flex-none" aria-hidden="true" />
              </div>
            </div>

            {/* Navigation arrows - positioned absolutely */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className={CLASSES.container}>
                <div className="flex justify-between">
                  <button 
                    onClick={advisorsCarousel.scrollLeftFunc}
                    disabled={!advisorsCarousel.canScrollLeft}
                    className={`${CLASSES.carouselArrow} ${
                      advisorsCarousel.canScrollLeft ? 'opacity-100 hover:bg-black/70' : 'opacity-30 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-6 h-6 text-white rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button 
                    onClick={advisorsCarousel.scrollRightFunc}
                    disabled={!advisorsCarousel.canScrollRight}
                    className={`${CLASSES.carouselArrow} ${
                      advisorsCarousel.canScrollRight ? 'opacity-100 hover:bg-black/70' : 'opacity-30 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Banner */}
        <AnimatedSection animation="fadeIn" threshold={0.1}>
          <div className="bg-kerna-beige">
            <div className={`${CLASSES.container} py-8 sm:py-10 lg:py-12`}>
            <div className="text-center">
              <AnimatedSection animation="fadeInUp" delay={0}>
                <h3 className="text-fluid-sm sm:text-fluid-lg md:text-fluid-2xl text-kerna-darkblue font-display font-semibold tracking-tight mb-6 sm:mb-8">
                  Built by a world-class team
                </h3>
              </AnimatedSection>
              
              {/* Journal Logos */}
              <AnimatedSection animation="fadeIn" delay={100}>
                <LogoGrid logos={journalLogos} className="mb-10 sm:mb-16" />
              </AnimatedSection>
              
              <AnimatedSection animation="fadeInUp" delay={200}>
                <h3 className="text-fluid-sm sm:text-fluid-lg md:text-fluid-2xl text-kerna-darkblue font-display font-semibold tracking-tight mb-6 sm:mb-8">
                  Backed by visionary partners
                </h3>
              </AnimatedSection>
              
              {/* Partner Logos */}
              <AnimatedSection animation="fadeIn" delay={300}>
                <LogoGrid logos={partnerLogos} />
              </AnimatedSection>
            </div>
          </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Section 6: Our Mission - Commented out */}
      {/* <section id="mission" className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          {/* Heading - stays left-aligned */}
          {/* <div className="{CLASSES.container} mb-8">
            <div className="relative inline-block">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-kerna-beige">
                Our Mission
              </h2>
              <div className="absolute -left-2 -bottom-2 w-12 h-0.5 bg-kerna-red"></div>
            </div>
          </div> */}
          
          {/* Content container */}
          {/* <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 lg:gap-12">
                {/* Image Container */}
                {/* <div className="relative aspect-[4/3] md:aspect-auto md:h-[400px] lg:h-[500px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 md:hidden"></div>
                  <img 
                    src="/team/TeamPhoto.jpg" 
                    alt="Team" 
                    className="w-full h-full object-cover"
                  />
                </div> */}
                
                {/* Text Container */}
                {/* <div className="relative md:flex md:items-center">
                  <div className="p-6 bg-black/30 backdrop-blur-sm border border-white/10 rounded-none -mt-20 py-20 md:mt-0 md:py-0 relative z-20 w-full h-full flex flex-col justify-center">
                    <div className="absolute -left-2 -top-2 w-16 h-1 bg-kerna-red hidden md:block"></div>
                    <div className="absolute -left-2 -top-2 w-1 h-16 bg-kerna-red hidden md:block"></div>
                    
                    <div>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-kerna-beige mb-6 font-normal text-center">
                        We are revolutionizing genetic medicine
                      </p>
                      <p className="text-sm sm:text-base md:text-lg text-kerna-beige/70 font-light leading-relaxed text-center">
                        We are paving the way for a new generation of therapies by leveraging AI and high-throughput biology to decode RNA biology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Section 6: Media & Publications */}
      <section id="media" className="py-20 sm:py-28 lg:py-36">
        <div className={CLASSES.container}>
          {/* Heading and Intro */}
          <AnimatedSection animation="fadeInUp" className="mb-12">
            <h2 className={CLASSES.sectionHeading}>
              <StaggeredText 
                text="Media & Publications" 
                animateOnView={true}
                delay={100}
              />
            </h2>
            <AnimatedSection animation="fadeIn" delay={150}>
              <p className={CLASSES.sectionDescription}>
                Pioneering the next era of genetic medicine.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fadeIn" delay={250}>
              <p className="text-fluid-lg font-body text-kerna-beige/60 max-w-3xl mt-2">
                We are building large-scale machine learning models to design mRNA with unmatched potency, targeting, and safety.
              </p>
            </AnimatedSection>
          </AnimatedSection>

          {/* Media List */}
          <div className="space-y-6">
            {mediaArticles.map((article, idx) => (
              <MediaCard 
                key={idx}
                href={article.href}
                logo={article.logo}
                date={article.date}
                title={article.title}
                description={article.description}
                isPublication={article.isPublication}
                delay={50 + idx * 50}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <AnimatedSection animation="fadeIn" threshold={0.05}>
        <section id="contact" className="bg-kerna-red relative">
          
          <div className="container mx-auto px-4">
            <div className="relative mx-auto px-4 py-16 sm:py-20 lg:py-28 ml-12 lg:ml-24">
              <div className="absolute left-[-2rem] lg:left-[-3rem] top-8 bottom-0 w-0.5 bg-kerna-beige/60"></div>

              <AnimatedSection animation="slideUp" delay={100}>
                <div>
                  <h2 className="text-fluid-2xl sm:text-fluid-3xl font-display font-semibold tracking-display-normal text-kerna-beige mb-6 md:mb-8">
                    Connect With Us
                  </h2>
                  <p className="text-fluid-lg font-body text-kerna-beige/80 mb-8">
                    Learn more about how we're enabling our partners in their mRNA pipeline development.
                  </p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fadeInUp" delay={200}>
                <a 
                  href="mailto:founders@kernalabs.ai" 
                  className="inline-flex items-center gap-3 bg-kerna-beige/90 hover:bg-kerna-beige transition-colors px-8 py-4 text-kerna-red font-body font-medium w-fit"
                >
                  Contact Us
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.172 11L10.808 5.63605L12.222 4.22205L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z" fill="currentColor"/>
                  </svg>
                </a>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection animation="fadeIn" threshold={0.1}>
        <footer 
          className="min-h-[30vh] relative flex flex-col py-12 sm:py-16 lg:py-20"
          style={{ 
            background: `linear-gradient(to bottom, 
              rgba(0, 0, 0, 0.9) 0%, 
              rgba(0, 0, 0, 0.4) 50%,
              rgba(0, 0, 0, 0.9) 100%
            )`
          }}
        >
          <div className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between container mx-auto px-4 gap-8 lg:gap-12">
            {/* Left side - Leaf logo and social links */}
            <AnimatedSection animation="fadeInUp" delay={50} className="flex flex-col items-center">
              <img src="/icons/KernaLeaf.svg" alt="Kerna Leaf" className="w-20 sm:w-24 h-auto mb-4 sm:mb-6 select-none" />
              <div className="flex justify-center gap-4 sm:gap-6">
                <a href="https://twitter.com/KernaLabs" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-kerna-beige/90 hover:bg-kerna-beige/100 rounded-full transition-all hover:scale-110 duration-300">
                  <img src="/icons/XIcon.svg" alt="Twitter/X" className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="https://linkedin.com/company/kernalabs" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-kerna-beige/90 hover:bg-kerna-beige/100 rounded-full transition-all hover:scale-110 duration-300">
                  <img src="/icons/LinkedInIcon.svg" alt="LinkedIn" className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </AnimatedSection>

            {/* Right side - Text logo and copyright */}
            <AnimatedSection animation="fadeIn" delay={150} className="text-center lg:text-right lg:w-[70%]">
              <img src="/icons/TextOnlyLogo.svg" alt="Kerna Labs" className="mx-auto lg:ml-auto lg:mr-0 mb-2 sm:mb-4 w-full max-w-[280px] sm:max-w-md lg:max-w-none h-auto opacity-10 select-none" />
              <p className="text-kerna-beige text-fluid-sm font-body">
                © 2025 Kerna Labs
              </p>
            </AnimatedSection>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  );
};

export default LandingPage;
