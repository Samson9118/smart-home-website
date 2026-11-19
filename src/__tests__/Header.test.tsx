import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '@/components/layout/Header';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header component', () => {
  it('renders logo and company name', () => {
    render(<Header />);
    expect(screen.getByText(/SmartHome/i)).toBeInTheDocument();
    expect(screen.getByText(/\.Lab/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /^Главная/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Услуги/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Калькулятор сметы/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Портфолио/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Контакты/i })).toBeInTheDocument();
  });

  it('renders CTA button to calculator', () => {
    render(<Header />);
    const cta = screen.getByRole('link', { name: /Рассчитать смету/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute('href', '/calculator');
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Header />);
    const toggleButton = screen.getByRole('button', { name: /Открыть меню/i });
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByRole('button', { name: /Закрыть меню/i })).toBeInTheDocument();
  });
});
