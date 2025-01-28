import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  test('renders navbar with correct heading', () => {
    render(<Navbar />);
    
    const heading = screen.getByText('User Management Dashboard');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('navbar-heading');
  });

  test('navbar has correct CSS class', () => {
    render(<Navbar />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('navbar');
  });
});