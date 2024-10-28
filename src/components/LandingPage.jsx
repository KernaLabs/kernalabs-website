import React from 'react';

const LandingPage = () => {
  return (
    <div>
      {/* Home Section */}
      <section id="home" className="h-screen flex items-center justify-center bg-white">
        <h1 className="text-4xl font-bold text-primary">Welcome to Our Company</h1>
      </section>

      {/* Platform Section */}
      <section id="platform" className="h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-secondary mb-4">Our Platform</h2>
          <p className="text-gray-700">
            Detailed information about our platform goes here. Explain features, benefits, and unique selling points.
          </p>
        </div>
      </section>

      {/* About Us Section with Stationary Background */}
      <section id="about" className="h-screen bg-fixed bg-center bg-cover" style={{ backgroundImage: `url('/path-to-your-image.jpg')` }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="max-w-2xl mx-auto">
              Information about the company, mission, vision, and values.
            </p>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-secondary mb-4">Careers</h2>
          <p className="text-gray-700">
            Information about job openings, company culture, and benefits.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen flex items-center justify-center bg-white">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-secondary mb-4">Contact Us</h2>
          <p className="text-gray-700">
            Contact form or contact information goes here.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;