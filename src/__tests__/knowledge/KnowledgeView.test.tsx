import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { KnowledgeView } from '@/components/knowledge/KnowledgeView';
import { guides } from '@/data/guides';

describe('KnowledgeView Component', () => {
  it('renders guide topics and default active guide', () => {
    render(<KnowledgeView />);

    expect(screen.getByText(/Все инструкции/i)).toBeInTheDocument();
    expect(screen.getAllByText(/PIR \(ИК\) против mmWave/i).length).toBeGreaterThan(0);
  });

  it('filters guides by wiring category', () => {
    render(<KnowledgeView />);

    const wiringBtn = screen.getByRole('button', { name: /Электромонтаж реле/i });
    fireEvent.click(wiringBtn);

    expect(screen.getByText(/Монтаж микромодулей в подрозетник: с нейтралью/i)).toBeInTheDocument();
  });

  it('switches active guide and shows steps and tips', () => {
    render(<KnowledgeView />);

    const leakGuideBtn = screen.getByRole('button', { name: /Монтаж защиты от протечек: правильное/i });
    fireEvent.click(leakGuideBtn);

    expect(screen.getByText(/Установка шаровых кранов с электроприводом/i)).toBeInTheDocument();
    expect(screen.getByText(/Типичные ошибки самостоятельного монтажа/i)).toBeInTheDocument();
  });

  it('ensures all guides have required fields', () => {
    expect(guides.length).toBeGreaterThanOrEqual(3);
    guides.forEach((g) => {
      expect(g.id).toBeTruthy();
      expect(g.title).toBeTruthy();
      expect(g.steps.length).toBeGreaterThan(0);
      expect(g.commonMistakes.length).toBeGreaterThan(0);
    });
  });
});
