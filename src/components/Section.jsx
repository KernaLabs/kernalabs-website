import React from 'react';
import AnimatedSection from './AnimatedSection';

const Section = ({ 
  id, 
  title, 
  description, 
  children, 
  className = '', 
  containerClass = '',
  titleAnimation = 'fadeInUp',
  descriptionDelay = 0 
}) => {
  const containerClasses = `container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${containerClass}`;
  const sectionHeadingClass = 'text-fluid-3xl sm:text-fluid-4xl lg:text-fluid-5xl font-display font-semibold tracking-display-normal text-kerna-beige mb-4';
  const sectionDescriptionClass = 'text-fluid-lg font-body text-kerna-beige/60 max-w-2xl';
  
  return (
    <section id={id} className={className}>
      {(title || description) && (
        <div className={containerClasses}>
          <AnimatedSection animation={titleAnimation} className="mb-16">
            {title && <h2 className={sectionHeadingClass}>{title}</h2>}
            {description && (
              <p className={sectionDescriptionClass}>{description}</p>
            )}
          </AnimatedSection>
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;