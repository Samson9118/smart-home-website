import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '@/components/ui/Badge';

describe('Badge component', () => {
  it('renders badge with text', () => {
    render(<Badge>Aqara Zigbee</Badge>);
    expect(screen.getByText('Aqara Zigbee')).toBeInTheDocument();
  });

  it('renders with dot indicator when dot prop is passed', () => {
    const { container } = render(<Badge dot>Активно</Badge>);
    expect(screen.getByText('Активно')).toBeInTheDocument();
    const dot = container.querySelector('span.rounded-full.h-1\\.5.w-1\\.5');
    expect(dot).toBeInTheDocument();
  });
});
