import React from 'react';
import AnimatedSection from './AnimatedSection';

const TherapeuticCard = ({ icon, title, description, delay = 0 }) => {
  const cardClass = 'relative h-full bg-gradient-to-br from-kerna-beige/5 to-kerna-beige/10 backdrop-blur-md border border-kerna-beige/10 hover:border-kerna-beige/20 hover:from-kerna-beige/10 hover:to-kerna-beige/15 transition-all duration-300 group shadow-lg hover:shadow-xl';
  
  return (
    <AnimatedSection animation="fadeInUp" delay={delay}>
      <div className={cardClass}>
        <div className="p-8 flex flex-col h-full">
          <div className="mb-6 w-10 h-10">
            <img src={icon} alt={title} className="w-full h-full" />
          </div>
          <h3 className="text-kerna-beige text-fluid-xl font-display font-medium mb-3">{title}</h3>
          <p className="text-kerna-beige/70 text-fluid-base font-body leading-relaxed">{description}</p>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default TherapeuticCard;