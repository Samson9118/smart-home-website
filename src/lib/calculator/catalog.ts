import { HubType, BrandTier, SystemModuleKey, DeviceBrand } from './types';

export interface CatalogHub {
  id: HubType;
  title: string;
  brand: DeviceBrand;
  model: string;
  price: number;
  setupCost: number;
  description: string;
  features: string[];
}

export interface CatalogDevice {
  id: string;
  name: string;
  brand: DeviceBrand;
  tier: BrandTier;
  category: SystemModuleKey;
  unitPrice: number;
  installCost: number;
  description: string;
}

export const HUBS_CATALOG: Record<HubType, CatalogHub> = {
  'home-assistant': {
    id: 'home-assistant',
    title: 'Home Assistant Server + Sprut.stick Pro',
    brand: 'Sprut',
    model: 'Mini-PC Intel N100 16GB/512GB SSD + USB Zigbee/Matter Стик',
    price: 18900,
    setupCost: 8500,
    description:
      'Бескомпромиссный локальный сервер. 100% автономность без облака, поддержка любых брендов (Aqara, Sonoff, Tuya, Sprut), сложные сценарии и дашборды.',
    features: [
      'Полная локальная работа без интернета',
      'Интеграция с Алисой и Apple HomeKit',
      'Неограниченное число сценариев',
      'Резервное копирование в локальную сеть',
    ],
  },
  'sprut-hub': {
    id: 'sprut-hub',
    title: 'Sprut.hub CE (Российский хаб)',
    brand: 'Sprut',
    model: 'Sprut.hub 2.0 Zigbee + Thread',
    price: 19900,
    setupCost: 7000,
    description:
      'Премиальный российский локальный контроллер с понятным интерфейсом, готовыми шаблонами устройств и нативной интеграцией с Алисой и HomeKit.',
    features: [
      'Отечественная разработка и серверы',
      'Быстрый отклик по Zigbee 3.0',
      'Штатная интеграция с Яндекс Алисой',
      'Локальный веб-интерфейс',
    ],
  },
  'aqara-hub': {
    id: 'aqara-hub',
    title: 'Aqara Hub M3 (Matter & Zigbee)',
    brand: 'Aqara',
    model: 'Aqara Hub M3 с PoE и ИК 360°',
    price: 11490,
    setupCost: 4500,
    description:
      'Официальный флагманский хаб экосистемы Aqara с поддержкой Matter, резервированием контроллеров и управлением кондиционерами по ИК.',
    features: [
      'Matter Controller & Thread Border Router',
      'Управление кондиционерами через ИК-порт',
      'Питание по PoE или Type-C',
      'Стабильная работа в приложении Aqara Home',
    ],
  },
  'yandex-station': {
    id: 'yandex-station',
    title: 'Яндекс Станция Миди с Zigbee',
    brand: 'Яндекс',
    model: 'Яндекс Станция со встроенным Zigbee-модулем',
    price: 14990,
    setupCost: 4000,
    description:
      'Колонка с голосовым помощником Алиса и аппаратным Zigbee-модулем. Простое управление голосом прямо из коробки.',
    features: [
      'Встроенный голосовой помощник Алиса',
      'Локальное управление Zigbee-устройствами',
      'Качественный звук для спальни или кухни',
      'Управление через приложение «Дом с Алисой»',
    ],
  },
};

export const DEVICES_CATALOG: CatalogDevice[] = [
  // --- ОСВЕЩЕНИЕ: BUDGET ---
  {
    id: 'light-relay-budget',
    name: 'Беспроводное реле Sonoff ZBMINI-L2 (без нейтрали)',
    brand: 'Sonoff',
    tier: 'budget',
    category: 'lighting',
    unitPrice: 1390,
    installCost: 750,
    description: 'Компактное Zigbee-реле в круглый подрозетник. Работает без нулевого провода.',
  },
  {
    id: 'light-switch-budget',
    name: 'Беспроводная кнопка/переключатель Sonoff SNZB-01P',
    brand: 'Sonoff',
    tier: 'budget',
    category: 'lighting',
    unitPrice: 990,
    installCost: 300,
    description: 'Беспроводная кнопка для дублирования выключателей и запуска сценариев.',
  },

  // --- ОСВЕЩЕНИЕ: OPTIMUM ---
  {
    id: 'light-relay-optimum',
    name: 'Двухканальное реле Aqara Dual Relay Module T2',
    brand: 'Aqara',
    tier: 'optimum',
    category: 'lighting',
    unitPrice: 2690,
    installCost: 850,
    description: 'Двухканальное реле Zigbee/Matter с защитой от перегрева и мониторингом мощности.',
  },
  {
    id: 'light-switch-optimum',
    name: 'Беспроводной выключатель Aqara Wireless Remote Switch H1',
    brand: 'Aqara',
    tier: 'optimum',
    category: 'lighting',
    unitPrice: 1990,
    installCost: 350,
    description: 'Двухклавишный беспроводной выключатель с поддержкой 7 действий.',
  },

  // --- ОСВЕЩЕНИЕ: PREMIUM ---
  {
    id: 'light-relay-premium',
    name: 'Реле Sprut.relay Pro (Zigbee 3.0, DIN-рейка / подрозетник)',
    brand: 'Sprut',
    tier: 'premium',
    category: 'lighting',
    unitPrice: 3890,
    installCost: 950,
    description: 'Премиальное российское реле на компонентах промышленного класса с измерением энергопотребления.',
  },
  {
    id: 'light-switch-premium',
    name: 'Дизайнерский беспроводной переключатель Aqara H1 Pro',
    brand: 'Aqara',
    tier: 'premium',
    category: 'lighting',
    unitPrice: 2790,
    installCost: 400,
    description: 'Металлическая рамка, тихий клик и сверхдолгая работа от батареи до 5 лет.',
  },

  // --- КЛИМАТ: BUDGET ---
  {
    id: 'climate-sensor-budget',
    name: 'Датчик температуры и влажности Tuya Zigbee с LCD-экраном',
    brand: 'Tuya',
    tier: 'budget',
    category: 'climate',
    unitPrice: 890,
    installCost: 250,
    description: 'Компактный датчик с экраном для контроля микроклимата.',
  },
  {
    id: 'climate-trv-budget',
    name: 'Термоголовка радиаторная Sonoff TRVZB Zigbee',
    brand: 'Sonoff',
    tier: 'budget',
    category: 'climate',
    unitPrice: 2890,
    installCost: 1100,
    description: 'Умный терморегулятор на радиатор отопления для покомнатного контроля тепла.',
  },
  {
    id: 'climate-ir-budget',
    name: 'Универсальный ИК-пульт для кондиционера Tuya Zigbee',
    brand: 'Tuya',
    tier: 'budget',
    category: 'climate',
    unitPrice: 1190,
    installCost: 400,
    description: 'Автоматическое включение охлаждения и обогрева по показаниям датчиков.',
  },

  // --- КЛИМАТ: OPTIMUM ---
  {
    id: 'climate-sensor-optimum',
    name: 'Датчик температуры, влажности и давления Aqara WSDCGQ11LM',
    brand: 'Aqara',
    tier: 'optimum',
    category: 'climate',
    unitPrice: 1690,
    installCost: 250,
    description: 'Высокоточный сенсор Sensirion швейцарского производства.',
  },
  {
    id: 'climate-trv-optimum',
    name: 'Умный радиаторный термостат Aqara Smart Radiator Thermostat E1',
    brand: 'Aqara',
    tier: 'optimum',
    category: 'climate',
    unitPrice: 4290,
    installCost: 1200,
    description: 'Поддержка геолокации, защита от замерзания и интеграция с внешними датчиками.',
  },
  {
    id: 'climate-ir-optimum',
    name: 'Контроллер кондиционера Aqara Air Conditioning Companion / M2',
    brand: 'Aqara',
    tier: 'optimum',
    category: 'climate',
    unitPrice: 3290,
    installCost: 500,
    description: 'Прямое управление сплит-системой и контроль энергопотребления.',
  },

  // --- КЛИМАТ: PREMIUM ---
  {
    id: 'climate-sensor-premium',
    name: 'Многофункциональный климатический сенсор Sprut.hub Temp/CO2/VOC',
    brand: 'Sprut',
    tier: 'premium',
    category: 'climate',
    unitPrice: 3990,
    installCost: 350,
    description: 'Контроль температуры, влажности и качества воздуха для автоматизации приточной вентиляции.',
  },
  {
    id: 'climate-trv-premium',
    name: 'Премиальный радиаторный термостат Aqara E1 с выносным сенсором',
    brand: 'Aqara',
    tier: 'premium',
    category: 'climate',
    unitPrice: 4890,
    installCost: 1300,
    description: 'Бесшумный шаговый мотор и адаптивная калибровка температуры.',
  },
  {
    id: 'climate-ir-premium',
    name: 'Премиум контроллер климата Aqara Hub M3 IR',
    brand: 'Aqara',
    tier: 'premium',
    category: 'climate',
    unitPrice: 4190,
    installCost: 500,
    description: 'Мощный ИК-излучатель 360° с обратной связью по текущему режиму кондиционера.',
  },

  // --- ЗАЩИТА ОТ ПРОТЕЧЕК: BUDGET ---
  {
    id: 'leakage-sensor-budget',
    name: 'Датчик протечки воды Tuya Zigbee',
    brand: 'Tuya',
    tier: 'budget',
    category: 'leakage',
    unitPrice: 890,
    installCost: 250,
    description: 'Беспроводной датчик с позолоченными контактами и защитой IP67.',
  },
  {
    id: 'leakage-valve-budget',
    name: 'Электропривод крана Tuya / Gidrolock Zigbee (G1/2" - G3/4")',
    brand: 'Tuya',
    tier: 'budget',
    category: 'leakage',
    unitPrice: 4490,
    installCost: 3000,
    description: 'Накладной манипулятор на стандартный шаровой кран без врезки в трубы.',
  },

  // --- ЗАЩИТА ОТ ПРОТЕЧЕК: OPTIMUM ---
  {
    id: 'leakage-sensor-optimum',
    name: 'Датчик протечки воды Aqara Water Leak Sensor T1',
    brand: 'Aqara',
    tier: 'optimum',
    category: 'leakage',
    unitPrice: 1790,
    installCost: 250,
    description: 'Сверхкомпактный влагозащитный корпус IP67, срок службы от батареи до 3 лет.',
  },
  {
    id: 'leakage-valve-optimum',
    name: 'Шаровой кран с электроприводом Neptun / Gidrolock + реле Aqara T2',
    brand: 'Aqara',
    tier: 'optimum',
    category: 'leakage',
    unitPrice: 7490,
    installCost: 3500,
    description: 'Полнопроходной латунный кран Bugatti с сервоприводом 12V. Перекрытие за 10 сек.',
  },

  // --- ЗАЩИТА ОТ ПРОТЕЧЕК: PREMIUM ---
  {
    id: 'leakage-sensor-premium',
    name: 'Датчик протечки Sprut.water с резервированием',
    brand: 'Sprut',
    tier: 'premium',
    category: 'leakage',
    unitPrice: 2890,
    installCost: 300,
    description: 'Двусторонний опрос контактов и оповещение о разряде батареи за 3 месяца.',
  },
  {
    id: 'leakage-valve-premium',
    name: 'Премиальный комплекс Neptun ProW+ с кранами Bugatti 220V/12V',
    brand: 'Sprut',
    tier: 'premium',
    category: 'leakage',
    unitPrice: 11900,
    installCost: 4000,
    description: 'Промышленный модуль защиты с питанием от встроенного аккумулятора и самоочисткой от закисания.',
  },

  // --- ШТОРЫ И КАРНИЗЫ: BUDGET ---
  {
    id: 'curtains-motor-budget',
    name: 'Мотор для рулонных штор Tuya Zigbee Roller Shade',
    brand: 'Tuya',
    tier: 'budget',
    category: 'curtains',
    unitPrice: 4890,
    installCost: 2000,
    description: 'Привод на цепочку рулонных штор со встроенным аккумулятором.',
  },

  // --- ШТОРЫ И КАРНИЗЫ: OPTIMUM ---
  {
    id: 'curtains-motor-optimum',
    name: 'Умный электрокарниз Aqara Curtain Driver E1 / C2',
    brand: 'Aqara',
    tier: 'optimum',
    category: 'curtains',
    unitPrice: 7990,
    installCost: 2500,
    description: 'Бесшумный мотор для раздвижных штор с плавным пуском и встроенным датчиком освещённости.',
  },

  // --- ШТОРЫ И КАРНИЗЫ: PREMIUM ---
  {
    id: 'curtains-motor-premium',
    name: 'Электрокарниз премиум-класса Aqara Curtain Controller B1 / C3',
    brand: 'Aqara',
    tier: 'premium',
    category: 'curtains',
    unitPrice: 11490,
    installCost: 3000,
    description: 'Усиленный бесшумный мотор на ремне с поддержкой тяжёлых блэкаут-штор до 50 кг.',
  },

  // --- БЕЗОПАСНОСТЬ: BUDGET ---
  {
    id: 'security-door-budget',
    name: 'Датчик открытия дверей и окон Sonoff SNZB-04',
    brand: 'Sonoff',
    tier: 'budget',
    category: 'security',
    unitPrice: 890,
    installCost: 250,
    description: 'Миниатюрный магнитный датчик для входной двери и окон.',
  },
  {
    id: 'security-motion-budget',
    name: 'Датчик движения Sonoff SNZB-03 Zigbee',
    brand: 'Sonoff',
    tier: 'budget',
    category: 'security',
    unitPrice: 1190,
    installCost: 250,
    description: 'Инфракрасный датчик движения с зоной обнаружения до 6 метров.',
  },

  // --- БЕЗОПАСНОСТЬ: OPTIMUM ---
  {
    id: 'security-door-optimum',
    name: 'Датчик открытия дверей и окон Aqara Door and Window Sensor T1',
    brand: 'Aqara',
    tier: 'optimum',
    category: 'security',
    unitPrice: 1590,
    installCost: 250,
    description: 'Защита от вскрытия, сверхкомпактный размер, батарея до 2 лет.',
  },
  {
    id: 'security-motion-optimum',
    name: 'Датчик движения и освещенности Aqara Motion Sensor P1',
    brand: 'Aqara',
    tier: 'optimum',
    category: 'security',
    unitPrice: 2490,
    installCost: 300,
    description: 'Настраиваемый таймаут от 1 секунды, встроенный датчик люкс, батарея на 5 лет.',
  },

  // --- БЕЗОПАСНОСТЬ: PREMIUM ---
  {
    id: 'security-door-premium',
    name: 'Премиум датчик открытия Sprut.door с контролем вибрации',
    brand: 'Sprut',
    tier: 'premium',
    category: 'security',
    unitPrice: 2490,
    installCost: 300,
    description: 'Фиксация не только открытия, но и удара/попытки взлома двери.',
  },
  {
    id: 'security-motion-premium',
    name: 'Датчик присутствия миллиметрового диапазона Aqara FP1E / FP2',
    brand: 'Aqara',
    tier: 'premium',
    category: 'security',
    unitPrice: 4690,
    installCost: 450,
    description: 'Радар mmWave: видит дыхание человека даже когда он неподвижно сидит или спит.',
  },
];
