import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { CinematicRoomExperience } from '@/components/home/CinematicRoomExperience';

describe('CinematicRoomExperience Component', () => {
  it('renders correctly with new title "Один день в умном доме" and initial 06:00 stage', () => {
    render(<CinematicRoomExperience />);

    expect(screen.getByText(/Один день в умном доме/i)).toBeInTheDocument();
    expect(screen.getAllByText(/06:00/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/«Мягкое пробуждение»/i).length).toBeGreaterThan(0);
  });

  it('renders timeline buttons for 06:00, 09:00, 20:00, and 23:30', () => {
    render(<CinematicRoomExperience />);

    expect(screen.getByRole('button', { name: /06:00/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /09:00/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /20:00/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /23:30/i })).toBeInTheDocument();
  });

  it('renders stacked photorealistic images for all scenarios', () => {
    const { container } = render(<CinematicRoomExperience />);

    const images = container.querySelectorAll('img');
    expect(images.length).toBe(4);

    const sources = Array.from(images).map((img) => img.getAttribute('src'));
    expect(sources).toContain('/images/scenarios/morning.jpg');
    expect(sources).toContain('/images/scenarios/away.jpg');
    expect(sources).toContain('/images/scenarios/cinema.jpg');
    expect(sources).toContain('/images/scenarios/night.jpg');
  });

  it('allows clicking timeline buttons to scroll smoothly to stage', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<CinematicRoomExperience />);

    const btn20 = screen.getByRole('button', { name: /20:00/i });
    fireEvent.click(btn20);

    expect(scrollToMock).toHaveBeenCalled();
  });

  it('displays hardware breakdown and HUD hotspots for lighting, climate, curtains and sensor', () => {
    render(<CinematicRoomExperience />);

    expect(screen.getAllByText(/Освещение:/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Климат:/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Шторы & Карнизы:/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Датчик присутствия:/i).length).toBeGreaterThan(0);
  });
});
