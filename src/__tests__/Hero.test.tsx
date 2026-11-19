import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from '@/components/home/Hero';

describe('Hero component', () => {
  it('renders main heading and description', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Проектирование и монтаж умного дома/i);
    expect(screen.getByText(/без штробления/i)).toBeInTheDocument();
  });

  it('renders primary CTA button leading to calculator', () => {
    render(<Hero />);
    const ctaButton = screen.getByRole('link', { name: /Рассчитать стоимость сметы/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '/calculator');
  });

  it('renders secondary services button', () => {
    render(<Hero />);
    const servicesButton = screen.getByRole('link', { name: /Готовые комплекты/i });
    expect(servicesButton).toBeInTheDocument();
    expect(servicesButton).toHaveAttribute('href', '/services');
  });

  it('renders value proposition cards', () => {
    render(<Hero />);
    expect(screen.getByText(/Чистовой монтаж/i)).toBeInTheDocument();
    expect(screen.getByText(/100% Локально/i)).toBeInTheDocument();
    expect(screen.getByText(/Голосовой контроль/i)).toBeInTheDocument();
    expect(screen.getByText(/Смета за 2 минуты/i)).toBeInTheDocument();
  });

  it('renders brand badges', () => {
    render(<Hero />);
    expect(screen.getByText('Aqara')).toBeInTheDocument();
    expect(screen.getByText('Sonoff')).toBeInTheDocument();
    expect(screen.getByText('Sprut')).toBeInTheDocument();
    expect(screen.getByText('Tuya Zigbee')).toBeInTheDocument();
  });
});
