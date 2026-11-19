import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/Button';

describe('Button component', () => {
  it('renders correctly with children text', () => {
    render(<Button>Нажми меня</Button>);
    expect(screen.getByRole('button', { name: /нажми меня/i })).toBeInTheDocument();
  });

  it('renders as a link when href is passed', () => {
    render(<Button href="/calculator">В калькулятор</Button>);
    const link = screen.getByRole('link', { name: /в калькулятор/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/calculator');
  });

  it('renders external link with target blank and noopener', () => {
    render(
      <Button href="https://t.me/test_bot" isExternal>
        Telegram
      </Button>
    );
    const link = screen.getByRole('link', { name: /telegram/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('fires onClick callback when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Клик</Button>);
    fireEvent.click(screen.getByRole('button', { name: /клик/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Заблокировано</Button>);
    expect(screen.getByRole('button', { name: /заблокировано/i })).toBeDisabled();
  });
});
