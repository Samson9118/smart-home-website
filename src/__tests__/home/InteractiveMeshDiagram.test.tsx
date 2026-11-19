import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InteractiveMeshDiagram } from '@/components/home/InteractiveMeshDiagram';

describe('InteractiveMeshDiagram Component', () => {
  it('renders section title and default mesh tab', () => {
    render(<InteractiveMeshDiagram />);
    expect(
      screen.getByRole('heading', {
        name: /Как работает современный беспроводной дом/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Каждое реле в розетке или выключателе усиливает радиосигнал/i)
    ).toBeInTheDocument();
  });

  it('switches to autonomy tab on click', () => {
    render(<InteractiveMeshDiagram />);
    const autonomyTab = screen.getByRole('button', {
      name: /100% Автономность/i,
    });
    fireEvent.click(autonomyTab);
    expect(
      screen.getByText(/Система работает автономно даже при обрыве оптоволокна/i)
    ).toBeInTheDocument();
  });

  it('switches to voice tab and displays Alice integration', () => {
    render(<InteractiveMeshDiagram />);
    const voiceTab = screen.getByRole('button', {
      name: /Голосовые ассистенты/i,
    });
    fireEvent.click(voiceTab);
    expect(
      screen.getByText(/Управляйте сценариями одной фразой/i)
    ).toBeInTheDocument();
  });

  it('switches to hybrid brands tab', () => {
    render(<InteractiveMeshDiagram />);
    const hybridTab = screen.getByRole('button', {
      name: /Мультибрендовая свобода/i,
    });
    fireEvent.click(hybridTab);
    expect(
      screen.getByText(/Объединяем Aqara, Sonoff, Sprut и Tuya/i)
    ).toBeInTheDocument();
  });
});
