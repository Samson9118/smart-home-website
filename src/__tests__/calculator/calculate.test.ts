import { describe, it, expect } from 'vitest';
import { calculateEstimate, sanitizeCalculatorInputs } from '@/lib/calculator/calculate';
import { CalculatorInputs } from '@/lib/calculator/types';

describe('Calculator Business Logic (calculateEstimate)', () => {
  const defaultInputs: CalculatorInputs = {
    propertyType: 'apartment',
    area: 60,
    rooms: 2,
    bathrooms: 1,
    hub: 'home-assistant',
    brandTier: 'optimum',
    modules: {
      lighting: true,
      climate: true,
      leakage: true,
      curtains: true,
      security: true,
    },
  };

  it('calculates full estimate correctly with mathematical integrity', () => {
    const result = calculateEstimate(defaultInputs);

    expect(result.equipment.length).toBeGreaterThan(0);
    expect(result.totalEquipmentPrice).toBeGreaterThan(0);
    expect(result.installationPrice).toBeGreaterThan(0);
    expect(result.setupPrice).toBeGreaterThan(0);

    // Mathematical integrity checks
    expect(result.totalWorksPrice).toBe(
      result.installationPrice + result.setupPrice
    );
    expect(result.totalPrice).toBe(
      result.totalEquipmentPrice + result.totalWorksPrice
    );

    // Sum of items equals total equipment price
    const sumFromItems = result.equipment.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
    expect(sumFromItems).toBe(result.totalEquipmentPrice);
  });

  it('reflects brand tier cost progression: budget < optimum < premium', () => {
    const budgetRes = calculateEstimate({
      ...defaultInputs,
      brandTier: 'budget',
    });
    const optimumRes = calculateEstimate({
      ...defaultInputs,
      brandTier: 'optimum',
    });
    const premiumRes = calculateEstimate({
      ...defaultInputs,
      brandTier: 'premium',
    });

    expect(budgetRes.totalEquipmentPrice).toBeLessThan(
      optimumRes.totalEquipmentPrice
    );
    expect(optimumRes.totalEquipmentPrice).toBeLessThan(
      premiumRes.totalEquipmentPrice
    );
  });

  it('correctly handles all hubs', () => {
    const hubs = [
      'home-assistant',
      'sprut-hub',
      'aqara-hub',
      'yandex-station',
    ] as const;

    hubs.forEach((hubKey) => {
      const res = calculateEstimate({
        ...defaultInputs,
        hub: hubKey,
      });
      const hubItem = res.equipment.find((i) => i.category === 'hub');
      expect(hubItem).toBeDefined();
      expect(hubItem?.quantity).toBe(1);
    });
  });

  it('scales device quantities and price with larger area and more rooms', () => {
    const smallApt = calculateEstimate({
      ...defaultInputs,
      area: 35,
      rooms: 1,
    });
    const bigApt = calculateEstimate({
      ...defaultInputs,
      area: 120,
      rooms: 4,
    });

    expect(bigApt.totalEquipmentPrice).toBeGreaterThan(
      smallApt.totalEquipmentPrice
    );
    expect(bigApt.equipment.length).toBeGreaterThanOrEqual(
      smallApt.equipment.length
    );
  });

  it('adds extra installation factor for houses vs apartments', () => {
    const apt = calculateEstimate({
      ...defaultInputs,
      propertyType: 'apartment',
    });
    const house = calculateEstimate({
      ...defaultInputs,
      propertyType: 'house',
    });

    expect(house.installationPrice).toBeGreaterThan(apt.installationPrice);
  });

  it('properly excludes disabled modules', () => {
    const resNoLighting = calculateEstimate({
      ...defaultInputs,
      modules: {
        lighting: false,
        climate: true,
        leakage: true,
        curtains: true,
        security: true,
      },
    });

    const lightingItems = resNoLighting.equipment.filter(
      (e) => e.category === 'lighting'
    );
    expect(lightingItems.length).toBe(0);
  });

  it('handles case when all modules are disabled (only hub selected)', () => {
    const resOnlyHub = calculateEstimate({
      ...defaultInputs,
      modules: {
        lighting: false,
        climate: false,
        leakage: false,
        curtains: false,
        security: false,
      },
    });

    expect(resOnlyHub.equipment.length).toBe(1);
    expect(resOnlyHub.equipment[0].category).toBe('hub');
    expect(resOnlyHub.installationPrice).toBe(0);
    expect(resOnlyHub.setupPrice).toBeGreaterThan(0);
    expect(resOnlyHub.totalPrice).toBe(
      resOnlyHub.totalEquipmentPrice + resOnlyHub.setupPrice
    );
  });

  it('sanitizes invalid or out-of-boundary inputs safely', () => {
    const sanitized = sanitizeCalculatorInputs({
      // @ts-expect-error test invalid string
      propertyType: 'spaceship',
      area: -100,
      rooms: 0,
      bathrooms: -5,
      // @ts-expect-error test invalid hub
      hub: 'alien-station',
      // @ts-expect-error test invalid tier
      brandTier: 'gold',
      // @ts-expect-error test undefined modules
      modules: null,
    });

    expect(sanitized.propertyType).toBe('apartment');
    expect(sanitized.area).toBe(15);
    expect(sanitized.rooms).toBe(1);
    expect(sanitized.bathrooms).toBe(1);
    expect(sanitized.hub).toBe('home-assistant');
    expect(sanitized.brandTier).toBe('optimum');
    expect(sanitized.modules.lighting).toBe(false);
  });

  it('generates accurate module summaries matching total equipment count', () => {
    const res = calculateEstimate(defaultInputs);

    const sumSummaryEqPrice = res.moduleSummaries.reduce(
      (sum, s) => sum + s.equipmentPrice,
      0
    );
    expect(sumSummaryEqPrice).toBe(res.totalEquipmentPrice);

    const sumSummaryCount = res.moduleSummaries.reduce(
      (sum, s) => sum + s.itemCount,
      0
    );
    const sumEquipmentCount = res.equipment.reduce(
      (sum, i) => sum + i.quantity,
      0
    );
    expect(sumSummaryCount).toBe(sumEquipmentCount);
  });

  it('estimates work days reasonably based on items and property', () => {
    const small = calculateEstimate({
      ...defaultInputs,
      propertyType: 'apartment',
      area: 30,
      rooms: 1,
      modules: {
        lighting: false,
        climate: false,
        leakage: false,
        curtains: false,
        security: true,
      },
    });
    expect(small.estimatedDays).toBe(1);

    const mansion = calculateEstimate({
      ...defaultInputs,
      propertyType: 'house',
      area: 250,
      rooms: 6,
    });
    expect(mansion.estimatedDays).toBe(3);
  });
});
