import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PortfolioPage from '@/app/portfolio/page';

describe('PortfolioPage Component', () => {
  it('renders all 4 portfolio cases by default', () => {
    render(<PortfolioPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Реализованные проекты умных домов/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/3-комнатная квартира в ЖК «Символ»/i)).toBeInTheDocument();
    expect(screen.getByText(/Двухэтажный коттедж из бруса/i)).toBeInTheDocument();
  });

  it('filters cases by apartments', () => {
    render(<PortfolioPage />);
    const aptFilter = screen.getByRole('button', { name: /Квартиры/i });
    fireEvent.click(aptFilter);

    expect(screen.getByText(/3-комнатная квартира в ЖК «Символ»/i)).toBeInTheDocument();
    expect(screen.getByText(/Дизайнерская студия в ЖК «Петровский»/i)).toBeInTheDocument();
    expect(screen.queryByText(/Двухэтажный коттедж из бруса/i)).not.toBeInTheDocument();
  });

  it('filters cases by houses', () => {
    render(<PortfolioPage />);
    const houseFilter = screen.getByRole('button', { name: /Загородные дома/i });
    fireEvent.click(houseFilter);

    expect(screen.getByText(/Двухэтажный коттедж из бруса/i)).toBeInTheDocument();
    expect(screen.getByText(/Таунхаус в эко-посёлке/i)).toBeInTheDocument();
    expect(screen.queryByText(/3-комнатная квартира в ЖК «Символ»/i)).not.toBeInTheDocument();
  });
});
