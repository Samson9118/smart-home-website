import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PdfDownloadButton } from '@/components/pdf/PdfDownloadButton';
import { calculateEstimate } from '@/lib/calculator/calculate';

// Mock @react-pdf/renderer
vi.mock('@react-pdf/renderer', () => ({
  pdf: vi.fn(() => ({
    toBlob: vi.fn().mockResolvedValue(new Blob(['dummy pdf'], { type: 'application/pdf' })),
  })),
  Document: ({ children }: { children: React.ReactNode }) => <div data-testid="pdf-doc">{children}</div>,
  Page: ({ children }: { children: React.ReactNode }) => <div data-testid="pdf-page">{children}</div>,
  Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  View: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  StyleSheet: {
    create: (styles: Record<string, unknown>) => styles,
  },
  Font: {
    register: vi.fn(),
  },
}));

describe('PdfDownloadButton Component', () => {
  const estimate = calculateEstimate({
    propertyType: 'apartment',
    area: 55,
    rooms: 2,
    bathrooms: 1,
    hub: 'aqara-hub',
    brandTier: 'optimum',
    modules: {
      lighting: true,
      climate: true,
      leakage: true,
      curtains: false,
      security: true,
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
    global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/test-blob');
    global.URL.revokeObjectURL = vi.fn();
    // Prevent JSDOM navigation error on simulated anchor click
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  });

  it('renders download button with default label and icon', () => {
    render(<PdfDownloadButton estimate={estimate} />);
    const btn = screen.getByRole('button', { name: /Скачать PDF-смету/i });
    expect(btn).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
  });

  it('generates blob and triggers download on click', async () => {
    render(<PdfDownloadButton estimate={estimate} />);
    const btn = screen.getByRole('button', { name: /Скачать PDF-смету/i });

    fireEvent.click(btn);

    // Shows loading state
    expect(screen.getByText(/Формирование PDF.../i)).toBeInTheDocument();

    // After resolving, shows success state
    await waitFor(() => {
      expect(screen.getByText(/Смета скачана!/i)).toBeInTheDocument();
    });

    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(global.URL.revokeObjectURL).toHaveBeenCalledTimes(1);
  });

  it('supports different visual variants', () => {
    const { rerender } = render(<PdfDownloadButton estimate={estimate} variant="primary" />);
    expect(screen.getByRole('button')).toHaveClass('from-amber-500');

    rerender(<PdfDownloadButton estimate={estimate} variant="card" />);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });
});
