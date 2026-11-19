import { describe, it, expect } from 'vitest';
import { HUBS_CATALOG, DEVICES_CATALOG } from '@/lib/calculator/catalog';
import { HubType, BrandTier, SystemModuleKey } from '@/lib/calculator/types';

describe('Calculator Catalog Data', () => {
  it('contains all 4 supported hubs with valid configurations', () => {
    const requiredHubs: HubType[] = [
      'home-assistant',
      'sprut-hub',
      'aqara-hub',
      'yandex-station',
    ];

    requiredHubs.forEach((hubKey) => {
      const hub = HUBS_CATALOG[hubKey];
      expect(hub).toBeDefined();
      expect(hub.price).toBeGreaterThan(0);
      expect(hub.setupCost).toBeGreaterThan(0);
      expect(hub.title).toBeTruthy();
      expect(hub.features.length).toBeGreaterThan(0);
    });
  });

  it('contains devices for each system module across all 3 tiers', () => {
    const tiers: BrandTier[] = ['budget', 'optimum', 'premium'];
    const modules: SystemModuleKey[] = [
      'lighting',
      'climate',
      'leakage',
      'curtains',
      'security',
    ];

    tiers.forEach((tier) => {
      modules.forEach((mod) => {
        const matches = DEVICES_CATALOG.filter(
          (d) => d.tier === tier && d.category === mod
        );
        expect(
          matches.length,
          `Tier "${tier}" must have devices for module "${mod}"`
        ).toBeGreaterThan(0);
      });
    });
  });

  it('ensures all devices have positive prices and non-empty metadata', () => {
    DEVICES_CATALOG.forEach((device) => {
      expect(device.unitPrice).toBeGreaterThan(0);
      expect(device.installCost).toBeGreaterThan(0);
      expect(device.name).toBeTruthy();
      expect(device.description).toBeTruthy();
      expect(device.brand).toBeTruthy();
    });
  });
});
