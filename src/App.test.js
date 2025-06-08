import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the LandingPage component
jest.mock('./components/LandingPage', () => {
  return function MockLandingPage() {
    return <div data-testid="landing-page">Landing Page</div>;
  };
});

// Mock the Navbar component
jest.mock('./components/Navbar', () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Navbar</nav>;
  };
});

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('landing-page')).toBeInTheDocument();
  });

  test('renders with correct structure', () => {
    const { container } = render(<App />);
    const appDiv = container.querySelector('.App');
    expect(appDiv).toBeInTheDocument();
  });
});
