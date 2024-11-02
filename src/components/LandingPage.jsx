import React from 'react';
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
  return (
    <div
      className="snap-y snap-mandatory overflow-y-scroll h-screen"
      style={{ backgroundImage: `url('/BackgroundSwirls.png')`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
    >
      {/* Section 1: Better Genetic Medicines Built with AI */}
      <section id="platform" className="snap-start h-screen flex items-center justify-center text-white">
        <div className="relative z-10 max-w-3xl px-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold">Better Genetic Medicines Built with AI</h1>
          <p className="mt-4 text-lg">
            Kerna Labs is unlocking the full potential of mRNA as the universal toolkit for genetic medicine.
          </p>
        </div>
      </section>

      {/* Section 2: The first platform for RNA-based therapies */}
      <section id="rna-platform" className="snap-start h-screen flex items-center justify-center text-white">
        <div className="relative z-10 max-w-3xl px-8">
          <h2 className="text-4xl font-bold">The first platform for RNA-based therapies</h2>
          <p className="mt-4">We leverage advanced computational techniques and high-throughput biology...</p>
        </div>
      </section>

      {/* Section 3: Despite its potential */}
      <section id="potential" className="snap-start h-screen flex items-center justify-center text-white">
        <div className="relative z-10 max-w-3xl px-8">
          <h2 className="text-4xl font-bold">Despite its potential...</h2>
          <p className="mt-4 text-red-500">Kerna Labs solves these key limitations with cutting-edge payload design.</p>
        </div>
      </section>

      {/* Section 4: MRNA Therapeutics that have... */}
      <section id="therapeutics" className="snap-start h-screen flex flex-col text-white">
        <div className="p-12 max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-8">MRNA Therapeutics That Have</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">High Expression</h3>
              <p className="text-gray-400">Tuned expression curves for any application.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Cell-type Specificity</h3>
              <p className="text-gray-400">More targeted and effective delivery.</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Improved Half-life</h3>
              <p className="text-gray-400">Magnitudes higher protein output.</p>
            </div>
          </div>
        </div>
        <div className="bg-white text-black p-12 mt-12">
          <p className="text-3xl font-light">Kerna Labs is building foundation models to programmatically develop better mRNA therapeutics.</p>
        </div>
      </section>

      {/* Section 5: Meet our team */}
      <section id="team" className="snap-start h-screen overflow-x-auto flex bg-transparent text-white">
        <div className="flex space-x-8 px-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="min-w-[300px] h-full bg-gray-900 p-6 rounded-lg flex flex-col">
              <img src={member.image} alt={member.name} className="rounded-full mb-4 w-32 h-32 mx-auto object-cover" />
              <h3 className="text-xl font-semibold text-white text-center">{member.name}</h3>
              <p className="text-blue-300 text-center">{member.position}</p>
              <ul className="text-gray-300 mt-4 text-sm list-disc list-inside flex-1">
                {member.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>


      {/* Section 6: Our Mission */}
      <section id="mission" className="snap-start h-screen flex items-center text-white">
        <div className="flex items-center max-w-6xl mx-auto">
          <img src="/TeamPhoto.jpg" alt="Team" className="w-1/2 rounded-lg" />
          <div className="ml-8">
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="mt-4">Kerna Labs’ mission is to build the first true platform for RNA therapeutics...</p>
          </div>
        </div>
      </section>

      {/* Section 7: Join Us */}
      <section id="join-us" className="snap-start h-screen flex items-center text-white">
        <div className="relative z-10 max-w-3xl px-8">
          <h2 className="text-4xl font-bold">Join Us in Shaping the Future of Medicine</h2>
          <p className="mt-4 text-red-500">Kerna Labs was founded in 2024 by leading experts in the field...</p>
        </div>
      </section>

      {/* Section 8: Get Connected */}
      <section id="contact" className="snap-start h-screen flex items-center justify-center bg-red-600 text-white">
        <div className="text-center">
          <h2 className="text-5xl font-bold">Get Connected</h2>
          <p className="mt-4">Learn more about how we’re enabling our partners in their mRNA pipeline development.</p>
          <button className="mt-8 px-6 py-3 bg-white text-red-600 font-semibold rounded-lg">
            Partner With Us &#8594;
          </button>
        </div>
      </section>

      <footer className="h-16 bg-black text-white flex items-center justify-center">
        <p>&copy; 2024 Kerna Labs</p>
      </footer>
    </div>
  );
};

export default LandingPage;
