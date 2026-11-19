import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CalculatorView } from '@/components/calculator/CalculatorView';

describe('CalculatorView Component', () => {
  it('renders calculator page title and default estimate', () => {
    render(<CalculatorView />);
    expect(
      screen.getByRole('heading', { name: /Калькулятор сметы умного дома/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Итоговая стоимость проекта/i)).toBeInTheDocument();
  });

  it('allows switching property type to house and updates pricing', () => {
    render(<CalculatorView />);
    const houseButton = screen.getByRole('button', { name: /Загородный дом/i });
    expect(houseButton).toBeInTheDocument();

    fireEvent.click(houseButton);
    expect(houseButton.className).toContain('border-amber-500');
  });

  it('updates area input and triggers recalculation', () => {
    render(<CalculatorView />);
    const areaInput = screen.getByLabelText(/Площадь в квадратных метрах/i);
    expect(areaInput).toBeInTheDocument();

    fireEvent.change(areaInput, { target: { value: '100' } });
    expect(areaInput).toHaveValue(100);
  });

  it('allows changing rooms and bathrooms count', () => {
    render(<CalculatorView />);
    const roomButton = screen.getByRole('button', { name: '3 комнат' });
    expect(roomButton).toBeInTheDocument();

    fireEvent.click(roomButton);
    expect(roomButton.className).toContain('border-cyan-500');

    const bathButton = screen.getByRole('button', { name: '2 санузла' });
    expect(bathButton).toBeInTheDocument();
    fireEvent.click(bathButton);
    expect(bathButton.className).toContain('border-amber-500');
  });

  it('allows switching brand tier to budget', () => {
    render(<CalculatorView />);
    const budgetCard = screen.getByTestId('tier-budget');
    expect(budgetCard).toBeInTheDocument();

    fireEvent.click(budgetCard);
    expect(budgetCard.className).toContain('border-blue-500');
  });

  it('toggles system modules on click', () => {
    render(<CalculatorView />);
    const curtainsCheckbox = screen.getByLabelText(/Включить модуль штор/i);
    expect(curtainsCheckbox).not.toBeChecked();

    fireEvent.click(curtainsCheckbox);
    expect(curtainsCheckbox).toBeChecked();
  });

  it('opens and closes specification accordion', () => {
    render(<CalculatorView />);
    const accordionBtn = screen.getByTestId('toggle-specifications');
    expect(accordionBtn).toBeInTheDocument();

    // Before open, hub text only appears once (in the selection card)
    expect(screen.getAllByText(/Home Assistant Server/i).length).toBe(1);

    // Open specification
    fireEvent.click(accordionBtn);
    expect(screen.getAllByText(/Home Assistant Server/i).length).toBe(2);

    // Close specification
    fireEvent.click(accordionBtn);
    expect(screen.getAllByText(/Home Assistant Server/i).length).toBe(1);
  });

  it('opens LeadModal when clicking "Отправить смету инженеру"', () => {
    render(<CalculatorView />);
    const sendBtn = screen.getByRole('button', {
      name: /Отправить смету инженеру/i,
    });
    expect(sendBtn).toBeInTheDocument();

    fireEvent.click(sendBtn);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Отправить смету инженеру/i })
    ).toBeInTheDocument();
  });
});
