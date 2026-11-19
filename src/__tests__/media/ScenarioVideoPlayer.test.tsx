import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { ScenarioVideoPlayer } from '@/components/media/ScenarioVideoPlayer';

describe('ScenarioVideoPlayer Component', () => {
  it('renders correctly with default arrival scene', () => {
    render(<ScenarioVideoPlayer />);

    expect(screen.getByText(/Сценарии и датчики в действии/i)).toBeInTheDocument();
    expect(screen.getAllByText(/«Возвращение домой»/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Aqara Smart Lock U200/i)).toBeInTheDocument();
  });

  it('switches to leakage scene and displays sensors', () => {
    render(<ScenarioVideoPlayer />);

    const leakBtn = screen.getByRole('button', { name: /«Защита от протечки/i });
    fireEvent.click(leakBtn);

    expect(screen.getAllByText(/«Защита от протечки/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Tuya Water Leak Sensor/i)).toBeInTheDocument();
  });

  it('selects sensor and shows detailed inspection', () => {
    render(<ScenarioVideoPlayer />);

    const sensorBtn = screen.getByRole('button', { name: /Sonoff ZBMiniL2 Extreme/i });
    fireEvent.click(sensorBtn);

    expect(screen.getByText(/Монтаж в любой стандартный подрозетник/i)).toBeInTheDocument();
  });

  it('toggles playback pause and play', () => {
    render(<ScenarioVideoPlayer />);

    const playPauseBtn = screen.getByRole('button', { name: '⏸' });
    fireEvent.click(playPauseBtn);

    expect(screen.getByRole('button', { name: '▶' })).toBeInTheDocument();
  });
});
