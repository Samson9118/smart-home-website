import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ScenarioSwitcher } from '@/components/services/ScenarioSwitcher';

describe('ScenarioSwitcher Component', () => {
  it('renders default morning scenario', () => {
    render(<ScenarioSwitcher />);
    expect(screen.getByText('Сценарий «Утро»')).toBeInTheDocument();
    expect(screen.getByText(/«Алиса, доброе утро»/i)).toBeInTheDocument();
    expect(screen.getByText(/Шторы в спальне бесшумно открываются на 40%/i)).toBeInTheDocument();
  });

  it('switches to "Я ушёл" scenario', () => {
    render(<ScenarioSwitcher />);
    const leaveBtn = screen.getByRole('button', { name: /«Я ушёл»/i });
    fireEvent.click(leaveBtn);

    expect(screen.getByText('Сценарий «Я ушёл»')).toBeInTheDocument();
    expect(screen.getByText(/«Алиса, мы ушли»/i)).toBeInTheDocument();
    expect(screen.getByText(/Гаснет весь свет во всех комнатах/i)).toBeInTheDocument();
  });

  it('switches to "Кино" scenario', () => {
    render(<ScenarioSwitcher />);
    const cinemaBtn = screen.getByRole('button', { name: /«Кино»/i });
    fireEvent.click(cinemaBtn);

    expect(screen.getByText('Сценарий «Кино»')).toBeInTheDocument();
    expect(screen.getByText(/«Алиса, включай кино»/i)).toBeInTheDocument();
    expect(screen.getByText(/Блэкаут-шторы полностью закрываются/i)).toBeInTheDocument();
  });

  it('switches to "Ночь" scenario', () => {
    render(<ScenarioSwitcher />);
    const nightBtn = screen.getByRole('button', { name: /«Ночь»/i });
    fireEvent.click(nightBtn);

    expect(screen.getByText('Сценарий «Ночь»')).toBeInTheDocument();
    expect(screen.getByText(/«Алиса, спокойной ночи»/i)).toBeInTheDocument();
  });
});
