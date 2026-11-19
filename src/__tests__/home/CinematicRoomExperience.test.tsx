import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { CinematicRoomExperience } from '@/components/home/CinematicRoomExperience';

describe('CinematicRoomExperience Component', () => {
  it('renders correctly with initial 06:00 stage', () => {
    render(<CinematicRoomExperience />);

    expect(screen.getByText(/Scroll-Driven Smart Home/i)).toBeInTheDocument();
    expect(screen.getAllByText(/06:00/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/«Мягкое пробуждение»/i).length).toBeGreaterThan(0);
  });

  it('renders quick jump buttons for all 4 key scenarios', () => {
    render(<CinematicRoomExperience />);

    expect(screen.getByRole('button', { name: /06:00/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /09:00/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /18:00/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /22:00/i })).toBeInTheDocument();
  });

  it('allows clicking quick jump button to scroll to stage', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<CinematicRoomExperience />);

    const btn09 = screen.getByRole('button', { name: /09:00/i });
    fireEvent.click(btn09);

    expect(scrollToMock).toHaveBeenCalled();
  });

  it('displays hardware breakdown: lighting, climate, curtains, sensors', () => {
    render(<CinematicRoomExperience />);

    expect(screen.getByText(/Освещение:/i)).toBeInTheDocument();
    expect(screen.getByText(/Климат:/i)).toBeInTheDocument();
    expect(screen.getByText(/Шторы & Карнизы:/i)).toBeInTheDocument();
    expect(screen.getByText(/Активные датчики:/i)).toBeInTheDocument();
  });
});
