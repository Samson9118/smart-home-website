import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { ScenarioVideoPlayer } from '@/components/media/ScenarioVideoPlayer';

describe('ScenarioVideoPlayer Component', () => {
  beforeEach(() => {
    // Mock HTMLMediaElement methods in jsdom
    window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = vi.fn();
    window.HTMLMediaElement.prototype.load = vi.fn();
  });

  it('renders real HTML5 video player with default arrival scene', () => {
    const { container } = render(<ScenarioVideoPlayer />);

    expect(screen.getByText(/Сценарии и датчики в действии/i)).toBeInTheDocument();
    expect(screen.getAllByText(/«Возвращение домой»/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Aqara Smart Lock U200/i)).toBeInTheDocument();

    // Verify presence of actual video element with local MP4 source
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', '/videos/arrival.mp4');
  });

  it('switches to leakage scene and displays sensors and new video source', () => {
    const { container } = render(<ScenarioVideoPlayer />);

    const leakBtn = screen.getByRole('button', { name: /«Защита от протечки/i });
    fireEvent.click(leakBtn);

    expect(screen.getAllByText(/«Защита от протечки/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Tuya Water Leak Sensor/i)).toBeInTheDocument();

    const video = container.querySelector('video');
    expect(video).toHaveAttribute('src', '/videos/leakage.mp4');
  });

  it('selects sensor and shows detailed inspection', () => {
    render(<ScenarioVideoPlayer />);

    const sensorBtn = screen.getByRole('button', { name: /Sonoff ZBMiniL2 Extreme/i });
    fireEvent.click(sensorBtn);

    expect(screen.getByText(/Монтаж в любой стандартный подрозетник/i)).toBeInTheDocument();
  });

  it('toggles playback pause and play', () => {
    render(<ScenarioVideoPlayer />);

    const pauseBtn = screen.getByRole('button', { name: /Пауза/i });
    fireEvent.click(pauseBtn);

    const playBtn = screen.getByRole('button', { name: /Воспроизведение/i });
    expect(playBtn).toBeInTheDocument();
  });
});
