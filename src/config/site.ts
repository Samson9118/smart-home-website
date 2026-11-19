export const siteConfig = {
  name: 'SmartHome Lab',
  description: 'Проектирование и монтаж беспроводного умного дома (Zigbee, Matter, Thread, Home Assistant, Яндекс Алиса) на базе оборудования Aqara, Sonoff, Sprut и Tuya Zigbee.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+7 (999) 000-00-00',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@smarthome-example.ru',
  telegramBot: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || 'your_smarthome_bot',
  maxBotLink: process.env.NEXT_PUBLIC_MAX_BOT_LINK || 'https://max.ru/your_smarthome_bot',
  supportedBrands: [
    { name: 'Aqara', category: 'Оптимум / Дизайн', badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10' },
    { name: 'Sonoff', category: 'Бюджет / Силовые реле', badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10' },
    { name: 'Sprut', category: 'Локальный премиум / Хабы', badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' },
    { name: 'Tuya Zigbee', category: 'Доступная периферия', badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10' },
  ],
  supportedEcosystems: [
    'Home Assistant',
    'Яндекс Алиса',
    'Sprut.hub',
    'Apple Home (Matter)',
  ],
  supportedProtocols: ['Zigbee 3.0', 'Matter', 'Thread', 'Wi-Fi / BLE'],
};
