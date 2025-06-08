import React from 'react';
import AnimatedSection from './AnimatedSection';
import InstitutionLogo from './InstitutionLogo';

const TeamCard = ({ member, delay = 0 }) => {
  const cardClass = 'h-full bg-gradient-to-br from-kerna-beige/5 to-kerna-beige/10 backdrop-blur-md border border-kerna-beige/10 hover:border-kerna-beige/20 hover:from-kerna-beige/10 hover:to-kerna-beige/15 transition-all duration-300 group shadow-lg hover:shadow-xl';
  
  return (
    <AnimatedSection
      animation="fadeInUp"
      delay={delay}
      className="flex-none w-[320px]"
    >
      <div className={cardClass}>
        <div className="p-8 flex flex-col h-[440px]">
          {/* Image section */}
          <div className="flex items-center justify-center mb-6">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-24 h-24 rounded-full object-cover select-none pointer-events-none transition-all duration-300 group-hover:brightness-110"
              draggable="false"
            />
          </div>
          
          {/* Text section */}
          <div className="text-center mb-6">
            <h3 className="text-fluid-lg font-display font-medium text-kerna-beige mb-1">
              {member.name}
            </h3>
            <p className="text-kerna-beige/60 uppercase tracking-wider text-fluid-sm font-body">
              {member.position}
            </p>
          </div>
          
          {/* Institution logos section */}
          <div className="mt-auto pt-4">
            <div className="min-h-[80px] flex items-center justify-center px-4">
              <div className="flex items-center justify-center gap-3 flex-wrap max-w-full">
                {member.institutions && member.institutions.map((institution, instIdx) => (
                  <InstitutionLogo
                    key={instIdx}
                    logo={institution.logo}
                    name={institution.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TeamCard;