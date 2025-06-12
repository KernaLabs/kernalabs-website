import React from 'react';
import AnimatedSection from './AnimatedSection';
import InstitutionLogo from './InstitutionLogo';

const TeamCard = ({ member, delay = 0 }) => {
  const cardClass = 'h-full bg-gradient-to-br from-kerna-beige/5 to-kerna-beige/10 backdrop-blur-md border border-kerna-beige/10 hover:border-kerna-beige/20 transition-[border-color,box-shadow] duration-300 group shadow-lg hover:shadow-xl';
  
  return (
    <div className="flex-none w-[320px]">
      <div className={cardClass}>
        <AnimatedSection
          animation="fadeInUp"
          delay={delay}
          className="px-6 py-10 flex flex-col h-[360px]"
        >
          {/* Image section */}
          <div className="flex items-center justify-center mb-2">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-20 h-20 rounded-full object-cover select-none pointer-events-none transition-all duration-300 group-hover:brightness-110"
              draggable="false"
            />
          </div>
          
          {/* Text section */}
          <div className="text-center mb-1 px-2">
            <h3 className="text-fluid-base font-display font-medium text-kerna-beige mb-0.5 whitespace-nowrap">
              {member.name}
            </h3>
            <p className="text-kerna-beige/60 uppercase tracking-wider text-fluid-sm font-body">
              {member.position}
            </p>
          </div>
          
          {/* Institution logos section */}
          <div className="mt-auto">
            <div className="min-h-[50px] flex items-center justify-center px-4">
              <div className="flex items-center justify-center gap-3 flex-wrap max-w-full">
                {member.institutions && member.institutions.map((institution, instIdx) => {
                  // Calculate group scale based on number of logos
                  const logoCount = member.institutions.length;
                  let groupScale = 1.0;
                  
                  if (logoCount === 1) {
                    groupScale = 1.5;
                  } else if (logoCount === 2) {
                    groupScale = 1.3;
                  } else if (logoCount === 3) {
                    groupScale = 1.0;
                  } else if (logoCount === 4) {
                    groupScale = 0.95;
                  } else if (logoCount >= 5) {
                    groupScale = 0.9;
                  }
                  
                  return (
                    <InstitutionLogo
                      key={instIdx}
                      logo={institution.logo}
                      name={institution.name}
                      size={institution.size || 1.0}
                      groupScale={groupScale}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default TeamCard;