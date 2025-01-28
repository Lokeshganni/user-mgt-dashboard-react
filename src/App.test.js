import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import App from './App';

jest.mock('./pages/Dashboard', () => () => <div data-testid="mock-dashboard">Dashboard</div>);
jest.mock('./components/Navbar', () => () => <div data-testid="mock-navbar">Navbar</div>);

describe('App Component', () => {
  test('renders navbar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
  });

  test('renders dashboard component at root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('mock-dashboard')).toBeInTheDocument();
  });

  test('renders both navbar and dashboard components', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const navbar = screen.getByTestId('mock-navbar');
    const dashboard = screen.getByTestId('mock-dashboard');

    expect(navbar).toBeInTheDocument();
    expect(dashboard).toBeInTheDocument();
  });
});
