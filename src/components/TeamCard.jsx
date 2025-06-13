import React from 'react';
import AnimatedSection from './AnimatedSection';
import InstitutionLogo from './InstitutionLogo';

const TeamCard = ({ member, delay = 0 }) => {
  const cardClass = 'h-full bg-gradient-to-br from-kerna-beige/5 to-kerna-beige/10 backdrop-blur-md border border-kerna-beige/10 hover:border-kerna-beige/20 transition-[border-color,box-shadow] duration-300 group shadow-lg hover:shadow-xl';
  
  return (
    <article className="flex-none w-[320px]" aria-label={`Team member: ${member.name}`}>
      <div className={cardClass}>
        <AnimatedSection
          animation="fadeInUp"
          delay={delay}
          className="px-4 py-10 flex flex-col h-[360px]"
        >
          {/* Profile image */}
          <div className="flex items-center justify-center mb-2">
            <img 
              src={member.image} 
              alt={`${member.name} profile`} 
              className="w-20 h-20 rounded-full object-cover select-none pointer-events-none transition-all duration-300 group-hover:brightness-110"
              draggable={false}
              loading="lazy"
            />
          </div>
          
          {/* Name and position */}
          <div className="text-center mb-4">
            <h3 className="text-kerna-beige font-display text-fluid-lg font-medium leading-tight mb-1">
              {member.name}
            </h3>
            <p className="text-kerna-beige/60 uppercase tracking-wider text-fluid-sm font-body">
              {member.position}
            </p>
          </div>
          
          {/* Institution logos section */}
          {member.institutions && member.institutions.length > 0 && (
            <div className="mt-auto" aria-label="Affiliated institutions">
              <div className="min-h-[80px] flex items-center justify-center w-full">
                <div className="flex flex-wrap justify-center items-center gap-3 w-full">
                  {member.institutions.map((institution, idx) => (
                    <div key={idx} className="flex-shrink-0 flex-grow-0 basis-auto">
                      <InstitutionLogo
                        logo={institution.logo}
                        name={institution.name}
                        size="default"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </AnimatedSection>
      </div>
    </article>
  );
};

export default TeamCard;