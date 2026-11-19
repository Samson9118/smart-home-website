import {
  CalculatorInputs,
  EquipmentItem,
  EstimateResult,
  ModuleCostSummary,
  SystemModuleKey,
} from './types';
import { HUBS_CATALOG, DEVICES_CATALOG } from './catalog';

/**
 * Validates and sanitizes raw input parameters within reasonable engineering limits.
 */
export function sanitizeCalculatorInputs(inputs: CalculatorInputs): CalculatorInputs {
  const numArea = Number(inputs.area);
  const numRooms = Number(inputs.rooms);
  const numBaths = Number(inputs.bathrooms);

  return {
    propertyType: inputs.propertyType === 'house' ? 'house' : 'apartment',
    area: isNaN(numArea) ? 60 : Math.min(1000, Math.max(15, Math.round(numArea))),
    rooms: isNaN(numRooms) ? 2 : Math.min(20, Math.max(1, Math.round(numRooms))),
    bathrooms: isNaN(numBaths) ? 1 : Math.min(10, Math.max(1, Math.round(numBaths))),
    hub: inputs.hub in HUBS_CATALOG ? inputs.hub : 'home-assistant',
    brandTier: ['budget', 'optimum', 'premium'].includes(inputs.brandTier)
      ? inputs.brandTier
      : 'optimum',
    modules: {
      lighting: Boolean(inputs.modules?.lighting),
      climate: Boolean(inputs.modules?.climate),
      leakage: Boolean(inputs.modules?.leakage),
      curtains: Boolean(inputs.modules?.curtains),
      security: Boolean(inputs.modules?.security),
    },
  };
}

/**
 * Pure calculation function that produces a complete smart home equipment and work estimate.
 */
export function calculateEstimate(rawInputs: CalculatorInputs): EstimateResult {
  const inputs = sanitizeCalculatorInputs(rawInputs);
  const { propertyType, area, rooms, bathrooms, hub: hubKey, brandTier, modules } = inputs;

  const equipment: EquipmentItem[] = [];
  let totalInstallCost = 0;

  // 1. Центральный контроллер / Хаб
  const hubData = HUBS_CATALOG[hubKey];
  if (hubData) {
    equipment.push({
      id: `hub-${hubData.id}`,
      name: hubData.title,
      brand: hubData.brand,
      category: 'hub',
      unitPrice: hubData.price,
      quantity: 1,
      totalPrice: hubData.price,
      description: hubData.description,
    });
  }

  // Вспомогательная функция для добавления оборудования из каталога
  const addDevice = (
    prefix: string,
    quantity: number,
    customMultiplier: number = 1
  ) => {
    if (quantity <= 0) return;
    const device = DEVICES_CATALOG.find(
      (d) => d.id.startsWith(prefix) && d.tier === brandTier
    );
    if (!device) return;

    const totalQty = Math.round(quantity * customMultiplier);
    const totalPrice = device.unitPrice * totalQty;
    const installPrice = device.installCost * totalQty;

    totalInstallCost += installPrice;

    equipment.push({
      id: device.id,
      name: device.name,
      brand: device.brand,
      category: device.category,
      unitPrice: device.unitPrice,
      quantity: totalQty,
      totalPrice,
      description: device.description,
    });
  };

  // 2. Модуль Освещения
  if (modules.lighting) {
    // Число световых групп: минимум 3, зависит от комнат, санузлов и площади
    const areaFactor = Math.floor(area / 35);
    const lightingGroups = Math.max(
      3,
      rooms * 2 + bathrooms + (propertyType === 'house' ? 4 : 2) + areaFactor
    );

    // Для optimum и premium используются двухканальные реле (1 модуль на 2 группы)
    const relayCount =
      brandTier === 'budget'
        ? lightingGroups
        : Math.ceil(lightingGroups / 2);

    addDevice('light-relay', relayCount);

    // Беспроводные выключатели / кнопки для сценариев (по 1 на комнату + 1 у входа "Мастер-выключатель")
    const switchesCount = rooms + (propertyType === 'house' ? 2 : 1);
    addDevice('light-switch', switchesCount);
  }

  // 3. Модуль Климата
  if (modules.climate) {
    // Датчики температуры и влажности: 1 на каждую комнату + 1 в санузел/кухню
    const climateSensorsCount = rooms + 1;
    addDevice('climate-sensor', climateSensorsCount);

    // Термоголовки на радиаторы: по числу комнат (для дома + 1 в холл)
    const trvCount = rooms + (propertyType === 'house' ? 1 : 0);
    addDevice('climate-trv', trvCount);

    // Управление кондиционерами: 1 ИК-пульт на каждые 2 комнаты (минимум 1)
    const acCount = Math.max(1, Math.ceil(rooms / 2));
    addDevice('climate-ir', acCount);
  }

  // 4. Модуль Защиты от протечек
  if (modules.leakage) {
    // Датчики протечки: по 2 на каждый санузел + 1 на кухню
    const leakageSensorsCount = bathrooms * 2 + 1;
    addDevice('leakage-sensor', leakageSensorsCount);

    // Шаровые краны с электроприводом: по 1 комплекту (ГВС+ХВС) на каждый санузел/стояк
    // В частном доме обычно 1 главный ввод + 1 котельная/бойлерная
    const valvesSetCount = propertyType === 'house' ? Math.max(1, bathrooms) : bathrooms;
    addDevice('leakage-valve', valvesSetCount);
  }

  // 5. Модуль Штор и карнизов
  if (modules.curtains) {
    // Моторы для штор: в жилые комнаты и спальни (минимум 1, максимум rooms)
    const curtainsCount = Math.max(1, rooms);
    addDevice('curtains-motor', curtainsCount);
  }

  // 6. Модуль Безопасности
  if (modules.security) {
    // Датчики открытия дверей/окон: 1 входная дверь + окна (в квартире базово 2, в доме 4)
    const doorSensorsCount = propertyType === 'house' ? 4 : 2;
    addDevice('security-door', doorSensorsCount);

    // Датчики движения / присутствия: по 1 в общие зоны и проходные коридоры
    const motionSensorsCount = Math.max(1, Math.ceil(rooms / 1.5));
    addDevice('security-motion', motionSensorsCount);
  }

  // Расчёт стоимостей
  const totalEquipmentPrice = equipment.reduce((sum, item) => sum + item.totalPrice, 0);

  // Коэффициент дома: в загородном доме трассы длиннее, требуется настройка Zigbee-роутеров (+10%)
  const propertyFactor = propertyType === 'house' ? 1.1 : 1.0;
  const installationPrice = Math.round(totalInstallCost * propertyFactor);

  // Базовая стоимость пусконаладки и написания сценариев от хаба
  const setupPrice = hubData ? hubData.setupCost : 3000;
  const totalWorksPrice = installationPrice + setupPrice;
  const totalPrice = totalEquipmentPrice + totalWorksPrice;

  // Оценка сроков выполнения работ (в днях)
  const totalItemsCount = equipment.reduce((sum, item) => sum + item.quantity, 0);
  let estimatedDays = 1;
  if (totalItemsCount > 40 || propertyType === 'house') {
    estimatedDays = 3;
  } else if (totalItemsCount > 20) {
    estimatedDays = 2;
  }

  // Формирование сводки по модулям
  const moduleKeys: (SystemModuleKey | 'hub')[] = [
    'hub',
    'lighting',
    'climate',
    'leakage',
    'curtains',
    'security',
  ];

  const moduleTitles: Record<SystemModuleKey | 'hub', string> = {
    hub: 'Центральный хаб и сервер',
    lighting: 'Умное освещение',
    climate: 'Климат и отопление',
    leakage: 'Защита от протечек',
    curtains: 'Электрокарнизы и шторы',
    security: 'Безопасность и датчики',
  };

  const moduleSummaries: ModuleCostSummary[] = moduleKeys
    .map((key) => {
      const items = equipment.filter((e) => e.category === key);
      const eqPrice = items.reduce((sum, i) => sum + i.totalPrice, 0);
      const count = items.reduce((sum, i) => sum + i.quantity, 0);

      // Пропорциональный расчет монтажа для модуля
      const itemsInCatalog = items.map((item) => {
        const catItem = DEVICES_CATALOG.find((d) => d.id === item.id);
        return (catItem?.installCost || 0) * item.quantity;
      });
      const moduleInstall =
        key === 'hub'
          ? setupPrice
          : Math.round(itemsInCatalog.reduce((s, c) => s + c, 0) * propertyFactor);

      return {
        module: key,
        title: moduleTitles[key],
        equipmentPrice: eqPrice,
        installationPrice: moduleInstall,
        itemCount: count,
      };
    })
    .filter((summary) => summary.itemCount > 0);

  return {
    inputs,
    equipment,
    totalEquipmentPrice,
    installationPrice,
    setupPrice,
    totalWorksPrice,
    totalPrice,
    estimatedDays,
    moduleSummaries,
  };
}
