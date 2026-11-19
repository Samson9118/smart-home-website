import { z } from 'zod';

export const propertyTypeSchema = z.enum(['apartment', 'house']);

export const hubTypeSchema = z.enum([
  'home-assistant',
  'sprut-hub',
  'aqara-hub',
  'yandex-station',
]);

export const brandTierSchema = z.enum(['budget', 'optimum', 'premium']);

export const systemModulesSchema = z.object({
  lighting: z.boolean(),
  climate: z.boolean(),
  leakage: z.boolean(),
  curtains: z.boolean(),
  security: z.boolean(),
});

export const calculatorInputsSchema = z.object({
  propertyType: propertyTypeSchema.default('apartment'),
  area: z
    .number({ invalid_type_error: 'Укажите площадь числом' })
    .min(15, 'Минимальная площадь 15 м²')
    .max(1000, 'Максимальная площадь 1000 м²')
    .default(65),
  rooms: z
    .number({ invalid_type_error: 'Укажите число комнат' })
    .int('Количество комнат должно быть целым числом')
    .min(1, 'Минимум 1 комната')
    .max(20, 'Максимум 20 комнат')
    .default(2),
  bathrooms: z
    .number({ invalid_type_error: 'Укажите число санузлов' })
    .int('Количество санузлов должно быть целым числом')
    .min(1, 'Минимум 1 санузел')
    .max(10, 'Максимум 10 санузлов')
    .default(1),
  hub: hubTypeSchema.default('home-assistant'),
  brandTier: brandTierSchema.default('optimum'),
  modules: systemModulesSchema.default({
    lighting: true,
    climate: true,
    leakage: true,
    curtains: false,
    security: true,
  }),
});

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов'),
  phone: z
    .string()
    .trim()
    .regex(
      /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
      'Введите корректный номер телефона РФ (+7 999 000-00-00)'
    ),
  messenger: z.enum(['telegram', 'max', 'phone']).default('telegram'),
  contactHandle: z.string().trim().max(50).optional(),
  comment: z.string().trim().max(500).optional(),
  honeypot: z.string().max(0, 'Подозрение на спам').optional().or(z.literal('')),
  calculatorInputs: calculatorInputsSchema.optional(),
});

export type ValidatedCalculatorInputs = z.infer<typeof calculatorInputsSchema>;
export type ValidatedLeadForm = z.infer<typeof leadFormSchema>;
