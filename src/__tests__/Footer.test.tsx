import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/config/site';

describe('Footer component', () => {
  it('renders company brand and description', () => {
    render(<Footer />);
    expect(screen.getAllByText(/SmartHome/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/беспроводного умного дома/i)).toBeInTheDocument();
  });

  it('renders contact details and phone', () => {
    render(<Footer />);
    expect(screen.getByText(siteConfig.phone)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.email)).toBeInTheDocument();
  });

  it('renders supported brands in footer', () => {
    render(<Footer />);
    expect(screen.getByText('Aqara')).toBeInTheDocument();
    expect(screen.getByText('Sonoff')).toBeInTheDocument();
    expect(screen.getByText('Sprut')).toBeInTheDocument();
    expect(screen.getByText('Tuya Zigbee')).toBeInTheDocument();
  });

  it('renders copyright and current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument();
  });
});
