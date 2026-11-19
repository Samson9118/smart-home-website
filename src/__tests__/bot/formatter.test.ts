import { describe, it, expect } from 'vitest';
import { formatLeadMessage } from '@/lib/bot/formatter';
import { ValidatedLeadForm } from '@/lib/calculator/schema';

describe('Bot Notification Message Formatter', () => {
  it('formats basic contact lead without calculator inputs', () => {
    const lead: ValidatedLeadForm = {
      name: 'Сергей',
      phone: '+7 (999) 111-22-33',
      messenger: 'telegram',
      contactHandle: '@sergey_dev',
      comment: 'Интересует смета на квартиру',
    };

    const formatted = formatLeadMessage(lead);

    expect(formatted.telegramMarkdown).toContain('НОВАЯ ЗАЯВКА С САЙТА');
    expect(formatted.telegramMarkdown).toContain('Сергей');
    expect(formatted.telegramMarkdown).toContain('\\+7 \\(999\\) 111\\-22\\-33');
    expect(formatted.telegramMarkdown).toContain('@sergey\\_dev');
    expect(formatted.plainText).toContain('+7 (999) 111-22-33');
  });

  it('formats full lead with calculator estimate details', () => {
    const lead: ValidatedLeadForm = {
      name: 'Ольга',
      phone: '+7 (903) 555-44-33',
      messenger: 'max',
      calculatorInputs: {
        propertyType: 'apartment',
        area: 75,
        rooms: 3,
        bathrooms: 1,
        hub: 'home-assistant',
        brandTier: 'optimum',
        modules: {
          lighting: true,
          climate: true,
          leakage: true,
          curtains: false,
          security: true,
        },
      },
    };

    const formatted = formatLeadMessage(lead);

    expect(formatted.telegramMarkdown).toContain('ПАРАМЕТРЫ ОБЪЕКТА И СМЕТА');
    expect(formatted.telegramMarkdown).toContain('Квартира');
    expect(formatted.telegramMarkdown).toContain('75 м²');
    expect(formatted.telegramMarkdown).toContain('ИТОГО ПО СМЕТЕ');
    expect(formatted.telegramMarkdown).toContain('Оборудование');
    expect(formatted.telegramMarkdown).toContain('Чистовой монтаж');
    expect(formatted.plainText).toContain('ИТОГО ПО СМЕТЕ');
  });
});
