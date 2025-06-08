import { render, screen, waitFor } from '@testing-library/react';
import LandingPage from './LandingPage';

// Mock the OptimizedImage component
jest.mock('./OptimizedImage', () => {
  return function MockOptimizedImage({ src, alt, className, style }) {
    return <img src={src} alt={alt} className={className} style={style} />;
  };
});

// Mock the DNACursorAnimation component
jest.mock('./DNACursorAnimation', () => {
  return function MockDNACursorAnimation() {
    return <div data-testid="dna-animation">DNA Animation</div>;
  };
});

describe('LandingPage', () => {
  test('renders main heading', () => {
    render(<LandingPage />);
    const heading = screen.getByText(/Better genetic medicines, built with AI/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders all team members', () => {
    render(<LandingPage />);
    
    // Check for team member names
    expect(screen.getByText('Amit Deshwar, PhD')).toBeInTheDocument();
    expect(screen.getByText('Melissa J. Moore, PhD')).toBeInTheDocument();
    expect(screen.getByText('Julia Peng')).toBeInTheDocument();
    expect(screen.getByText('Michael Swift, PhD')).toBeInTheDocument();
    expect(screen.getByText('Aryan Misra')).toBeInTheDocument();
    expect(screen.getByText('Oliver Chang, PhD')).toBeInTheDocument();
  });

  test('renders team member positions', () => {
    render(<LandingPage />);
    
    expect(screen.getByText('Co-founder & CTO')).toBeInTheDocument();
    expect(screen.getByText('Co-founder & CEO')).toBeInTheDocument();
    expect(screen.getByText('Founding Scientist')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning Engineer')).toBeInTheDocument();
    expect(screen.getByText('Platform Scientist')).toBeInTheDocument();
  });

  test('renders institution logos for team members', async () => {
    render(<LandingPage />);
    
    // Test Amit's institutions
    expect(screen.getByAlt('Deep Genomics')).toHaveAttribute('src', '/logos/dg-logo.png');
    expect(screen.getAllByAlt('University of Toronto')[0]).toHaveAttribute('src', '/logos/uoft-text-logo.png');
    
    // Test Melissa's institutions
    expect(screen.getByAlt('Moderna')).toHaveAttribute('src', '/logos/moderna-text-logo.png');
    expect(screen.getByAlt('UMass Medical')).toHaveAttribute('src', '/logos/umc-text-logo.png');
    expect(screen.getByAlt('RNA Therapeutics Institute')).toHaveAttribute('src', '/logos/rnati-logo.png');
    
    // Test Julia's institutions
    expect(screen.getByAlt('Wharton')).toHaveAttribute('src', '/logos/wharton-text-logo.png');
    expect(screen.getByAlt('Confluent')).toHaveAttribute('src', '/logos/confluent-text-logo.png');
    expect(screen.getByAlt('JP Morgan')).toHaveAttribute('src', '/logos/jpm-logo.png');
    
    // Test Michael's institutions
    expect(screen.getByAlt('Stanford')).toHaveAttribute('src', '/logos/stanford-text-logo.png');
    expect(screen.getByAlt('Longitude Capital')).toHaveAttribute('src', '/logos/longitude-text-logo.png');
    expect(screen.getByAlt('miRagen')).toHaveAttribute('src', '/logos/mgen-logo.png');
    
    // Test Aryan's institutions (multiple UofT instances)
    expect(screen.getByAlt('McMaster')).toHaveAttribute('src', '/logos/mcmaster-text-logo.png');
    
    // Test Oliver's institutions
    expect(screen.getByAlt('Princeton')).toHaveAttribute('src', '/logos/princeton-text-logo.png');
    expect(screen.getByAlt('ODBI')).toHaveAttribute('src', '/logos/odi-text-logo.png');
  });

  test('institution logos have monochrome styling', () => {
    render(<LandingPage />);
    
    const institutionLogos = screen.getAllByAltText(/Deep Genomics|University of Toronto|Moderna|UMass Medical|RNA Therapeutics Institute|Wharton|Confluent|JP Morgan|Stanford|Longitude Capital|miRagen|McMaster|Princeton|ODBI/);
    
    institutionLogos.forEach(logo => {
      expect(logo).toHaveClass('filter', 'grayscale', 'invert', 'brightness-125', 'opacity-90');
    });
  });

  test('renders team section heading', () => {
    render(<LandingPage />);
    
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
    expect(screen.getByText('Built and backed by the leading minds in machine learning and mRNA.')).toBeInTheDocument();
  });

  test('renders contact section with email link', () => {
    render(<LandingPage />);
    
    const contactLink = screen.getByText('Contact Us').closest('a');
    expect(contactLink).toHaveAttribute('href', 'mailto:founders@kernalabs.ai');
  });

  test('renders footer with social links', () => {
    render(<LandingPage />);
    
    const twitterLink = screen.getByAltText('Twitter/X').closest('a');
    const linkedinLink = screen.getByAltText('LinkedIn').closest('a');
    
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/KernaLabs');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/company/kernalabs');
  });
});