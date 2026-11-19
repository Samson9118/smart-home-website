import { describe, it, expect } from 'vitest';
import {
  calculatorInputsSchema,
  leadFormSchema,
  propertyTypeSchema,
  hubTypeSchema,
  brandTierSchema,
} from '@/lib/calculator/schema';

describe('Calculator Zod Schemas', () => {
  it('validates property type schema', () => {
    expect(propertyTypeSchema.safeParse('apartment').success).toBe(true);
    expect(propertyTypeSchema.safeParse('house').success).toBe(true);
    expect(propertyTypeSchema.safeParse('villa').success).toBe(false);
  });

  it('validates hub type schema', () => {
    expect(hubTypeSchema.safeParse('home-assistant').success).toBe(true);
    expect(hubTypeSchema.safeParse('sprut-hub').success).toBe(true);
    expect(hubTypeSchema.safeParse('aqara-hub').success).toBe(true);
    expect(hubTypeSchema.safeParse('yandex-station').success).toBe(true);
    expect(hubTypeSchema.safeParse('unknown-hub').success).toBe(false);
  });

  it('validates brand tier schema', () => {
    expect(brandTierSchema.safeParse('budget').success).toBe(true);
    expect(brandTierSchema.safeParse('optimum').success).toBe(true);
    expect(brandTierSchema.safeParse('premium').success).toBe(true);
    expect(brandTierSchema.safeParse('ultra').success).toBe(false);
  });

  it('validates default calculator inputs', () => {
    const result = calculatorInputsSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.area).toBe(65);
      expect(result.data.rooms).toBe(2);
      expect(result.data.bathrooms).toBe(1);
      expect(result.data.hub).toBe('home-assistant');
      expect(result.data.brandTier).toBe('optimum');
    }
  });

  it('rejects area out of bounds', () => {
    expect(calculatorInputsSchema.safeParse({ area: 10 }).success).toBe(false);
    expect(calculatorInputsSchema.safeParse({ area: 1500 }).success).toBe(false);
    expect(calculatorInputsSchema.safeParse({ area: 75 }).success).toBe(true);
  });

  it('rejects rooms out of bounds or non-integer', () => {
    expect(calculatorInputsSchema.safeParse({ rooms: 0 }).success).toBe(false);
    expect(calculatorInputsSchema.safeParse({ rooms: 2.5 }).success).toBe(false);
    expect(calculatorInputsSchema.safeParse({ rooms: 25 }).success).toBe(false);
    expect(calculatorInputsSchema.safeParse({ rooms: 3 }).success).toBe(true);
  });

  describe('leadFormSchema', () => {
    it('validates valid lead submission', () => {
      const validData = {
        name: 'Алексей',
        phone: '+7 (999) 123-45-67',
        messenger: 'telegram',
        contactHandle: '@alex_smarthome',
        comment: 'Нужен проект на 3 комнаты',
      };
      const res = leadFormSchema.safeParse(validData);
      expect(res.success).toBe(true);
    });

    it('rejects short or empty name', () => {
      const res = leadFormSchema.safeParse({
        name: 'А',
        phone: '+7 (999) 123-45-67',
      });
      expect(res.success).toBe(false);
    });

    it('rejects invalid phone format', () => {
      const res = leadFormSchema.safeParse({
        name: 'Иван',
        phone: '12345',
      });
      expect(res.success).toBe(false);
    });

    it('detects honeypot bot trap', () => {
      const res = leadFormSchema.safeParse({
        name: 'Bot',
        phone: '+7 (999) 123-45-67',
        honeypot: 'spam-bot-value',
      });
      expect(res.success).toBe(false);
    });
  });
});
