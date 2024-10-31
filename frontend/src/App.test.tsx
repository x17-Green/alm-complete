import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders Header component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const headerElement = screen.getByRole('heading', { name: /afro lyrics mania/i });
    expect(headerElement).toBeInTheDocument();
  });

  test('renders Footer component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const footerElement = screen.getByText(/copyright/i);
    expect(footerElement).toBeInTheDocument();
  });

  test('renders Home component on the root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const homeElement = screen.getByText(/celebrate african music/i);
    expect(homeElement).toBeInTheDocument();
  });

  test('renders Features component on the /features route', () => {
    render(
      <MemoryRouter initialEntries={['/features']}>
        <App />
      </MemoryRouter>
    );
    const featuresElement = screen.getByText(/features/i);
    expect(featuresElement).toBeInTheDocument();
  });

  test('renders About component on the /about route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    const aboutElement = screen.getByText(/about afro lyrics mania/i);
    expect(aboutElement).toBeInTheDocument();
  });

  test('renders Contact component on the /contact route', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );
    const contactElement = screen.getByText(/contact us/i);
    expect(contactElement).toBeInTheDocument();
  });
});
