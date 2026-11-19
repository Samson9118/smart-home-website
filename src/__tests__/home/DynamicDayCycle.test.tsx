import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { DynamicDayCycle } from '@/components/home/DynamicDayCycle';

describe('DynamicDayCycle Component', () => {
  it('renders correctly with initial day phase', () => {
    render(<DynamicDayCycle />);

    expect(screen.getByText(/Свет, который живёт/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Дневной продуктивный свет/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/5500 K/i)).toBeInTheDocument();
  });

  it('switches phases on tab click to evening', () => {
    render(<DynamicDayCycle />);

    const eveningBtn = screen.getByRole('button', { name: /вечерний/i });
    fireEvent.click(eveningBtn);

    expect(screen.getAllByText(/Вечерний релакс/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/2700 K/i)).toBeInTheDocument();
  });

  it('switches phases to night and morning', () => {
    render(<DynamicDayCycle />);

    const nightBtn = screen.getByRole('button', { name: /ночной/i });
    fireEvent.click(nightBtn);
    expect(screen.getAllByText(/Ночной режим/i).length).toBeGreaterThan(0);

    const morningBtn = screen.getByRole('button', { name: /циркадный/i });
    fireEvent.click(morningBtn);
    expect(screen.getAllByText(/Циркадный рассвет/i).length).toBeGreaterThan(0);
  });

  it('toggles autoplay on button click', () => {
    render(<DynamicDayCycle />);

    const autoBtn = screen.getByTitle(/Приостановить автопереключение/i);
    fireEvent.click(autoBtn);

    expect(screen.getByTitle(/Включить автопереключение/i)).toBeInTheDocument();
  });
});
