import React from 'react';
import Image from './Image';

const ImageTest = () => {
  return (
    <div className="p-8 bg-black">
      <h2 className="text-white mb-4">Image Component Test</h2>
      
      <div className="space-y-8">
        {/* Test 1: Team photo */}
        <div>
          <h3 className="text-white mb-2">Team Photo (optimized versions may not exist)</h3>
          <Image
            src="/images/team/members/Melissa Moore.jpg"
            alt="Test team member"
            type="team"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
        
        {/* Test 2: Logo */}
        <div>
          <h3 className="text-white mb-2">Logo (should maintain aspect ratio)</h3>
          <div className="bg-white p-4 inline-block">
            <Image
              src="/images/logos/media/endpoint-text-logo.png"
              alt="Endpoint logo"
              type="logo"
              style={{ maxHeight: '40px', width: 'auto' }}
            />
          </div>
        </div>
        
        {/* Test 3: Background image */}
        <div>
          <h3 className="text-white mb-2">Background (hero image)</h3>
          <div className="w-full h-64 relative">
            <Image
              src="/images/backgrounds/BackgroundSwirls.png"
              alt="Background"
              type="hero"
              className="absolute inset-0 w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTest;