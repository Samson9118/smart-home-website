export type PropertyType = 'apartment' | 'house';

export type HubType =
  | 'home-assistant'
  | 'sprut-hub'
  | 'aqara-hub'
  | 'yandex-station';

export type BrandTier = 'budget' | 'optimum' | 'premium';

export type SystemModuleKey =
  | 'lighting'
  | 'climate'
  | 'leakage'
  | 'curtains'
  | 'security';

export interface SystemModulesSelection {
  lighting: boolean;
  climate: boolean;
  leakage: boolean;
  curtains: boolean;
  security: boolean;
}

export interface CalculatorInputs {
  propertyType: PropertyType;
  area: number; // in m²
  rooms: number;
  bathrooms: number;
  hub: HubType;
  brandTier: BrandTier;
  modules: SystemModulesSelection;
}

export type DeviceBrand =
  | 'Aqara'
  | 'Sonoff'
  | 'Sprut'
  | 'Tuya'
  | 'Яндекс'
  | 'Generic';

export interface EquipmentItem {
  id: string;
  name: string;
  brand: DeviceBrand;
  category: SystemModuleKey | 'hub';
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  description: string;
}

export interface ModuleCostSummary {
  module: SystemModuleKey | 'hub';
  title: string;
  equipmentPrice: number;
  installationPrice: number;
  itemCount: number;
}

export interface EstimateResult {
  inputs: CalculatorInputs;
  equipment: EquipmentItem[];
  totalEquipmentPrice: number;
  installationPrice: number;
  setupPrice: number;
  totalWorksPrice: number;
  totalPrice: number;
  estimatedDays: number;
  moduleSummaries: ModuleCostSummary[];
}
