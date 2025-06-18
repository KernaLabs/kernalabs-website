import React from 'react';
import AnimatedSection from './AnimatedSection';

const TherapeuticCard = ({ icon, title, description, delay = 0 }) => {
  const cardClass = 'relative h-full bg-gradient-to-br from-kerna-beige/5 to-kerna-beige/10 backdrop-blur-md border border-kerna-beige/10 hover:border-kerna-beige/20 transition-[border-color,box-shadow] duration-300 group shadow-lg hover:shadow-xl';
  
  return (
    <div className={cardClass}>
      <AnimatedSection animation="fadeInUp" delay={delay} className="p-8 flex flex-col h-full">
        <div className="mb-6 w-10 h-10">
          <img src={icon} alt={title} className="w-full h-full object-contain" />
        </div>
        <h3 className="text-kerna-beige text-fluid-lg font-display font-medium mb-3">{title}</h3>
        <p className="text-kerna-beige/70 text-fluid-base font-body leading-relaxed">{description}</p>
      </AnimatedSection>
    </div>
  );
};

export default TherapeuticCard;