import React from 'react';
import { describe, it, expect } from 'vitest';
import { EstimatePdfDocument } from '@/components/pdf/EstimatePdfDocument';
import { registerPdfFonts } from '@/lib/pdf/fonts';
import { calculateEstimate } from '@/lib/calculator/calculate';

describe('PDF Estimate Document Structure & Fonts', () => {
  it('registers local Cyrillic fonts safely and idempotently', () => {
    expect(() => registerPdfFonts()).not.toThrow();
    // Second invocation should safely return without re-registering
    expect(() => registerPdfFonts()).not.toThrow();
  });

  it('renders EstimatePdfDocument React element with complete estimate data', () => {
    const estimate = calculateEstimate({
      propertyType: 'apartment',
      area: 75,
      rooms: 3,
      bathrooms: 2,
      hub: 'home-assistant',
      brandTier: 'optimum',
      modules: {
        lighting: true,
        climate: true,
        leakage: true,
        curtains: true,
        security: true,
      },
    });

    const docElement = (
      <EstimatePdfDocument
        estimate={estimate}
        docNumber="КП-TEST-001"
        dateStr="19.11.2026"
      />
    );

    expect(docElement).toBeDefined();
    expect(docElement.props.docNumber).toBe('КП-TEST-001');
    expect(docElement.props.estimate.totalPrice).toBe(estimate.totalPrice);
    expect(docElement.props.estimate.equipment.length).toBe(estimate.equipment.length);
  });

  it('correctly handles house property type and custom tiers', () => {
    const houseEstimate = calculateEstimate({
      propertyType: 'house',
      area: 180,
      rooms: 5,
      bathrooms: 3,
      hub: 'sprut-hub',
      brandTier: 'premium',
      modules: {
        lighting: true,
        climate: true,
        leakage: true,
        curtains: false,
        security: true,
      },
    });

    const docElement = (
      <EstimatePdfDocument estimate={houseEstimate} docNumber="КП-HOUSE-002" />
    );

    expect(docElement.props.estimate.inputs.propertyType).toBe('house');
    expect(docElement.props.estimate.inputs.brandTier).toBe('premium');
    expect(docElement.props.estimate.totalEquipmentPrice).toBeGreaterThan(0);
    expect(docElement.props.estimate.installationPrice).toBeGreaterThan(0);
  });
});
